const roomStore = {
  namespaced: true,
  state: {
    rooms: [],
    lastPage: 6,
  },
  getters: {

  },
  mutations: {
    SET_ROOMS: (state, { rooms, lastPage }) => {
      state.rooms = rooms;
      state.lastPage = lastPage;
    },
    SET_CUR_PAGE: (state, payload) => {
      state.currentPage = payload;
    },
  },
  actions: {
    
  },
};

export default roomStore;
