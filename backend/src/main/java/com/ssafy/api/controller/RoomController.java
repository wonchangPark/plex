package com.ssafy.api.controller;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomJoinPostReq;
import com.ssafy.api.request.ScoreHistoryPostReq;
import com.ssafy.api.response.RoomCreateRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.RoomUserService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.RandomRoomCode;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import io.openvidu.java.client.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.ssafy.api.service.RoomService;

import io.swagger.annotations.Api;

import javax.servlet.http.HttpSession;

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
		String code = RandomRoomCode.generateRandomCode();
		System.out.println(code);
		Room room = roomService.createRoom(roomInfo, code);
		User user = userService.getUserByUserId(roomInfo.getHost());
		roomUserService.createRoomUser(user, room);

		// The video-call to connect
		String sessionName = code;

		// Role associated to this user
		OpenViduRole role = OpenViduRole.PUBLISHER;

		// Optional data to be passed to other users when this user connects to the
		// video-call. In this case, a JSON with the value we stored in the HttpSession
		// object on login
		String serverData = "{\"serverData\": \"" + roomInfo.getHost() + "\"}";

		// Build connectionProperties object with the serverData and the role
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(role).build();

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
		System.out.println(room);
		User user = userService.getUserByUserId(joinInfo.getId());
		roomUserService.createRoomUser(user, room);

		System.out.println("Getting a token from OpenVidu Server | {sessionName}=" + joinInfo.getCode());

		// The video-call to connect
		String sessionName = joinInfo.getCode();

		// Role associated to this user
		OpenViduRole role = OpenViduRole.PUBLISHER;

		// Optional data to be passed to other users when this user connects to the
		// video-call. In this case, a JSON with the value we stored in the HttpSession
		// object on login
		String serverData = "{\"serverData\": \"" + joinInfo.getId() + "\"}";

		// Build connectionProperties object with the serverData and the role
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(role).build();


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
		User user = userService.getUserByUserId(joinInfo.getId());
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
	public ResponseEntity<Long> insertGameHistory(@RequestParam long roomNo){
		long gameHistoryNo = roomService.insertGameHistory(roomNo);
		return ResponseEntity.status(200).body(gameHistoryNo);
		// gameHistoryNo를 반환
	}

//	@PostMapping("/score")
//	public ResponseEntity<Void> insertScoreHistory(@RequestBody ScoreHistoryPostReq )

}
