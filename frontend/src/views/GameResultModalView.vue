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
    props: {
        score: {
            type: Array,
            required: true,
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
            var team1 = 0;
            var team2 = 0;
            console.log(this.score.length);
            for (var i = 0 ; i < this.score.length ; i++) {
                if (i < 3)
                    team1 += this.score[i];
                else
                    team2 += this.score[i];
            }

            console.log(team1);
            console.log(team2);

            if (team1 > team2)
                return "  Team 1 Wins! ";
            else if (team1 < team2)
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
