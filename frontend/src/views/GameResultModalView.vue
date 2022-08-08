<template>
    <div class="modal">
        <div class="overlay" @click="$emit('close-modal')">
        <div class="modal-card">
            <ContentBox :height="100" :width="100">
                <div class="d-flex flex-column">
                    <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>
                    <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">
                        <div class="d-flex flex-column align-center">
                            TEAM 1
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="d-flex flex-column align-center">
                            TEAM 2
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>
                            <div class="flex-grow-1 d-flex flex-row justify-center primary--text font-weight-bold win-logo">{{WhoWins()}}</div>
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
        }
    },
    components: {ContentBox},
    data() {
        return {
            winner: undefined,
        }
    },
    methods: {
        WhoWins() {
            let team1_score = 0;
            let team2_score = 0;
            
            //console.log(this.team1.length);
            //console.log(this.team2.length);
            //console.log(this.score.length);
            /*for (var i = 0 ; i < this.score.length ; i++) {
                if (i < 3)
                    team1_score += this.score[i];
                else
                    team2_score += this.score[i];
            }*/

            console.log(team1_score);
            console.log(team2_score);

            if (team1_score > team2_score)
                return "  Team 1 Wins! ";
            else if (team1_score < team2_score)
                return "  Team 2 Wins! ";
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
