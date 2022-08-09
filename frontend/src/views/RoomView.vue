<template>
  <div
    class="d-flex flex-column align-center"
    style="height: 100%; width: 100%"
  >
    <div
      class="d-flex justify-center align-center"
      style="height: 50%; width: 100%"
    >
	<GameResultModal v-if="gameFinished" v-bind:score="personalScore" v-bind:team1="this.team1" v-bind:team2="this.team2" v-bind:myName="this.myUserName"/>
		<div id='label-container' style='display:none;'/>
      <div class="d-flex" style="height: 98%; width: 90%">
        <div id="game-container" style="height: 100%; width: 100%"></div>
				<TeachableItem ref="teachable" @sendScore="sendScore"></TeachableItem>
      </div>
    </div>
    <div
      class="d-flex justify-center align-center"
      style="height: 50%; width: 100%"
    >
      <div
        class="d-flex flex-column justify-space-between"
        style="height: 98%; width: 90%"
      >
        <div
          class="d-flex flex-row justify-space-between"
          style="height: 48%; width: 100%%"
        >
          <div style="heigth: 100%; width: 23%; background: #123455">
            <user-video :stream-manager="publisher" />
			<canvas id="main-video-canvas" style="display:none;"/>
          </div>
          <div style="heigth: 100%; width: 49%">
            <ContentBox :height="100" :width="100"> 
				<button class="btn btn-lg btn-success" @click="sendStart()">Start</button>
			</ContentBox>
          </div>
          <div style="heigth: 100%; width: 23%; background: #123455">
            <user-video v-if="subscribers[0] !== null" :stream-manager="subscribers[0]" />
          </div>
        </div>
        <div
          class="d-flex flex-row justify-space-between"
          style="height: 48%; width: 100%%"
        >
          <div style="heigth: 100%; width: 23%; background: #123455">
            <user-video v-if="subscribers[1] !== null" :stream-manager="subscribers[1]" />
          </div>
          <div style="heigth: 100%; width: 23%; background: #123455">
            <user-video v-if="subscribers[2] !== null" :stream-manager="subscribers[2]" />
          </div>
          <div style="heigth: 100%; width: 23%; background: #123455">
            <user-video v-if="subscribers[3] !== null" :stream-manager="subscribers[3]" />
          </div>
          <div style="heigth: 100%; width: 23%; background: #123455">
            <user-video v-if="subscribers[4] !== null" :stream-manager="subscribers[4]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import UserVideo from "../components/Room/UserVideo.vue";
import { mapGetters, mapActions } from "vuex";
import { API_BASE_URL } from "@/config";
import Game from "../game/game.js";
import GameResultModal from "./GameResultModalView.vue";
import ContentBox from "@/components/common/ContentBox.vue";
import TeachableItem from "@/components/Room/TeachableItem.vue"

axios.defaults.headers.post['Content-Type'] = 'application/json';


export default {
	name: 'App',

  components: {
    UserVideo,
    GameResultModal,
    ContentBox,
		TeachableItem,
  },

  data() {
    return {
      OV: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
		game: undefined,
      mySessionId: "",
      myUserName: "",
      videoMute: false, // 영상 중지
      audioMute: false, // 음소거

      isHost: false,
      status: 0, // 동작 인식 상태
      team1: [], // 팀 정보
      team2: [],
      personalScore: {}, // 개인별 점수,
      score1: 0, // 팀별 점수
      score2: 0,
      gameFinished: false,
    };
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
							setTimeout(() => this.gameFinished = false, 7000);
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
							setTimeout(() => this.gameFinished = false, 7000);
							
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
			

			window.addEventListener('beforeunload', this.leaveSession)
			//this.game = Game();			//generate phaser game when entering session
		
		},

		sendLeft(){
				if (this.score1 - this.score2 < 10 && this.score1 - this.score2 >-10){
						this.score1 += 1
						this.personalScore[`${event.data}`] += 1

						if (this.score1 - this.score2 >= 10){
							this.game.scene.getScene('ropeFightScene').LeftWin();
							setTimeout(() => this.gameFinished = true, 1000);
							setTimeout(() => this.gameFinished = false, 7000);
						}
						else{
							if (this.score1 > this.score2 + 7)
								this.game.scene.getScene('ropeFightScene').goLeftHandler(1);
							else
								this.game.scene.getScene('ropeFightScene').goLeftHandler(-1);
						}		
				}
		},
		sendRight(){
					if (this.score1 - this.score2 < 10 && this.score1 - this.score2 >-10){
						this.score2 += 1
						this.personalScore[`${event.data}`] += 1
						if (this.score2 - this.score1 >= 10){
							this.game.scene.getScene('ropeFightScene').RightWin();
							setTimeout(() => this.gameFinished = true, 1000);
							setTimeout(() => this.gameFinished = false, 7000);
						}
						else{
							if (this.score2 > this.score1 + 7)
								this.game.scene.getScene('ropeFightScene').goRightHandler(1);
							else
								this.game.scene.getScene('ropeFightScene').goRightHandler(-1);
							//this.game.scene.getScene('ropeFightScene').goRightHandler();
						}

					}
		},
		sendStart () {
			console.log("게임시작")
			// console.log(this.$refs.teachable)
			this.$refs.teachable.init()
			this.game.scene.getScene('bootScene').StartScene(1);
		},
		sendScore( ){
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
      }).then((res) => {
        console.log(res);
        const token = res.data.token;
        this.session
          .connect(token, { clientData: this.myUserName })
          .then(() => {
            // --- Get your own camera stream with the desired properties ---

            let publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: true, // Whether to mirror your local video or not
            });

            this.mainStreamManager = publisher;
            console.log(this.mainStreamManager);
            this.publisher = publisher;

            // --- Publish your stream ---

            this.session.publish(this.publisher);

            this.session
              .signal({
                // 참가자 입장 송신
                data: this.myUserName, // Any string (optional)
                to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                type: "memberJoin", // The type of message (optional)
              })
              .then(() => {
                console.log("Message successfully sent");
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });
    },

    ...mapActions(["setRoomClose", "leaveRoom"]),
  },

  computed: {
    ...mapGetters([
      "roomCreate",
      "roomInfo",
      "roomJoin",
      "joinInfo",
      "authHeader",
			"predictionData"
    ]),
  },
  mounted() {
    this.game = Game(); //generate phaser game when entering session
  },
  created() {
    if (this.roomCreate) {
      axios({
        url: API_BASE_URL + "/api/v1/rooms/create-room",
        method: "post",
        data: this.roomInfo,
        headers: this.authHeader,
      }).then((res) => {
        console.log(res.data);
        this.mySessionId = res.data.code;
        this.myUserName = res.data.host;
        this.joinSession();
        this.connectSession(res.data.token);
        this.isHost = true;
        this.team1.push(res.data.host);
        this.personalScore[`${res.data.host}`] = 0;
      });
    } else if (this.roomJoin) {
      this.mySessionId = this.joinInfo.roomCode;
      this.myUserName = this.joinInfo.userName;
      this.joinSession();
      this.getToken(this.mySessionId, this.myUserName);
    } else {
      this.$router.push("/waiting");
    }
  },
  beforeDestroy() {
    console.log("destroy");
    if (this.session) {
      this.leaveSession();
    }
    // this.$router.push('/waiting')
  },
};
</script>
<style scoped>

</style>
