<script setup lang="ts">
import { reactive, ref } from 'vue'
import {ElMessage, type FormInstance, type FormRules} from 'element-plus'
import {useRouter} from "vue-router";
import { userLoginService } from "@/api/user.ts";
import { useTokenStore } from "@/store/token.ts";

const router = useRouter()
const form = reactive({
    username: '',
    password: '',
})


const formRef = ref<FormInstance>()

const rules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
    ]
}

const goRegister =  () => {
    router.push('/register')
}

const tokenStore = useTokenStore()
const onSubmit = async () => {
    try {
        await formRef.value?.validate()

        const res = await userLoginService({
            userId: form.username,
            password: form.password,
        })

        if (res.code === 1) {
            tokenStore.setToken(res.data.token)
            ElMessage.success("登陆成功！")
            await router.push('/profile')
        } else {
            ElMessage.error(res.msg || '登录失败!')
        }
    } catch (error) {
        ElMessage.error("用户名或密码错误!")
    }
}

</script>


<template>
    <div class="wrapper">
        <div class="header">用户登录</div>

        <div class="login">
            <el-form :model="form" :rules="rules" label-width="auto" class="form" ref="formRef">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button @click="goRegister">注册</el-button>
                </el-form-item>
            </el-form>
        </div>


        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>

    </div>
</template>

<style scoped>
.wrapper{
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;

}

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

/*登录表*/
.login{
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 13vw;
    width: 91vw;
}

form{
    width: 100%;
}
</style>