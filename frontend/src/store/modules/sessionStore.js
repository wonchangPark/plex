import axios from '@/axios'
import { API_BASE_URL } from '@/config';
import { OpenVidu } from "openvidu-browser";
import store from '@/store'
import router from '@/router'

const API_URL = API_BASE_URL + '/api/v1';


const sessionStore = {
    namespaced: true,
    state:{
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
			personalScore: {},		// 개인별 점수,
			score1: 0,		// 팀별 점수
			score2: 0,
			gameFinished: false,
    },
    getters:{
      getOV: state => state.OV,
      getSession: state => state.session,
      getMainStreamManager: state => state.mainStreamManager,
      getPublisher: state => state.publisher,
      getSubscribers: state => state.subscribers,
      getMySessionId: state => state.mySessionId,
      getMyUserName: state => state.myUserName,
      getVideoMute: state => state.videoMute,
      getAudioMute: state => state.audioMute,
      getIsHost: state => state.isHost,
      getStatus: state => state.status,
      getTeam1: state => state.team1,
      getTeam2: state => state.team2,
      getPersonalScore: state => state.personalScore,
      getScore1: state => state.score1,
      getScore2: state => state.score2,
      getGameFinished: state => state.gameFinished,
    },
    mutations:{
      DATA_INIT: (state) => {
        state.score1 = 0
        state.score2 = 0
        for (let key in state.personalScore) {
          state.personalScore[`${key}`] = 0
        }
      }
    },
    actions:{
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
              console.log(this.personalScore[`${event.data}`]);
              console.log(this.personalScore);
              if (this.score1 - this.score2 >= 10){
                this.game.scene.getScene('ropeFightScene').LeftWin();
                setTimeout(() => this.gameFinished = true, 1000);
              }
              else{
                if (this.score1 > this.score2 + 7)
                  this.game.scene.getScene('ropeFightScene').goLeftHandler(1);
                else
                  this.game.scene.getScene('ropeFightScene').goLeftHandler(-1);
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
                if (this.score2 > this.score1 + 7)
                  this.game.scene.getScene('ropeFightScene').goRightHandler(1);
                else
                  this.game.scene.getScene('ropeFightScene').goRightHandler(-1);
                //this.game.scene.getScene('ropeFightScene').goRightHandler();
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
        // 호스트 수신 => 팀원 정보 수신
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
        // 호스트 퇴장 수신 => 호스트 퇴장시 모든 유저 퇴장
        this.session.on('signal:hostLeave', (event) => {
          console.log('호스트 퇴장 수신'); // Message
          console.log(event.from); // Connection object of the sender
          console.log(event.type); // The type of message
          this.leaveSession()
        });
        // 게임 시작 수신 => 호스트가 게임 시작 누르면 각 유저 게임 시작
        this.session.on('signal:gameStart', (event) => {
          this.game.scene.getScene('bootScene').StartScene(1);
          const data = JSON.parse(event.data)
          this.score1 = data.score1
          this.score2 = data.score2
          this.personalScore = data.personalScore
          console.log('게임 시작 수신'); // Message
          console.log(event.from); // Connection object of the sender
          console.log(event.type); // The type of message
        });
  
        // --- Connect to the session with a valid user token ---
  
        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        
        // this.getToken(this.mySessionId, this.myUserName)
  
        this.init() // teachable machine 시작
  
        window.addEventListener('beforeunload', this.leaveSession)
        //this.game = Game();			//generate phaser game when entering session
      
      },
      leaveRoom ({ getters }, joinInfo) {
        axios({
          url: API_URL + '/rooms/leave-room',
          method: 'post',
          data: joinInfo,
          headers: getters.authHeader
        })
        .then( (res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
          if (e.response.status == 401){
            store.dispatch('removeToken')
            router.push({name: 'login'})
        }
        })
      },
      dataInit ({ commit }) {
        commit('DATA_INIT')
      },
      sendScore( {getters} ){
        getters.getSession.signal({		// 운동 점수 송신
          data: this.myUserName,  // Any string (optional)
          to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: 'score'             // The type of message (optional)
        })
        .then(() => {
            console.log('Message successfully sent');
        })
        .catch(error => {
            console.error(error);
            if (error.response.status == 401){
              store.dispatch('removeToken')
              router.push({name: 'login'})
          }
        });
      }
    },
}

export default sessionStore;