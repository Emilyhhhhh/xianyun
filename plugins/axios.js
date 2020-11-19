import { Message } from "element-ui";

// 这里是被插件系统使用的代码
// 在所有的插件里面
// 如果用 export default 导出一个默认函数的话
// 这个函数会自动获得一个 nuxt 实例的传参
// export default (nuxt) => {
//     nuxt.$axios
//     nuxt.store
//     如果只需要其中某些属性, 可以用结构的方式实现
// }


//封装nuxt自带的axios拦截器
//🚩🚩如果在插件里面需要获取nuxt本身
//需要export default

// 这里的参数可以接收nuxt的参数，nuxt.xx
export default function ({ $axios, redirect, store }) {

    // 通过正则判断需要 token 的 url，然后设置请求拦截，在请求需要 token 的路由时加上 token
    const checkUrl = (url) => (
        // /^\/comments(\/like)?$/.test(url) ||
        /^\/airorders(\/(pay|checkpay))?$/.test(url) ||
        /^airorders(\/(\d{0,4}))$/.test(url)
    )

    $axios.onRequest(config => {
        // 对请求的数据做些什么
        const token = store.state.userstore.userInfo.token

        if (token) {
            console.log('nuxt/axios onRequest', store.state.userstore.userInfo.token);
            if (checkUrl(config.url)) {
                config.headers.Authorization = 'Bearer ' + token
            }
            console.log(config)

        }
    });


    // $axios.onError 是一个 nuxt 提供的辅助拦截器函数
    // 里面可以拦截到错误
    $axios.onError(err => {
        // 这里是每当出错的时候都会被拦截
        console.log(err);
        // 这个 err 是一个错误对象, log 的时候看不出来有什么用
        // 用 dir 可以看到里面的内容
        console.dir(err);
        console.log('错误信息是nuxt/axios: ' + err.response.data.message);
        // 弹出一个提示告诉用户
        // this.$message.error('') 在这里由于不是组件内部, 没有 this 可以用
        // 可以单独引入element ui 当中的 Message 组件
        Message.error(err.response.data.message || '系统错误')

        // 如果需要跳转页面, 比如说需要跳转到登录页
        // 可以从 nuxt 中拿到 redirect 函数即可
        // redirect('/user/login')

    })
}