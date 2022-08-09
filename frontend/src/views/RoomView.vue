<template>
	<div id="main-container" class="container">
		<GameResultModal v-if="gameFinished" :score="personalScore" @close-modal="gameFinished=false"/>
		<DestroyRoomDialog style="width: 70%; height: 45px; font-weight: bold"></DestroyRoomDialog>
		<div id="game-container"></div>
		<div id="session" v-if="session">
			<button class="btn btn-lg btn-success" @click="sendStart()">Start</button>
	
			<div id="session-header">
				<h1 id="session-title">{{ mySessionId }}</h1>
				<input class="btn btn-large btn-danger" type="button" id="buttonLeaveSession" @click="leaveSession" value="Leave session">
				<v-btn>
					<input class="btn btn-large btn-danger" type="button" id="buttonLeaveSession" @click="videoControl" v-if="!videoMute" value="비디오 중지">
				</v-btn>
				<input class="btn btn-large btn-danger" type="button" id="buttonLeaveSession" @click="videoControl" v-if="videoMute" value="비디오 시작">
				<input class="btn btn-large btn-danger" type="button" id="buttonLeaveSession" @click="audioControl" v-if="!audioMute" value="오디오 중지">
				<input class="btn btn-large btn-danger" type="button" id="buttonLeaveSession" @click="audioControl" v-if="audioMute" value="오디오 시작">
				<h1>팀 점수</h1>
				<h2>team1 {{ score1 }}</h2>
				<h2>team2 {{ score2 }}</h2>
			</div>

			<!-- <div id="main-video" class="col-md-2">
				<user-video :stream-manager="mainStreamManager"/>
				<canvas id="main-video-canvas" style="display:none;"/>
			</div> -->
			<div id='label-container'></div>
			<div id="video-container" class="col-md-6">
				<user-video :stream-manager="publisher" @click.native="updateMainVideoStreamManager(publisher)"/>
				<div>
					<v-col cols="6">
						<user-video v-for="sub in subscribers" 
						:key="sub.stream.connection.connectionId" 
						:stream-manager="sub" @click.native="updateMainVideoStreamManager(sub)"/>
					</v-col>
				</div>
			</div>
		</div>
		<div v-if="session">
			<h1>개인 점수</h1>
			<p v-for="(user, index) in personalScore" :key="index">{{ user }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideo from '../components/Room/UserVideo.vue';
import { mapGetters, mapActions } from 'vuex'
import { API_BASE_URL } from '@/config';
import Game from '../game/game.js';
import GameResultModal from './GameResultModalView.vue';
import DestroyRoomDialog from '@/components/Room/DestroyRoomDialog.vue'

axios.defaults.headers.post['Content-Type'] = 'application/json';

// const URL = 'https://teachablemachine.withgoogle.com/models/fKbC5tFyY/';
const URL = 'https://teachablemachine.withgoogle.com/models/w6iITyYRf/';
let model, webcam, ctx, labelContainer, maxPredictions;

// const OPENVIDU_SERVER_URL = "https://" + location.hostname + ":4443";
// const OPENVIDU_SERVER_SECRET = "MY_SECRET";

export default {
	name: 'App',

	components: {
		UserVideo,
		GameResultModal,
		DestroyRoomDialog
	},

	data () {
		return {
			OV: undefined,
			session: undefined,
			mainStreamManager: undefined,
			publisher: undefined,
			subscribers: [],

			mySessionId: '',
			myUserName: '',
			videoMute: false,		// 영상 중지
			audioMute: false,		// 음소거

			isHost: false,
			status: 0,		// 동작 인식 상태
			team1: [],		// 팀 정보
			team2: [],
			personalScore: {		// 개인별 점수
			},
			score1: 0,		// 팀별 점수
			score2: 0,
			gameFinished: false,
			leaveSessionDialog: false,
		}
	},

	methods: {

		joinSession () {
			// --- Get an OpenVidu object ---
			this.OV = new OpenVidu();

			// --- Init a session ---
			this.session = this.OV.initSession();

			// --- Specify the actions when events take place in the session ---

			// On every new Stream received...
			this.session.on('streamCreated', ({ stream }) => {
				// console.log(this.session)
				const subscriber = this.session.subscribe(stream);
				this.subscribers.push(subscriber);
			});

			// On every Stream destroyed...
			this.session.on('streamDestroyed', ({ stream }) => {
				const index = this.subscribers.indexOf(stream.streamManager, 0);
				if (index >= 0) {
					this.subscribers.splice(index, 1);
				}
			});

			// On every asynchronous exception...
			this.session.on('exception', ({ exception }) => {
				console.warn(exception);
			});

			// 운동 점수 수신
			this.session.on('signal:score', (event) => {
				console.log(event.data); // Message
				if (this.team1.includes(event.data)) {
					if (this.score1 - this.score2 < 10 && this.score1 - this.score2 >-10){
						this.score1 += 1
						this.personalScore[`${event.data}`] += 1

						if (this.score1 - this.score2 >= 10){
							this.game.scene.getScene('ropeFightScene').LeftWin();
							setTimeout(() => this.gameFinished = true, 1000);
						}
						else{
							this.game.scene.getScene('ropeFightScene').goLeftHandler();
						}						
					}
					//this.game.scene.getScene('ropeFightScene').goLeftHandler();


				} else {
					if (this.score1 - this.score2 < 10 && this.score1 - this.score2 >-10){
						this.score2 += 1
						this.personalScore[`${event.data}`] += 1
						if (this.score2 - this.score1 >= 10){
							this.game.scene.getScene('ropeFightScene').RightWin();
							setTimeout(() => this.gameFinished = true, 1000);
							
						}
						else{
							this.game.scene.getScene('ropeFightScene').goRightHandler();
						}

					}
					//this.game.scene.getScene('ropeFightScene').goRightHandler();


				}
				//this.personalScore[`${event.data}`] += 1
				console.log(event.from); // Connection object of the sender
				console.log(event.type); // The type of message
			});
			// 참가자 입장 수신
			this.session.on('signal:memberJoin', (event) => {
				console.log(event.data); // Message
				console.log("참가자 입장")
				if (this.isHost) {
					if (this.team1.length < 3) {
						this.team1.push(event.data)
					} else {
						this.team2.push(event.data)
					}
					this.personalScore[`${event.data}`] = 0
					this.sendTeamInfo()
				}
			});
			// 참가자 퇴장 수신
			this.session.on('signal:memberLeave', (event) => {
				console.log(event.data); // Message
				console.log("참가자 퇴장")
				if (this.isHost) {
					const id1 = this.team1.indexOf(`${event.data}`) 
					const id2 = this.team2.indexOf(`${event.data}`) 
					if (id1 !== -1){
						this.team1.splice(id1, 1)
					} else {
						this.team2.splice(id2, 1)
					}
					delete this.personalScore[`${event.data}`]
					this.sendTeamInfo()
				}
			});
			// 호스트 수신
			this.session.on('signal:host', (event) => {
				console.log('호스트 수신'); // Message
				if (!this.isHost) {
					const data = JSON.parse(event.data)
					this.team1 = data.team1
					this.team2 = data.team2
					this.personalScore = data.personalScore
				}
				console.log(event.from); // Connection object of the sender
				console.log(event.type); // The type of message
			});

			// --- Connect to the session with a valid user token ---

			// 'getToken' method is simulating what your server-side should do.
			// 'token' parameter should be retrieved and returned by your own backend
			
			// this.getToken(this.mySessionId, this.myUserName)

			this.init()

			window.addEventListener('beforeunload', this.leaveSession)
			//this.game = Game();			//generate phaser game when entering session
		
		},

		sendStart () {
			console.log("왔음")
			this.game.scene.getScene('bootScene').StartScene(1);
		},

		connectSession (token) {
			this.session.connect(token, { clientData: this.myUserName })
			.then(() => {

				// --- Get your own camera stream with the desired properties ---

				let publisher = this.OV.initPublisher(undefined, {
					audioSource: undefined, // The source of audio. If undefined default microphone
					videoSource: undefined, // The source of video. If undefined default webcam
					publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
					publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
					resolution: '640x480',  // The resolution of your video
					frameRate: 30,			// The frame rate of your video
					insertMode: 'APPEND',	// How the video is inserted in the target element 'video-container'
					mirror: true       	// Whether to mirror your local video or not
				});

				this.mainStreamManager = publisher;
				console.log(this.mainStreamManager)
				this.publisher = publisher;

				// --- Publish your stream ---

				this.session.publish(this.publisher);
			})
			.catch(error => {
				console.log('There was an error connecting to the session:', error.code, error.message);
			});
		},

		leaveSession () {
			this.game.destroy(true)
			// --- Leave the session by calling 'disconnect' method over the Session object ---
			this.session.signal({		// 참가자 퇴장 송신
				data: this.myUserName,  // Any string (optional)
				to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
				type: 'memberLeave'             // The type of message (optional)
			})
			.then(() => {
					console.log('Message successfully sent');
			})
			.catch(error => {
					console.error(error);
			})
			if (this.session) this.session.disconnect();
			const joinInfo = {
				code : this.mySessionId,
				id : this.myUserName
			}
			this.leaveRoom(joinInfo)

			this.session = undefined;
			this.mainStreamManager = undefined;
			this.publisher = undefined;
			this.subscribers = [];
			this.OV = undefined;
			this.setRoomClose()

			window.removeEventListener('beforeunload', this.leaveSession);
			this.$router.push('/waiting')
		},

		sendTeamInfo() {
			this.session.signal({		// 호스트 송신
				data: JSON.stringify({team1: this.team1, team2: this.team2, personalScore: this.personalScore}),  // Any string (optional)
				to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
				type: 'host'             // The type of message (optional)
			})
			.then(() => {
					console.log('Message successfully sent');
			})
			.catch(error => {
					console.error(error);
			})
		},

		updateMainVideoStreamManager (stream) {
			if (this.mainStreamManager === stream) return;
			this.mainStreamManager = stream;
		},

		videoControl () {
			if (this.videoMute) {
				this.publisher.publishVideo(true)
				this.videoMute = false
			} else {
				this.publisher.publishVideo(false)
				this.videoMute = true
			}
		},

		audioControl () {
			if (this.audioMute) {
				this.publisher.publishAudio(true)
				this.audioMute = false
			} else {
				this.publisher.publishAudio(false)
				this.audioMute = true
			}
		},

		getToken (mySessionId, myUserName) {
			axios ({
				url: API_BASE_URL + "/api/v1/rooms/get-token",
        method: 'post',
        data: {"code" : mySessionId, "id" : myUserName},
        headers: this.authHeader,
			})
				.then((res) => {
					console.log(res)
					const token = res.data.token
					this.session.connect(token, { clientData: this.myUserName })
					.then(() => {

						// --- Get your own camera stream with the desired properties ---

						let publisher = this.OV.initPublisher(undefined, {
							audioSource: undefined, // The source of audio. If undefined default microphone
							videoSource: undefined, // The source of video. If undefined default webcam
							publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
							publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
							resolution: '640x480',  // The resolution of your video
							frameRate: 30,			// The frame rate of your video
							insertMode: 'APPEND',	// How the video is inserted in the target element 'video-container'
							mirror: true       	// Whether to mirror your local video or not
						});

						this.mainStreamManager = publisher;
						console.log(this.mainStreamManager)
						this.publisher = publisher;

						// --- Publish your stream ---

						this.session.publish(this.publisher);

						this.session.signal({		// 참가자 입장 송신
							data: this.myUserName,  // Any string (optional)
							to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
							type: 'memberJoin'             // The type of message (optional)
						})
						.then(() => {
								console.log('Message successfully sent');
						})
						.catch(error => {
								console.error(error);
						})
						})
						.catch(error => {
							console.log('There was an error connecting to the session:', error.code, error.message);
						});
				})
		},

		//Methods related to Teachable Machine

		async init () {
			const modelURL = URL + 'model.json';
			const metadataURL = URL + 'metadata.json';

		// load the model and metadata
		// Refer to tmPose.loadFromFiles() in the API to support files from a file picker
			model = await tmPose.load(modelURL, metadataURL);
			maxPredictions = model.getTotalClasses();

		// Convenience function to setup a webcam
			const flip = true; // whether to flip the webcam
			webcam = new tmPose.Webcam(200, 200, flip); // width, height, flip
			await webcam.setup(); // request access to the webcam
			webcam.play();
			window.requestAnimationFrame(this.loop);

		// append/get elements to the DOM
			// append/get elements to the DOM
			const canvas = document.getElementById('main-video-canvas');
			canvas.width = 200; canvas.height = 200;
			ctx = canvas.getContext('2d');
			labelContainer = document.getElementById('label-container');
			for (let i = 0; i < maxPredictions; i++) { // and class labels
					labelContainer.appendChild(document.createElement('div'));
			}
		},

		async loop(timestamp) {
			webcam.update(); // update the webcam frame
			await this.predict();
			window.requestAnimationFrame(this.loop);
		},
		async predict() {
			// Prediction #1: run input through posenet
			// estimatePose can take in an image, video or canvas html element
			const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
			// Prediction 2: run input through teachable machine classification model
			const prediction = await model.predict(posenetOutput);
			if (prediction[0].probability.toFixed(2) >= 0.99) {
				if (this.status == 1) {
					this.session.signal({		// 운동 점수 송신
						data: this.myUserName,  // Any string (optional)
						to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
						type: 'score'             // The type of message (optional)
					})
					.then(() => {
							console.log('Message successfully sent');
					})
					.catch(error => {
							console.error(error);
					});
				}
				this.status = 0
			} else if (prediction[1].probability.toFixed(2) >= 0.99) {
				this.status = 1
			}
			for (let i = 0; i < maxPredictions; i++) {
					const classPrediction =
							prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
					labelContainer.childNodes[i].innerHTML = classPrediction;
			}

			// finally draw the poses
			//this.drawPose(pose);
		},

		drawPose(pose) {
			ctx.drawImage(webcam.canvas, 0, 0);
			// draw the keypoints and skeleton
			if (pose) {
				const minPartConfidence = 0.5;
				tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
				tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
			}
		},
		
		//END OF TEACHABLE MACHINE METHODS

		...mapActions(['setRoomClose', 'leaveRoom'])
	},

	computed : {
		...mapGetters(['roomCreate', 'roomInfo', 'roomJoin', 'joinInfo', 'authHeader']),
	},
	mounted () {
		this.game = Game();			//generate phaser game when entering session
	},
	created () {
		if (this.roomCreate) {
			axios ({
				url: API_BASE_URL + "/api/v1/rooms/create-room",
        method: 'post',
        data: this.roomInfo,
        headers: this.authHeader,
			})
				.then((res) => {
					console.log(res.data)
					this.mySessionId = res.data.code
					this.myUserName = res.data.host
					this.joinSession()
					this.connectSession(res.data.token)
					this.isHost = true
					this.team1.push(res.data.host)
					this.personalScore[`${res.data.host}`] = 0
				})
		} else if (this.roomJoin) {
				this.mySessionId = this.joinInfo.roomCode
				// this.mySessionId = "5YeWZztlx2"
				this.myUserName = this.joinInfo.userName
				this.joinSession()
				// this.connectSession("wss://i7a307.p.ssafy.io:4443?sessionId=ses_BjMvFY12vK&token=tok_WfIoBmdus23jFzoX")
				this.getToken(this.mySessionId, this.myUserName)
		} else {
				this.$router.push('/waiting')
		}
	},
	beforeDestroy() {
		console.log("destroy")
		if (this.session) {
			this.leaveSession()
		}
		// this.$router.push('/waiting')
  },

	// beforeRouteLeave(to, from, next) {
	// 	console.log('leave')
	// 	this.leaveSession()
	// 	next()
	// }
}
</script>
<style scoped>

</style>
