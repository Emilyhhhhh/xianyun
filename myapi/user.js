// 封装api接口
import { http } from '@/plugins/myaxios.js'

// 首页轮播图
export const banners = () => {
    return http({
        url: 'scenics/banners'
    })
}

// 登录
export const login = (data) => {
    return http({
        method: 'post',
        url: 'accounts/login',
        data
    })
}


// 注册
export const register = (data) => {
    return http({
        method: 'post',
        url: 'accounts/register',
        data
    })
}


//手机验证码
export const captchas = (tel) => {
    return http({
        method: 'post',
        url: '/captchas',
        // 注意data传参的格式，不然会报400
        data: {
            tel
        }
    })
}


//实时机票城市：首页搜索框
export const airsSearch = (name) => {
    return http({
        url: '/airs/city',
        // 注意data传参的格式，不然会报400
        params: {
            name
        }
    })
}

//展示在酒店的搜索的区域位置
export const scenicsList = (name) => {
    return http({
        url: '/cities',
        // 注意data传参的格式，不然会报400
        params: {
            name
        }
    })
}

//推荐机票：首页底部的特价机票
export const airsSale = () => {
    return http({
        url: '/airs/sale',
        // 注意data传参的格式，不然会报400
    })
}

//机票列表：机票列表页数据渲染
export const airsList = (params) => {
    return http({
        url: '/airs',
        params
        // 注意data传参的格式，不然会报400
    })
}