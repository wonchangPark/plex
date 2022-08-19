<template>
    <div class="modal">
        <div class="overlay">
        <div class="modal-card" style="width: 50%;">
            <ContentBox :height="100" :width="100">
                <div class="d-flex flex-column">
                    <div id="Main" class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo animate__heartBeat">{{WhoWins}}</div>
                    <v-container class="d-flex flex-column justify-center" style="flex: 1 1 100%; height:100%">
                        <v-row class="rank-content d-flex align-self-center" justify="center" align="center" style="width:90%;">
                            <v-col cols="4">
                            </v-col>
                            <v-col cols="4">
                            <div class="primary--text rank-label">닉네임</div>
                            </v-col>
                            <v-col cols="2">
                            <div class="primary--text rank-label">점수</div>
                            </v-col>
                            <v-col cols="2">
                            <div class="primary--text rank-label">순위</div>
                            </v-col>
                        </v-row>

                        <div class="rank-list-box d-flex flex-column" style="flex: 0 0 90%; width:100%; height: 90%;">
                        <div v-for="(ranker, idx) in rank"
                        :key="idx"
                        :ranker = ranker
                        >
                            <div class="d-flex justify-center align-center">
                                <ResultItem :rankerNick="ranker.userNick" :rankerRanking="idx + 1" :rankerTotalScore="ranker.score" :rankerImg="ranker.userImage"></ResultItem>
                            </div>
                        </div>
                        </div>
                    </v-container>
                </div>
            </ContentBox>
        </div>
        </div>
    </div>
</template>

<script>
import ContentBox from '@/components/common/ContentBox.vue';
import { mapState } from 'vuex'
import ResultItem from '@/components/Room/ResultItem.vue'
const room = "room";

export default {
    props:{
        score: {
            type: Object,
        },
        myName: {
            type: String,
        },
    },
    components: {ContentBox, ResultItem},
    mounted() {

    },
    data() {
        return {
            winner: undefined,
            myTeam: 0,
            allScore: [], //array to save score of all
        }
    },

    computed: {
        ...mapState(room, ["users"]),
        WhoWins() {

            this.allScoreSort();

            for (let i = 0 ; i < this.allScore.length ; i++) {
                if (this.myName == this.allScore[i].name)
                    return "Your Rate : #" + (i + 1);
            }
            return "";

        },
        rank() {
            const rankingList = []
            for (let i = 0; i < this.users.length; i ++ ) {
                rankingList.push({userNick: this.users[i].nick, score: this.score[this.users[i].nick], userImage: this.users[i].img})
            }
            rankingList.sort(function(a, b) {
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            })
            return rankingList
        }
    },
    
    methods: {
        allScoreSort() {
            let i;

            for (i = 0 ; i < Object.keys(this.score).length ; i++)
                this.allScore.push({name: Object.keys(this.score)[i] ,score: this.score[Object.keys(this.score)[i]]});

            this.allScore.sort(function(a, b) {
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            })
        }
    },
};
</script>

<style>

.overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    display: flex;
}
.overlay {
    background: rgba(0, 0, 0, 0.5);
    z-index: 30;
}
.modal-card {
    position: relative;
    /*max-width: 80%;
    min-height: 500px;*/
    background-color: white;
    z-index: 800;
    opacity: 1;
}
</style>

<style scoped>
.win-logo{
    font-size: 4vw;
}
.rank-label{
  font-size: 2vw;
  font-weight: bold;
}
#Main {
    margin-left: 11vw;
    margin-right: 9vw;
}
</style>
