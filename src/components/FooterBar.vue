<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/home')
}

const goHistoryOrder = () => {
    router.push('/order')
}

// 这里可以处理用户点击我的页面的逻辑，比如跳转登录或个人主页
const goProfile = () => {
    console.log('跳转我的页面')
    router.push('/profile')
}
</script>

<template>
    <div class="footer">
        <div @click="goHome">
            <i class="fa fa-home"></i>
            <p>首页</p>
        </div>
        <div>
            <i class="fa fa-compass"></i>
            <p>发现</p>
        </div>
        <div @click="goHistoryOrder">
            <i class="fa fa-file-text"></i>
            <p>订单</p>
        </div>
        <div @click="goProfile">
            <i class="fa fa-user"></i>
            <p>我的</p>
        </div>
    </div>
</template>

<style scoped>
/*底部样式*/
.footer {
    width: 100%;
    display: flex;
    height: 12vw;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    border-top: 2px solid #656464;

    position: fixed;
    left: 0;
    bottom: 0;
}


.footer div {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    color: #656464;
    padding-top: 2vw;
}

.footer >div:nth-child(1) {
    padding-left: 1vw;
}

.footer >div:nth-child(4) {
    padding-right: 1vw;
}

.footer i {
    font-size: 4.5vw;
}

.footer p {
    font-size: 2.5vw;
}
</style>