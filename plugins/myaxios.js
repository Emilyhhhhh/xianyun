//🚩🚩🚩🚩封装下载的axios,不是nuxt自带的，，，，
// 🚩🚩1.本地服务器
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:1337'
// export default axios

import { Message } from "element-ui";


// 🚩🚩2.远程服务器
// 创建一个 axios
import axios from 'axios'
export const http = axios.create({
    baseURL: 'http://157.122.54.189:9095'
})


http.interceptors.response.use(
    res => {
        console.log('自己安装的axios拦截到正常响应状态码为200的请求');
        // console.log(store);
        // 如果是状态码就报错的请求, 这里无法拦截, 需要添加第二个函数作为回调
        // 如果拦截了请求或者响应, 记得要 return
        return res
    },
    err => {
        console.log('这里拦截到状态码本身出错');
        // 这里可以拦截到状态码本身出错的请求
        console.dir(err)
        Message.error(err.message || '系统错误')
    }
)


// 添加请求拦截器
// 每一个我们自己封装的axios请求都会经过这个拦截器
// export default ({ store }) => {

//     http.interceptors.request.use(function(config) {
//         console.log('自己安装的axios拦截request');
//         console.log(config)
//             // 在发送请求之前做些什么:我要看看有没有token,如果有，则以请求头的方式进行传递
//         if (store.state.userstore.userInfo.token) {
//             console.log(store.state.userstore.userInfo.token);
//             // if (token) {
//             //     // 设置请求头
//             //     config.headers.Authorization = token
//             // }
//         }
//         return config;
//     }, function(error) {
//         // 对请求错误做些什么
//         return Promise.reject(error);
//     });

// }



// export default http