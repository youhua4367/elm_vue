<script setup lang="ts">
import { reactive, ref } from 'vue'
import FooterBar from "@/components/FooterBar.vue";
import {ElMessage, type FormInstance} from 'element-plus'
import {userAuthService, userRegisterService} from "@/api/user.ts"
import {useRouter} from "vue-router";
import type {UserAuth} from "@/types/user.ts";

const router = useRouter()
// 表单数据
const form = reactive({
    username: '',
    password: '',
    rePassword: '',
    authInfo: '',
})

const userAuth = ref<UserAuth>({
    authInfo: '',
    authKey: ''
})


// 获取表单实例
const formRef = ref<FormInstance>()

// 表单规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: ['blur','change'] },
        { min: 3, max: 12, message: '用户名长度在3到12个字符', trigger: ['blur','change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: ['blur','change'] },
        { min: 6, message: '密码长度不能小于6位', trigger: ['blur','change'] }
    ],
    rePassword: [
        { required: true, message: '请再次输入密码', trigger: ['blur','change'] },
        {
            // TS安全写法：validator 函数类型不用FormItemRule，直接any
            validator: (_rule: any, value: any, callback: (error?: string | Error) => void) => {
                if (!value) {
                    callback('请再次输入密码')
                } else if (value !== form.password) {
                    callback('两次密码不一致')
                } else {
                    callback()
                }
            },
            trigger: ['blur','change']
        }
    ],
    nickname: [
        { required: true, message: '请输入姓名', trigger: ['blur','change'] }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ]
}

// 提交
const onSubmit = async () => {
    try {
        await formRef.value?.validate()

        if (!userAuth.value.authKey) {
            ElMessage.warning('请输入验证码')
            return
        }

        const res = await userRegisterService({
            userId: form.username,
            password: form.password,
            rePassword: form.rePassword,
            authInfo: form.authInfo,
            authKey: userAuth.value.authKey,
        })

        if (res.code === 1) {
            ElMessage.success('注册成功！')
            await router.push('/login')
        } else {
            ElMessage.error(res.msg || '注册失败')
        }
    } catch (err) {
        console.log(err)
        ElMessage.error('请正确填写注册信息')
    }
}

const getAuth = async () => {
    try {
        const res = await userAuthService()
        if (res.code === 1) {
            userAuth.value = res.data
            ElMessage.success("获取验证码成功")
        } else {
            ElMessage.error('获取验证码失败')
        }
    } catch (error) {
        console.error(error)
        ElMessage.error('获取验证码失败')
    }
}

</script>

<template>
    <div class="wrapper">
        <div class="header">用户注册</div>
        <div class="register">
            <el-form :model="form" :rules="rules" label-width="auto" class="form" ref="formRef">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" show-password />
                </el-form-item>
                <el-form-item label="再次输入密码" prop="rePassword">
                    <el-input v-model="form.rePassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="验证码" prop="authInfo">
                    <el-input v-model="form.authInfo" style="width: 60%;" />
                    <el-button type="primary" @click="getAuth" style="margin-left: 10px;">获取验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">注册</el-button>
                    <el-button @click="router.push('/login')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>
        <FooterBar />
    </div>
</template>

<style scoped>
.wrapper{
    width: 91vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/*头部*/
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

.register{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10vh;
    padding: 2vw 0;
}

form{
    width: 100%;
}
</style>