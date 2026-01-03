<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { ElMessage, ElMessageBox, ElAvatar } from 'element-plus'
import {userInfoService, userUpdateService} from '@/api/user.ts'
import type { UserInfo } from '@/types/user.ts'


const avatarInput = ref<HTMLInputElement | null>(null)
// 静态导入头像图片
import defaultAvatar from '@/assets/img/avatar.png'
import {uploadFileService} from "@/api/common.ts";


const router = useRouter()
const tokenStore = useTokenStore()
const userInfo = ref<UserInfo | null>(null)

/**
 * 登出
 */
const logout = async () => {
    await ElMessageBox.confirm('确定退出登录？', '提示')
    tokenStore.removeToken()
    await router.replace('/login')
}

/**
 * 文件上传
 * @param event 事件
 */
const handleAvatarChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files || target.files.length === 0) return

    try {
        const file = target.files?.[0]
        if (!file) return

        const res = await uploadFileService(file)

        if (res.code !== 1) {
            ElMessage.error('头像上传失败')
            return
        }

        const avatarUrl = res.msg

        await userUpdateService({
            userImg: avatarUrl
        })

        if (userInfo.value) {
            userInfo.value.userImg = avatarUrl
        }

        ElMessage.success('头像修改成功')
    } catch (err) {
        ElMessage.error('头像修改失败')
        console.error(err)
    } finally {
        target.value = ''
    }
}

/**
 * 获取用户信息
 */
const getInfo = async () => {
    try {
        const res = await userInfoService()
        if (res.code === 1) {
            userInfo.value = res.data
        }
    } catch (error) {
        ElMessage.error('获取用户信息失败')
    }
}

const goAddress = () => {
    router.push('/address')
}

onMounted(() => {
    getInfo()
})
</script>

<template>
    <el-container class="profile-page">
        <!-- 头部 -->
        <el-header class="profile-header">
            <el-avatar
                :src="userInfo?.userImg || defaultAvatar"
                size="large"
                class="avatar"
                @click="avatarInput?.click()"
            ></el-avatar>
            <input
                type="file"
                ref="avatarInput"
                style="display:none"
                accept="image/*"
                @change="handleAvatarChange"
            />
            <div class="user-info">
                <div class="username">{{ userInfo?.userName || '昵称' }}</div>
                <div class="userid">账号: {{ userInfo?.userId || '--' }}</div>
            </div>
        </el-header>
        <!-- 主体 -->
        <el-main class="profile-main">
            <el-row class="my-order">
                <el-card class="order-box">
                    <div class="title">我的订单</div>
                    <div class="orderInfo">
                        <div>
                            <i class="fa fa-file-o"></i>
                            <div>全部</div>
                        </div>
                        <div>
                            <i class="fa fa-sticky-note"></i>
                            <div>待收货</div>
                        </div>
                        <div style="cursor: pointer" @click="goAddress">
                            <i class="fa fa-location-arrow"></i>
                            <div>地址</div>
                        </div>
                        <div>
                            <i class="fa fa-user"></i>
                            <div>个人信息</div>
                        </div>
                    </div>
                </el-card>
            </el-row>
            <!-- 退出登录按钮 -->
            <div class="logout-button" @click="logout">
                退出登录
            </div>
        </el-main>


    </el-container>
</template>

<style scoped>
.profile-page {
    width: 91vw;
    height: 100%;
}

/* 头部样式 */
.profile-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #17BAF9;
    color: white;
}

.user-info {
    margin-left: 1rem;
}

.username {
    font-size: 1.2rem;
    font-weight: bold;
}

.userid {
    font-size: 0.9rem;
    margin-top: 0.2rem;
}

/* 主体样式 */
.profile-main {
    padding: 1rem;
    width: 91vw;
}

.order-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    width: 91vw;
}

.orderInfo{
    display: flex;
    justify-content: space-between;
    width: 80vw;
    font-size: 0.9rem;
}

.title{
    font-size: 0.9rem;
    width: 80vw;
    text-align: left;
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;

}

.card-body p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #555;
}

/* 退出登录按钮 */
.logout-button {
    margin-top: 2rem;
    padding: 0.8rem;
    background-color: #ff4d4f;
    color: white;
    font-weight: bold;
    text-align: center;
    border-radius: 0.4rem;
    cursor: pointer;
}
</style>
