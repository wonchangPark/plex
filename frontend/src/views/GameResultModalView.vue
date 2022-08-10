<template>
    <div class="modal">
        <div class="overlay">
        <div class="modal-card">
            <ContentBox :height="100" :width="100">
                <div class="d-flex flex-column">
                    <div id="Main" class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>
                    <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">
                        <div class="d-flex flex-column align-center">
                            TEAM 1
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="(score, teammate) in team1_personalScore" v-bind:key="teammate">{{ teammate }} : {{score}}</div>
                            <!--<div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>-->
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="d-flex flex-column align-center">
                            TEAM 2
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo" v-for="(score, teammate) in team2_personalScore" v-bind:key="teammate">{{ teammate }} : {{score}}</div>
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

        let elMain = document.getElementById("Main");

        if (this.winner == this.myTeam) {
            if (!elMain.classList.contains('animate__heartBeat'));
                elMain.classList.add('animate__heartBeat');
            if (elMain.classList.contains('animate__headShake'))
                elMain.classList.remove('animate__headShake');
        }

        else {
            if (elMain.classList.contains('animate__heartBeat'));
                elMain.classList.remove('animate__heartBeat');
            if (!elMain.classList.contains('animate__headShake'))
                elMain.classList.add('animate__headShake');
        }
    },
    data() {
        return {
            winner: undefined,
            myTeam: 0,
            team1_personalScore: {},
            team2_personalScore: {},
        }
    },
    watch : {
        team1() {
            console.log("Team1 변경");
        },
        team2() {
            console.log("Team2 변경")
        },
        score() {
            console.log("score 변경")
        },
    },
    methods: {
        WhoWins() {
            let team1_score = 0;
            let team2_score = 0;
            let h = 0;

            for (h = 0 ; h < this.team1.length ; h++) {
                if (this.team1[h] == this.myName) {
                    this.myTeam = 1;
                    break;
                }
            }

            if (this.myTeam == 0)
                this.myTeam = 2;

            
            
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
            }

            //console.log(team1_score);
            //console.log(team2_score);

            if (team1_score > team2_score) {
                if (this.myTeam == 1) {
                    this.winner = 1;
                    return "  You Win! ";
                }
                else {
                    this.winner = 2;
                    return " You Lose... ";
                }
            }
            else if (team1_score < team2_score) {
                if (this.myTeam == 2) {
                    this.winner = 2;
                    return "  You Win! ";
                }
                else {
                    this.winner = 1;
                    return " You Lose... ";
                }
            }
            else
                return "draw!";
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
