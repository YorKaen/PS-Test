export const testSortModule = {
  namespaced: true,
  state: () => ({
    isVisited: JSON.parse(localStorage.getItem("isVisited")),
    itemsSaved: JSON.parse(localStorage.getItem("itemsSaved")),
  }),
  mutations: {
    M_SET_VISITED(state) {
      state.isVisited = true;
      localStorage.setItem("isVisited", JSON.stringify(state.isVisited));
    },
    M_SAVE_ITEMS(state) {
      localStorage.setItem("itemsSaved", JSON.stringify(state.itemsSaved));
    },
    M_ADD_ITEM_START(state, value) {
      let tempArray = [...state.itemsSaved];
      tempArray.unshift(value);
      state.itemsSaved = tempArray;
    },
    M_ADD_ITEM_END(state, value) {
      let tempArray = [...state.itemsSaved];
      tempArray.push(value);
      state.itemsSaved = tempArray;
    },
    M_REMOVE_ITEM(state, value) {
      let tempArray = [...state.itemsSaved];
      //tempArray = tempArray.filter((i) => i.id !== value.id);
      state.itemsSaved = tempArray.filter((i) => i.id !== value.id);
      localStorage.setItem("itemsSaved", JSON.stringify(state.itemsSaved));
    },
    M_INITIAL_ITEMS(state, value) {
      state.itemsSaved = value;
      localStorage.setItem("itemsSaved", JSON.stringify(state.itemsSaved));
    },
  },
  actions: {
    async A_ITEMS_ADD({ commit }, payload) {
      try {
        commit("M_ADD_ITEM_START", payload);
        commit("M_SAVE_ITEMS");
        return Promise.resolve();
      } catch (e) {
        console.log(e);
        return Promise.reject();
      }
    },
  },
  modules: {},
};
