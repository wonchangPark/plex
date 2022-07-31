<template>
    <ContentBox :height="90" :width="90">
        <div class="d-flex flex-column chatting-list-view">
            <ChattingItem></ChattingItem>
        </div>
    </ContentBox>
</template>

<script>
import ContentBox from '../common/ContentBox.vue';
import ChattingItem from './Item/ChattingItem.vue';
export default {
    name: "ChattingList",
    components: { ContentBox, ChattingItem }
};
</script>

<style scoped>
.chatting-list-view{
    
}
</style>
