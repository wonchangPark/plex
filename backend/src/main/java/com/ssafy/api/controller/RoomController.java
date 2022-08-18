package com.ssafy.api.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomJoinPostReq;
import com.ssafy.api.request.ScoreHistoryPostReq;
import com.ssafy.api.response.RoomCreateRes;
import com.ssafy.api.service.RoomUserService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.exception.NoMoreSpaceForRoomException;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.RandomRoomCode;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import io.openvidu.java.client.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.ssafy.api.service.RoomService;

import io.swagger.annotations.Api;

@Api(value = "방 관리 API", tags = {"Room"})
@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("*")
public class RoomController {
	private final OpenVidu openVidu;
	// URL where our OpenVidu server is listening

	private final Map<String, Session> mapSessions = new ConcurrentHashMap<>();

	private final Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

	@Autowired
	private RoomService roomService;

	@Autowired
	private UserService userService;

	@Autowired
	private RoomUserService roomUserService;

	public RoomController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
		this.openVidu = new OpenVidu(openviduUrl, secret);
	}

	@PostMapping("/create-room")
	@Transactional
	public ResponseEntity<?> createRoom(@RequestBody RoomCreatePostReq roomInfo) {
		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = ssafyUserDetails.getUser();
		String code = RandomRoomCode.generateRandomCode();
		System.out.println(roomInfo.getName() + roomInfo.getHost() + roomInfo.getIsPrivate());
		//if(roomService.isAlreadyInRoom(user)) return ResponseEntity.status(406).build(); // 이미 대기방에 있음
		Room room = roomService.createRoom(roomInfo, code);
		try {
			roomUserService.createRoomUser(user, room);
		} catch (Exception e) {
			return ResponseEntity.status(403).build();
		}

		// The video-call to connect
		String sessionName = code;

		// Role associated to this user
		OpenViduRole role = OpenViduRole.PUBLISHER;

		// Optional data to be passed to other users when this user connects to the
		// video-call. In this case, a JSON with the value we stored in the HttpSession
		// object on login

		String serverData = "{\"serverData\": \"" + roomInfo.getHost() + "\"}";

		// Build connectionProperties object with the serverData and the role
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).role(role).build();

		if (this.mapSessions.get(sessionName) != null) {
			// Session already exists
			System.out.println("Existing session " + sessionName);
			try {

				// Generate a new Connection with the recently created connectionProperties
				String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();

				// Update our collection storing the new token
				this.mapSessionNamesTokens.get(sessionName).put(token, role);

				return ResponseEntity.ok(RoomCreateRes.of(200,"Success", room, token));

			} catch (OpenViduJavaClientException e1) {
				// If internal error generate an error message and return it to client
				return getErrorResponse(e1);
			} catch (OpenViduHttpException e2) {
				if (404 == e2.getStatus()) {
					// Invalid sessionId (user left unexpectedly). Session object is not valid
					// anymore. Clean collections and continue as new session
					this.mapSessions.remove(sessionName);
					this.mapSessionNamesTokens.remove(sessionName);
				}
			}
		}

		// New session
		System.out.println("New session " + sessionName);
		try {

			// Create a new OpenVidu Session
			Session session = this.openVidu.createSession();
			// Generate a new Connection with the recently created connectionProperties
			String token = session.createConnection(connectionProperties).getToken();

			// Store the session and the token in our collections
			this.mapSessions.put(sessionName, session);
			this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
			this.mapSessionNamesTokens.get(sessionName).put(token, role);

			return ResponseEntity.ok(RoomCreateRes.of(200,"Success", room, token));

		} catch (Exception e) {
			// If error generate an error message and return it to client
			return getErrorResponse(e);
		}
	}


	@PostMapping("/get-token")
	public ResponseEntity<?> getToken(@RequestBody RoomJoinPostReq joinInfo)
			throws ParseException {
		Room room = roomService.getRoomByCode(joinInfo.getCode());
		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = ssafyUserDetails.getUser();
		if(room == null || user == null) return ResponseEntity.status(404).build();
		if(roomService.isGaming(room)) return ResponseEntity.status(407).build(); // 게임중이므로 못들어감
		//if(roomService.isAlreadyInRoom(user)) return ResponseEntity.status(406).build(); // 이미 대기방에 있음
		try {
			roomUserService.createRoomUser(user, room);
		} catch (NoMoreSpaceForRoomException e) {
			return ResponseEntity.status(403).build();
		} catch (Exception e){
			return ResponseEntity.status(404).build();
		}

		System.out.println("Getting a token from OpenVidu Server | {sessionName}=" + joinInfo.getCode());

		// The video-call to connect
		String sessionName = joinInfo.getCode();

		// Role associated to this user
		OpenViduRole role = OpenViduRole.PUBLISHER;

		// Optional data to be passed to other users when this user connects to the
		// video-call. In this case, a JSON with the value we stored in the HttpSession
		// object on login
//		String serverData = "{\"serverData\": \"" + roomInfo.getHost() + "\"}";


		// Build connectionProperties object with the serverData and the role
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).role(role).build();


		if (this.mapSessions.get(sessionName) != null) {
			// Session already exists
			System.out.println("Existing session " + sessionName);
			try {

				// Generate a new Connection with the recently created connectionProperties
				String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();

				// Update our collection storing the new token
				this.mapSessionNamesTokens.get(sessionName).put(token, role);

				// Prepare the response with the token
				System.out.println(token);
				// Return the response to the client
				return ResponseEntity.ok(RoomCreateRes.of(200,"Success", room, token));
			} catch (OpenViduJavaClientException e1) {
				// If internal error generate an error message and return it to client
				return getErrorResponse(e1);
			} catch (OpenViduHttpException e2) {
				if (404 == e2.getStatus()) {
					// Invalid sessionId (user left unexpectedly). Session object is not valid
					// anymore. Clean collections and continue as new session
					this.mapSessions.remove(sessionName);
					this.mapSessionNamesTokens.remove(sessionName);
				}
			}
		}

		// New session
		System.out.println("New session " + sessionName);
		try {

			// Create a new OpenVidu Session
			Session session = this.openVidu.createSession();
			// Generate a new Connection with the recently created connectionProperties
			String token = session.createConnection(connectionProperties).getToken();

			// Store the session and the token in our collections
			this.mapSessions.put(sessionName, session);
			this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
			this.mapSessionNamesTokens.get(sessionName).put(token, role);

			// Prepare the response with the token

			// Return the response to the client
			return ResponseEntity.ok(RoomCreateRes.of(200,"Success", room, token));

		} catch (Exception e) {
			// If error generate an error message and return it to client
			return getErrorResponse(e);
		}
	}



	private ResponseEntity<JSONObject> getErrorResponse(Exception e) {
		JSONObject json = new JSONObject();
		json.put("cause", e.getCause());
		json.put("error", e.getMessage());
		json.put("exception", e.getClass());
		return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping("/leave-room")
	public ResponseEntity<BaseResponseBody> leaveRoom(@RequestBody RoomJoinPostReq joinInfo) {
		Room room = roomService.getRoomByCode(joinInfo.getCode());
		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = ssafyUserDetails.getUser();
		String host = room.getHost();
		String id = joinInfo.getId();
		System.out.println(host);
		System.out.println(id);
		if (host.equals(id)) { // 방 나가는 사람이 호스트인 경우
			System.out.println("inside");
			roomService.endRoom(room);
		}
		RoomUser roomUser = roomUserService.getRoomUser(user, room);
		roomUserService.deleteRoomUser(roomUser);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@PostMapping("/game")
	@Transactional
	public ResponseEntity<Long> startGame(@RequestParam Long roomNo){
		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = ssafyUserDetails.getUser();
		if(!roomService.isHost(user, roomNo)) return ResponseEntity.status(406).build();
		Long gameHistoryNo = roomService.insertGameHistory(roomNo);
		roomService.isPlayingTrue(roomNo);
		return ResponseEntity.status(200).body(gameHistoryNo);
		// gameHistoryNo를 반환
	}

	@PostMapping("/gameend")
	@Transactional
	public ResponseEntity<Void> endGame(@RequestParam Long roomNo, @RequestParam Long gameHistoryNo){
		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = ssafyUserDetails.getUser();
		if(!roomService.isHost(user, roomNo)) return ResponseEntity.status(406).build();
		roomService.endGame(gameHistoryNo);
		roomService.isPlayingFalse(roomNo);
		return ResponseEntity.status(200).build();
	}

	@PostMapping("/score")
	public ResponseEntity<Void> insertScoreHistory(@RequestBody ScoreHistoryPostReq scoreHistoryPostReq){
//		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
//		User user = ssafyUserDetails.getUser();
//		if(!roomService.isHost(user, scoreHistoryPostReq.getRoomNo())) return ResponseEntity.status(406).build();
		roomService.insertScoreHistory(scoreHistoryPostReq);
		return ResponseEntity.status(200).build();
	}

	@GetMapping("/inroom")
	public ResponseEntity<Void> isInRoom(){
		SsafyUserDetails ssafyUserDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = ssafyUserDetails.getUser();
		if(roomService.isAlreadyInRoom(user)) return ResponseEntity.status(200).build();
		return ResponseEntity.status(201).build();
	}

}
