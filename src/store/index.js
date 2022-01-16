import { createStore } from "vuex";
import { testSortModule } from "./testSortModule";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    sort: testSortModule,
  },
});
