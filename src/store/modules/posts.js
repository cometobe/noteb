import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(Vuex);

const state = {
  posttable: {},
  lists: [],
  postevent: []
};

const actions = {
  fetchpostData: function ({commit, state}) {
    return new Promise(function (resolve, reject) {
      axios.get('/api/posttable').then((res) => {
        commit('savepost', res);
        // state.posttable = res.data;
        // console.log(state);
        //  console.log(res);
      })
        .catch((error) => {
          // this.error = error;
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
  titlelist: function (state) {
    for (let p in state.posttable) {
      let objl = {};
      objl.title = state.posttable[p].title;
      objl.id = state.posttable[p]._id;
      state.lists.push({})
    }
    return state.lists
  },
  postevent: function (state) {
    for (let p in state.posttable) {

      state.postevent.push({
        title: state.posttable[p].title, start: state.posttable[p].createtime.slice(0, 10),
        end: state.posttable[p].createtime.slice(0, 10), id: state.posttable[p]._id
      })
    }
    console.log('事件', state.postevent);
    return state.postevent
  },
  postbyid: (state) => (id) => {
    console.log('查找结果',state.posttable.filter(o => o._id === id)[0]);
    return state.posttable.find(post => post._id === id)
  }
};

const mutations = {

  savepost(state, res) {
    return state.posttable = res.data;
  },
  savepostbyid(val){
    console.log('保存文本',val)
  }
};

export default {
  state,
  actions,
  getters,
  mutations
}
