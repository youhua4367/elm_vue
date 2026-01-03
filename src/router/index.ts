import {createRouter, createWebHistory} from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
// import {useTokenStore} from "../store/token.ts";

const routes: RouteRecordRaw[] = [
    {path: '/', redirect: '/home' },
    {path: '/home', component: () => import('@/views/Home.vue')},
    {path: '/list/:id', component: () => import('@/views/BusinessList.vue')},
    {path: '/info/:id', component: () => import('@/views/BusinessInfo.vue'), meta: { showFooter: false }},
    {path: '/order', component: () => import('@/views/HistoryOrder.vue')},
    {path: '/login', component: () => import('@/views/Login.vue')},
    {path: '/checkout', component: () => import('@/views/OrderList.vue'), meta: { showFooter: false }},
    {path: '/payment/:id', component: () => import('@/views/Payment.vue')},
    {path: '/profile', component: () => import('@/views/Profile.vue')},
    {path: '/register', component: () => import('@/views/Register.vue')},
    {path: '/address', component: () => import('@/views/Address.vue'), meta: { showFooter: false }},
]
const router= createRouter({
    routes: routes,
    history: createWebHistory(),
})

// // 守卫路由
// router.beforeEach((to) => {
//     const tokenStore = useTokenStore()
//
//     if (to.path === '/login' && tokenStore.token) {
//         return '/'
//     }
//
//     if (to.path !== '/login' && !tokenStore.token) {
//         return '/login'
//     }
// })

export default router;