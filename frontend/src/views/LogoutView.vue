<template>
    <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    created: function () {
        setTimeout(() => {
            this.logout();
        }, 1000);
    },
    methods: {
        ...mapActions(["logout"]),
    },
};
</script>

<style></style>
