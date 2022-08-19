<template>
    <div class="d-flex flex-column align-center" style="height: 100%; width: 100%">
        <div class="d-flex justify-center align-center" style="height: 50%; width: 100%">
            <GameResultModal
                v-if="gameFinished"
                v-bind:score="personalScore"
                v-bind:team1="this.team1"
                v-bind:team2="this.team2"
                v-bind:myName="this.myUserName"
            />
            <div id="label-container" style="display: none" />
            <div class="d-flex" style="height: 98%; width: 90%" id="game-canvas">
                <div id="game-container" style="height: 100%; width: 100%"></div>
            </div>
        </div>
        <div class="d-flex justify-center align-center" style="height: 50%; width: 100%">
            <div class="d-flex flex-column justify-space-between" style="height: 98%; width: 90%">
                <div class="d-flex flex-row justify-space-between" style="height: 48%; width: 100%%">
                    <div style="heigth: 100%; width: 20%; background: rgba(0, 0, 0, 0.5)">
                        <user-video :pose1="parseFloat(pose1)" :pose2="parseFloat(pose2)" :stream-manager="publisher" />
                        <canvas id="main-video-canvas" style="display: none" />
                    </div>
                    <div style="heigth: 100%; width: 47%">
                        <ContentBox :height="100" :width="100">
                            <ScoreBoard v-if="countDown <= 0 && start" :score1="score1" :score2="score2"></ScoreBoard>
                            <div class="d-flex justify-center align-center primary--text" style="width:100%; height:100%; font-size: 3vw; cursor: pointer;" v-if="!start && isHost" @click="countDownStart()">Start
                            </div>
                            <div class="d-flex justify-center align-center primary--text" style="width:100%; height:100%; font-size: 3vw; " v-if="!start && !isHost">Ready
                            </div>
                            <!-- <button class="btn btn-lg btn-success" v-if="!countDown" @click="gameHistory()">Start</button> -->
                            <CountDown v-if="countDown > 0" :countDown="countDown"></CountDown>
                            <div id="label-container"></div>
                        </ContentBox>
                    </div>
                    <div style="heigth: 100%; width: 20%; background: rgba(0, 0, 0, 0.5)">
                        <user-video v-if="subscribers[2] !== null" :stream-manager="subscribers[2]" :signal="signal[2]" />
                    </div>
                </div>
                <div class="d-flex flex-row justify-space-between" style="height: 48%; width: 100%%">
                    <div style="heigth: 100%; width: 20%; background: rgba(0, 0, 0, 0.5)">
                        <user-video v-if="subscribers[0] !== null" :stream-manager="subscribers[0]" :signal="signal[0]" />
                    </div>
                    <div style="heigth: 100%; width: 20%; background: rgba(0, 0, 0, 0.5)">
                        <user-video v-if="subscribers[1] !== null" :stream-manager="subscribers[1]" :signal="signal[1]" />
                    </div>
                    <div style="heigth: 100%; width: 20%; background: rgba(0, 0, 0, 0.5)">
                        <user-video v-if="subscribers[3] !== null" :stream-manager="subscribers[3]" :signal="signal[3]" />
                    </div>
                    <div style="heigth: 100%; width: 20%; background: rgba(0, 0, 0, 0.5)">
                        <user-video v-if="subscribers[4] !== null" :stream-manager="subscribers[4]" :signal="signal[4]" />
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Game from "../game/game.js";
import GameResultModal from "./GameResultModalView.vue";
import ContentBox from "@/components/common/ContentBox.vue";
import ScoreBoard from "@/components/Room/ScoreBoard.vue";
import CountDown from "@/components/Room/CountDown.vue"
axios.defaults.headers.post["Content-Type"] = "application/json";

//테스트 (오른손/왼손)
// const URL = "https://teachablemachine.withgoogle.com/models/w6iITyYRf/";

// 스쿼트
const URL = "https://teachablemachine.withgoogle.com/models/vfNVyGUdk/";

//런지
//const URL = "https://teachablemachine.withgoogle.com/models/b_Be6e80e/";


let model, webcam, ctx, labelContainer, maxPredictions;
const room = "room";

export default {
  name: "App",

  components: {
    UserVideo,
    GameResultModal,
    ContentBox,
    ScoreBoard,
    CountDown,
  },

  data() {
    return {
        OV: undefined,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [null, null, null, null, null],
        game: undefined,
        mySessionId: "",
        myUserName: "",
        videoMute: false, // 영상 중지
        audioMute: false, // 음소거

        ropeFightMusic: require("../assets/audio/ropeFightAudio.mp3"),
        gameEndMusic: require("../assets/audio/gameEndAudio.mp3"),
        ropeFightFallSoundEffect: require("../assets/audio/ropeFightFallAudio.mp3"),
        blopMusic: require("../assets/audio/blop.mp3"),
        musicOn: undefined,
        musicOnGameEnd: undefined,
        soundOnFall: undefined,
        blopOn: undefined,

        user: {},
        roomNo:'', // 방 번호
        isHost: false, //호스트 여부
        status: 0, // 동작 인식 상태
        team1: [], // 팀 정보
        team2: [],
        personalScore: {}, // 개인별 점수,
        score1: 0, // 팀별 점수
        score2: 0,
        teamNo: 0, // 현재 팀
        gameFinished: false,
        pose1: 0, // teachable machine 동작인식 값
        pose2: 0,
        signal: [0, 0, 0, 0, 0],
        countDown: 0,
        gameHistoryNoSync: 0,
        timer: undefined,
        start: false,

        imgArray : {}, // 개인별 사진 목록
        };
    },

  methods: {
    gameHistory(){
      const score = {
        exerciseNum: 1,
        gameNo: 1,
        score: (this.win ? 100 : 0 ) + this.personalScore[`${this.myUserName}`] * 10,
        teamNo: this.teamNo,
        win: this.win, 
        gameHistoryNo: this.gameHistoryNoSync,
        userNo: this.getUser.no,
        roomNo: this.roomNo
      }
      if(this.isHost) {
        this.endGameHistory({ roomNo: this.roomNo, gameHistoryNo: this.gameHistoryNo })
      }
      this.setGameScore(score)
    },
    countDownTimer () {
        this.start = true
        this.blopOn = new Audio(this.blopMusic);
        this.blopOn.play();
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    dataInit() {
      this.score1 = 0;
      this.score2 = 0;
      for (let key in this.personalScore) {
        this.personalScore[`${key}`] = 0;
      }
    },
    joinSession() {
        // --- Get an OpenVidu object ---
        this.OV = new OpenVidu();

        // --- Init a session ---
        this.session = this.OV.initSession();

        // --- Specify the actions when events take place in the session ---

        // On every new Stream received...
        this.session.on("streamCreated", ({ stream }) => {
        // console.log(this.session)
        const subscriber = this.session.subscribe(stream);
        console.log(subscriber.stream.connection.data)
         if (this.team1.includes(subscriber.stream.connection.data) && this.teamNo === 1) {
          for (let i = 0; i < 2; i++ ){
            if (this.subscribers[i] === null) {
              this.subscribers[i] = subscriber
              break
            }
          }
        } else if (this.team2.includes(subscriber.stream.connection.data) && this.teamNo === 2) {
          for (let i = 0; i < 2; i++ ){
            if (this.subscribers[i] === null) {
              this.subscribers[i] = subscriber
              break
            }
          }
        } else {
          for (let i = 2; i < 5; i++ ){
            if (this.subscribers[i] === null) {
              this.subscribers[i] = subscriber
              break}
            }}
        });

        // On every Stream destroyed...
        this.session.on("streamDestroyed", ({ stream }) => {
        const index = this.subscribers.indexOf(stream.streamManager, 0);
            this.subscribers[index] = null
        });

        // On every asynchronous exception...
        this.session.on("exception", ({ exception }) => {
        console.warn(exception);
        });

        // 운동 점수 수신
        this.session.on("signal:score", (event) => {
            console.log(event.data); // Message
            if (this.game.scene.getScene("ropeFightScene").gameActive) {
                if (this.team1.includes(event.data)) {
                    this.score1 += 1;
                    this.personalScore[`${event.data}`] += 1;
                    console.log(this.personalScore[`${event.data}`]);
                    console.log(this.personalScore);
                    if (this.score1 - this.score2 >= 10 || (this.game.scene.getScene("ropeFightScene").leftTime <= 0 && this.score1 - this.score2 >= 1)) {
                        this.game.scene.getScene("ropeFightScene").LeftWin();
                        if (this.musicOn != undefined)
                            this.musicOn.pause();
                        if (this.timer != undefined)
                            clearInterval(this.timer);
                        this.scoreSync()
                        this.soundOnFall = new Audio(this.ropeFightFallSoundEffect);
                        this.soundOnFall.play();
                        this.musicOnGameEnd = new Audio(this.gameEndMusic);
                        this.musicOnGameEnd.volume = 0.15;
                        setTimeout(() => (this.gameFinished = true), 3000);
                        setTimeout(() => (this.musicOnGameEnd.play()), 3000);
                        setTimeout(() => (this.gameFinished = false), 13000);
                        this.game.scene.getScene("ropeFightScene").gameActive = false;
                        setTimeout(() => (this.leaveSession()), 7000);
                    } else {
                        if (this.score1 > this.score2 + 7)
                            this.game.scene.getScene("ropeFightScene").goLeftHandler(1);
                        else 
                            this.game.scene.getScene("ropeFightScene").goLeftHandler(-1);
                    }
                //this.game.scene.getScene('ropeFightScene').goLeftHandler();
            } else {
                this.score2 += 1;
                this.personalScore[`${event.data}`] += 1;
                if (this.score2 - this.score1 >= 10 || (this.game.scene.getScene("ropeFightScene").leftTime <= 0 && this.score2 - this.score1 >= 1)) {
                    this.game.scene.getScene("ropeFightScene").RightWin();
                    if (this.musicOn != undefined)
                        this.musicOn.pause();
                    if (this.timer != undefined)
                            clearInterval(this.timer);
                    this.scoreSync()
                    this.soundOnFall = new Audio(this.ropeFightFallSoundEffect);
                    this.soundOnFall.play();
                    this.musicOnGameEnd = new Audio(this.gameEndMusic);
                    this.musicOnGameEnd.volume = 0.15;
                    setTimeout(() => (this.gameFinished = true), 3000);
                    setTimeout(() => (this.musicOnGameEnd.play()), 3000);
                    setTimeout(() => (this.gameFinished = false), 13000);
                    this.game.scene.getScene("ropeFightScene").gameActive = false;
                    setTimeout(() => (this.leaveSession()), 7000);
                } else {
                    if (this.score2 > this.score1 + 7)
                        this.game.scene.getScene("ropeFightScene").goRightHandler(1);
                    else
                        this.game.scene.getScene("ropeFightScene").goRightHandler(-1);
                        //this.game.scene.getScene('ropeFightScene').goRightHandler();
                }
                //this.game.scene.getScene('ropeFightScene').goRightHandler();
            }}
            let userNick = event.data;
            let idx = null;
            for (let i = 0; i < this.subscribers.length; i++) {
                if (this.subscribers[i] !== null && this.subscribers[i].stream.connection.data === userNick) {
                    idx = i;
                    break;
                }
            }
            if (idx !== null) this.signal[idx]++;
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
            });

        // 참가자 퇴장 수신
        this.session.on("signal:memberLeave", (event) => {
            console.log(event.data); // Message
            console.log("참가자 퇴장");
            if (this.isHost) {
                const id1 = this.team1.indexOf(`${event.data}`);
                const id2 = this.team2.indexOf(`${event.data}`);
            if (id1 !== -1) {
                this.team1.splice(id1, 1);
            } else {
                this.team2.splice(id2, 1);
            }
            delete this.personalScore[`${event.data}`];
            this.sendTeamInfo();
            }
        });
        // 호스트 수신 => 팀원 정보 수신
        this.session.on("signal:host", (event) => {
            console.log(event.data)
            console.log("호스트 수신"); // Message
            if (!this.isHost) {
                const data = JSON.parse(event.data);
                this.team1 = data.team1;
                this.team2 = data.team2;
                this.personalScore = data.personalScore;
            if (this.team1.includes(this.userName)) {
            this.teamNo = 1
            } else {
            this.teamNo = 2
            }
            }
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
        });
        // 호스트 퇴장 수신 => 호스트 퇴장시 모든 유저 퇴장
        this.session.on("signal:hostLeave", (event) => {
            console.log("호스트 퇴장 수신"); // Message
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
            this.leaveSession();
        });
        // countDown 수신
        this.session.on("signal:countDown", (event) => {
            console.log("카운트다운"); // Message
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
            this.countDown = 5
            this.countDownTimer()
        });
        // 게임 시작 수신 => 호스트가 게임 시작 누르면 각 유저 게임 시작
        this.session.on("signal:gameStart", (event) => {
            this.game.scene.getScene("bootScene").StartScene(0);
            this.game.scene.getScene('ropeFightScene').leftTime = 60;
            this.game.scene.getScene('ropeFightScene').gameActive = true;
            this.game.scene.getScene("ropeFightScene").setTeamName(this.team1, this.team2);

            //이미지 설정
            this.game.scene.getScene("ropeFightScene").setImg(this.team1, this.team2, this.imgArray);
            
            const data = JSON.parse(event.data);
            this.score1 = data.score1;
            this.score2 = data.score2;
            this.personalScore = data.personalScore;
            this.gameEnd = false
            console.log("게임 시작 수신"); // Message
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
        });
        // gameHistoryNo 수신
        this.session.on("signal:gameHistoryNo", (event) => {
            console.log("gameHistoryNo sync"); // Message
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
            this.gameHistoryNoSync = event.data
        });
        // 점수 동기화 수신
        this.session.on("signal:scoreSync", (event) => {
            console.log("scoreSync"); // Message
            console.log(event.from); // Connection object of the sender
            console.log(event.type); // The type of message
            const data = JSON.parse(event.data);
            this.score1 = data.score1;
            this.score2 = data.score2;
            this.personalScore = data.personalScore;
            this.gameHistory()
        });

        // --- Connect to the session with a valid user token ---
        this.connectSession(this.gameRoom.token)

        this.init()

        window.addEventListener("beforeunload", this.leaveSession);
        //this.game = Game();			//generate phaser game when entering session
      
    },

    countDownStart() { // countDown 송신
        this.session
        .signal({
            data: 'count', // Any string (optional)
            to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: "countDown", // The type of message (optional)
            })
            .then(() => {
                console.log("Message successfully sent");
            })
            .catch((error) => {
                console.error(error);
        });
    },
    sendStart() {
        console.log("게임시작");
        // console.log(this.$refs.teachable)
        // this.$refs.teachable.init()
        // this.init()
        this.dataInit()
        this.musicOn = new Audio(this.ropeFightMusic);
        this.musicOn.volume = 0.15;
        this.musicOn.play();
        this.musicOn.loop = true;
        this.game.scene.getScene("bootScene").StartScene(0);
        this.game.scene.getScene('ropeFightScene').leftTime = 60;
        this.game.scene.getScene('ropeFightScene').gameActive = true;

        //이미지 설정
        this.game.scene.getScene("ropeFightScene").setTeamName(this.team1, this.team2);
        this.game.scene.getScene("ropeFightScene").setImg(this.team1, this.team2, this.imgArray);

        if (this.game.scene.getScene("ropeFightScene").gameActive) {
                console.log("Timer Start!");
                this.timer = setInterval(()=>(this.game.scene.getScene("ropeFightScene").onTimerEvent()), 1000);
        
        }
        this.session
            .signal({
                // 게임 시작 송신
                data: JSON.stringify({ score1: this.score1, score2: this.score2, personalScore: this.personalScore }), // Any string (optional)
                to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                type: "gameStart", // The type of message (optional)
            })
            .then(() => {
                console.log("Message successfully sent");
            })
            .catch((error) => {
                console.error(error);
            });

        },

    sendScore() {
        this.session
            .signal({
                // 운동 점수 송신
                data: this.myUserName, // Any string (optional)
                to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                type: "score", // The type of message (optional)
            })
            .then(() => {
                console.log("Message successfully sent");
            })
            .catch((error) => {
                console.error(error);
            });
    },

    scoreSync() {
        if (this.isHost) {
            this.session
                .signal({
                    // 점수 동기화
                    data: JSON.stringify({ score1: this.score1, score2: this.score2, personalScore: this.personalScore }), // Any string (optional)
                    to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                    type: "scoreSync", // The type of message (optional)
                })
                .then(() => {
                    console.log("Message successfully sent");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },

    connectSession(token) {
        this.session
            .connect(token, this.myUserName)
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
            })
            .catch((error) => {
                console.log("There was an error connecting to the session:", error.code, error.message);
            });
    },

    leaveSession() {
        this.game.destroy(true);
        // --- Leave the session by calling 'disconnect' method over the Session object ---
        if (this.isHost) {
            this.session
                .signal({
                    // 호스트 퇴장 송신
                    data: this.myUserName, // Any string (optional)
                    to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                    type: "hostLeave", // The type of message (optional)
                })
                .then(() => {
                    console.log("Message successfully sent");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.session
                .signal({
                    // 참가자 퇴장 송신
                    data: this.myUserName, // Any string (optional)
                    to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                    type: "memberLeave", // The type of message (optional)
                })
                .then(() => {
                    console.log("Message successfully sent");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (this.session) this.session.disconnect();
        const joinInfo = {
            code: this.mySessionId,
            id: this.myUserName,
        };
        this.leaveRoom(joinInfo);

        this.session = undefined;
        this.mainStreamManager = undefined;
        this.publisher = undefined;
        this.subscribers = [];
        this.OV = undefined;
        this.SET_ROOMCLOSE();
        this.INIT_ROOM()
        this.INIT_USERS()
        this.SET_TOGGLE_TAB(true);
        window.removeEventListener("beforeunload", this.leaveSession);
        this.$router.push("/waiting");
    },

    sendTeamInfo() {
        this.session
            .signal({
                // 호스트 송신
                data: JSON.stringify({
                    team1: this.team1,
                    team2: this.team2,
                    personalScore: this.personalScore,
                }), // Any string (optional)
                to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                type: "host", // The type of message (optional)
            })
            .then(() => {
                console.log("Message successfully sent");
            })
            .catch((error) => {
                console.error(error);
            });
    },

    updateMainVideoStreamManager(stream) {
        if (this.mainStreamManager === stream) return;
        this.mainStreamManager = stream;
    },

    videoControl() {
        if (this.videoMute) {
            this.publisher.publishVideo(true);
            this.videoMute = false;
        } else {
            this.publisher.publishVideo(false);
            this.videoMute = true;
        }
    },

    audioControl() {
        if (this.audioMute) {
            this.publisher.publishAudio(true);
            this.audioMute = false;
        } else {
            this.publisher.publishAudio(false);
            this.audioMute = true;
        }
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
      this.pose1 = Number(prediction[0].probability.toFixed(2))
      this.pose2 = Number(prediction[1].probability.toFixed(2))

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

    ...mapActions(room, ["leaveRoom", "setGameHistory", "endGameHistory", "setGameScore"]),
    ...mapMutations(room, ["SET_ROOMCLOSE", "INIT_USERS", "INIT_ROOM", "SET_TOGGLE_TAB"]),
  },

    computed: {
        ...mapGetters(room, ["roomJoin", "gameHistoryNo"]),
        ...mapGetters(["getUser"]),
        ...mapState(room, ["gameRoom", "users"]),
        win () {
            return (this.score1 > this.score2 ? 1: 2) === this.teamNo ? true: false
        },
    },
    watch: {
        countDown: function () {
            if (this.countDown === 0) {
                this.sendStart()
            } 
        },
        gameHistoryNo: function () {
            if (this.isHost) {
                this.session.signal({		// 게임 기록 송신
                    data: this.gameHistoryNo,  // Any string (optional)
                    to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
                    type: 'gameHistoryNo'             // The type of message (optional)
                })
                .then(() => {
                        console.log('Message successfully sent');
                })
                .catch(error => {
                        console.error(error);
                });
            }
        }
    },
    mounted() {
        this.game = Game(); //generate phaser game when entering session
        //this.game.scene.getScene("waitingScene").gameCategory = 0;
    },
    created() {
        console.log("방 입장")
        this.mySessionId = this.gameRoom.code
        this.roomNo = this.gameRoom.no
        this.myUserName = this.getUser.nick
        this.joinSession()
        this.user = this.users.filter((user) => user.nick === this.myUserName)[0]
        this.teamNo = this.user.team
        this.isHost = this.user.host
        if (this.isHost) {
            this.setGameHistory(this.roomNo)
        }
        this.users.forEach(user => {
            if (user.team === 1) {
                this.team1.push(user.nick)
            } else {
                this.team2.push(user.nick)
            }
            this.personalScore[`${user.nick}`] = 0;

            //이미지 설정
            this.imgArray[`${user.nick}`] = `${user.img}`;
        })
    },
    beforeDestroy() {
        console.log("destroy");
        if (this.musicOn != undefined)
            this.musicOn.pause();
        if (this.session) {
            this.leaveSession();
        }
        // this.$router.push('/waiting')
    },
    updated(){

        // 대기화면 이미지 설정
        this.game.scene.getScene("waitingScene").setTeamName(this.team1, this.team2);

        this.game.scene.getScene("waitingScene").setImg(this.team1, this.team2, this.imgArray);
    }
};
</script>
<style scoped>
#game-canvas { 
    border:solid;
    border-color:rgba(74, 62, 51, 1);
    /* border-width: thick; */
    box-sizing: content-box;
}
</style>
