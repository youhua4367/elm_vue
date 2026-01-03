<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/home')
}

const goHistoryOrder = () => {
    router.push('/order')
}

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

<style lang="scss" scoped>
$footer-height: 12%;
$icon-font-size: 1.8rem;
$text-font-size: 1rem;
$base-padding: 2%;
$side-padding: 1%;
$border-color: #656464;
$text-color: #656464;

.footer {
    width: 100%;
    display: flex;
    height: $footer-height;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    border-top: 2px solid $border-color;
    position: fixed;
    left: 0;
    bottom: 0;
    div {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $text-color;
        padding-top: $base-padding;
        &:nth-child(1) {
            padding-left: $side-padding;
        }
        &:nth-child(4) {
            padding-right: $side-padding;
        }
        i {
            font-size: $icon-font-size;
        }
        p {
            font-size: $text-font-size;
        }
    }
}
</style>