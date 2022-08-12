<template>
    <div class="modal">
        <div class="overlay">
        <div class="modal-card">
            <ContentBox :height="100" :width="100">
                <div class="d-flex flex-column">
                    <div id="Main" class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo animate__heartBeat">{{WhoWins()}}</div>
                    <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">
                        <div class="d-flex flex-column align-center">
                            <br>
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="(player, idx) in allScore" v-bind:key="player">{{ idx + 1 }}</div>
                            <!--<div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>-->
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="d-flex flex-column align-center">
                            NICKNAME
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="player in allScore" v-bind:key="player">{{ player.name }}</div>
                            <!--<div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>-->
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="d-flex flex-column align-center">
                            SCORE
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="player in allScore" v-bind:key="player">{{ player.score }}</div>
                            <!--<div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>-->
                        </div>
                    </div>
                </div>
            </ContentBox>
            </div>
        </div>
    </div>
</template>

<script>
import ContentBox from '@/components/common/ContentBox.vue';

export default {
    props:{
        score: {
            type: Object,
        },
        team1: {
            type: Array,
        },
        team2: {
            type: Array,
        },
        myName: {
            type: String,
        },
    },
    components: {ContentBox},
    mounted() {

    },
    data() {
        return {
            winner: undefined,
            myTeam: 0,
            allScore: [], //array to save score of all
            team1_personalScore: {},
            team2_personalScore: {},
        }
    },
    
    methods: {
        WhoWins() {

            let i;

            for (i = 0 ; i < this.team1.length ; i++)
                this.allScore.push({name: this.team1[i] ,score: this.score[this.team1[i]]});

            for (i = 0 ; i < this.team2.length ; i++)
                this.allScore.push({name: this.team2[i], score: this.score[this.team2[i]]});

            this.allScore.sort(function(a, b) {
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            })

            for (i = 0 ; i < this.allScore.length ; i++) {
                if (this.myName == this.allScore[i].name)
                    return "Your Rate : #" + (i + 1);
            }
            /*let team1_score = 0;
            let team2_score = 0;            
            
            //console.log(this.team1.length);
            //console.log(this.team2.length);
            //console.log(this.score);
           
            for (let i = 0 ; i < this.team1.length ; i++) {
                team1_score += this.score[this.team1[i]];
                //console.log(this.score[this.team1[i]]);
                this.team1_personalScore[this.team1[i]] = this.score[this.team1[i]];
            }
            
            for (let j = 0 ; j < this.team2.length ; j++) {
                team2_score += this.score[this.team2[j]];
                this.team2_personalScore[this.team2[j]] = this.score[this.team2[j]];
            }*/

            //console.log(team1_score);
            //console.log(team2_score);

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
</style>
