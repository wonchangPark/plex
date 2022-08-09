<template>
<div class="d-flex justify-center" v-if="streamManager" style="height:100%; width:100%">
	<div style="width:50%; height: 100%; background:red"></div>
	<ov-video :stream-manager="streamManager"/>
	<div style="width:50%; height: 100%; background:green"></div>
</div>
</template>

<script>
import OvVideo from './OvVideo';

export default {
	name: 'UserVideo',

	components: {
		OvVideo,
	},

	props: {
		streamManager: Object,
	},

	computed: {
		clientData () {
			const { clientData } = this.getConnectionData();
			return clientData;
		},
	},

	methods: {
		getConnectionData () {
			const { connection } = this.streamManager.stream;
			return JSON.parse(connection.data.split('%/%')[0]);
		},
	},
};
</script>
