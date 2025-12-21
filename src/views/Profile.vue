<script setup lang="ts">
import { useTokenStore } from '@/store/token'
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {userInfoService} from "@/api/user.ts";
import type { UserInfo } from "@/types/user.ts"
import {ref} from "vue";
import {onMounted} from "vue";

const router = useRouter();
const tokenStore = useTokenStore()
const userInfo = ref<UserInfo | null>(null)

const logout = async () => {
    await ElMessageBox.confirm('确定退出登录？', '提示')

    tokenStore.removeToken()
    router.replace('/login')
}

const getInfo = async () => {
    try {
         const res = await userInfoService()
        if (res.code === 1) {
            userInfo.value = res.data

        }
    } catch (error) {
        ElMessage.error("获取用户信息失败")
    }
}

onMounted(() => {
    getInfo()
    console.log(userInfo.value)
})

</script>

<template>
    <div class="wrapper">
        <div class="header">个人信息</div>

        <div class="profile">
            <img src="@/assets/img/avatar.png" alt="">
            <div class="proInfo">
                <div>昵称：{{ userInfo?.userName }}</div>
                <div>账号：{{ userInfo?.userId }}</div>
            </div>
        </div>

        <div class="exitButton" @click="logout">退出登录</div>

        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>
    </div>
</template>

<style scoped>
/*总容器样式*/
.wrapper {
    width: 100%;
    height: 100%;
    /*overflow: auto;*/
    margin: 0;
}

/*头部样式*/
.header {
    height: 12vw;
    width: 100%;

    background-color: #17BAF9;
    color: white;
    font-size: 4.8vw;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
}
/*头部个人信息样式*/
.profile{
    width: 91vw;
    height: 30vw;
    display: flex;
    align-items: center;
    margin-top: 13vw;
}

.profile img{
    width: 40%;
    height: 30vw;
}

.proInfo{
    width: 60%;
    height: 28vw;
    margin-left: 2vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    font-family: 'FangZhengXingShu', 'FZXingKai-S04', 'KaiTi', '楷体', cursive;

}
.proInfo >div:nth-child(1){
    font-size: 5vw;

    color: black;
}
.proInfo >div:nth-child(2){
    font-size: 4vw;

    color: black;
}

/*退出登录按钮*/
.exitButton{
    width: 100%;
    height: 15vw;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 5vw;
    background: #DDDDDD;
    font-size: 5vw;
    color: white;
    cursor: pointer;
}

</style>