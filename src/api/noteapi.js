// const _posts = [
//   {"text": '1', "title": "iPad 4 Mini", "createtime": '2018-05-02 20:01:21', "lastedittime": '2018-05-02 20:01:21'},
//   {"text": '2', "title": "H&M T-Shirt White", "createtime": '2018-05-03 20:01:21', "lastedittime":'2018-05-03 20:01:21'},
//   {"text": '3', "title": "Charli XCX - Sucker CD", "createtime": '2018-05-04 20:01:21', "lastedittime":'2018-05-04 20:01:21'}
// ];
//
// export default {
//   getPosts (cb) {
//     setTimeout(() => cb(_posts), 100)
//   },
//
//   buyProducts (products, cb, errorCb) {
//     setTimeout(() => {
//       // simulate random checkout failure.
//       (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
//         ? cb()
//         : errorCb()
//     }, 100)
//   }
// }

import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://127.0.0.1:5000/api';

// export const addpostlist = params => {
//     return axios ({
//         method: 'POST',
//         url: `${baseURL}/posttable`,
//         data: params
//     })
//     .then(res => res.data,console.log('setpostlist',res.data))
// };
//
// export const postlist =() => {
//     return axios ({
//         method: 'GET',
//         url: `${baseURL}/posttable`
//     })
//     .then(res => res.data,console.log('getpostlist',res.data))
// };

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     // _.toast("错误的传参", 'fail');
    console.log(error);
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    console.log(error);
    return Promise.reject(error);
});

export function fetch(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export function postdata(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
  /**
   * 获取文章列表
   */
  Getpostlist() {
    return fetch('/posttable')
  },

  /**
   * 增加文章
   */
  Addpost(params) {
    return postdata('/posttable', params)
  }
}
