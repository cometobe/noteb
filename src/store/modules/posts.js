import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(Vuex);

const state = {
  posttable: {},
  lists:[]
};

const actions = {
  fetchpostData: function ({commit, state}) {
    return new Promise(function (resolve, reject) {
      axios.get('/api/posttable').then((res) => {
        state.posttable = res.data;
        // console.log(state);
        //  console.log(res);
      })
        .catch((error) => {
          this.error = error;
          console.log(error)
        });
      // console.log(state);
    })
  }
  // titlelist:function(state){
  //       for(let p in state.posttable){
  //         console.log(state);
  //         objl={};
  //         objl.title=p.title;
  //         state.lists.push(objl)
  //       }
  //       return state.lists
  //   }

};

const getters = {
  // findpostbyid:(state) => (id) => {
  //   return state.posttables.find(id => posts._id === id)
  // },
  titlelist:function(state){
        for(let p in state.posttable){
          let objl={};
          objl.title=state.posttable[p].title;
          objl.id=state.posttable[p]._id;
          state.lists.push(objl)
        }
        return state.lists
    }
};

const mutations = {};

export default {
  state,
  actions,
  getters,
  mutations
}
