// 定制请求的实例
import axios from "axios";
import { ElMessage } from 'element-plus';
import { useTokenStore } from "../store/token.ts";

import router from "../router";

const baseURL = import.meta.env.VITE_API_BASE || '/api'

const instance = axios.create({
    timeout: 10000,
    baseURL: baseURL
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        let tokenStore = useTokenStore()
        if (tokenStore.token) {
            config.headers.Authorization = `Bearer ${tokenStore.token}`
        }
        return config;
    },
    (error) => {
        // 如果请求错误做什么
        return Promise.reject(error);
    }
    
)

// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        // 判断业务代码
        if (result.data.code === 1) {
            return result.data;
        }
        ElMessage.error(result.data.msg ? result.data.msg : "服务异常");
        return Promise.reject(result.data);
    },
    error => {
        if (error.response?.status === 401) {
            ElMessage.error("请先登录")
            const tokenStore = useTokenStore()
            tokenStore.removeToken()
            router.push("/login")
        } else {
            ElMessage.error("服务异常")
        }
        // 异步的状态转化成失败的状态
        return Promise.reject(error);
    }
)

export default instance;