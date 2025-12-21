<script setup lang="ts">
import { reactive, ref } from 'vue'
import FooterBar from "@/components/FooterBar.vue";
import {ElMessage, type FormInstance} from 'element-plus'
import { userRegisterService } from "@/api/user.ts"
import {useRouter} from "vue-router";

const router = useRouter()
// 表单数据
const form = reactive({
    username: '',
    password: '',
    rePassword: '',
    nickname: '',
    sex: '',
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
        // 1. 表单校验
        await formRef.value?.validate()

        // 2. 调用注册接口
        const res = await userRegisterService({
            userId: form.username,
            password: form.password,
            rePassword: form.rePassword,
            userName: form.nickname,
            userSex: form.sex === 'male' ? 1 : 0
        })

        console.log(res)
        // 3. 处理返回结果
        if (res.code === 1) {
            ElMessage.success('注册成功！')
            await router.push('/login')
        } else {
            ElMessage.error(res.data.msg || '注册失败')
        }

    } catch (err) {
        // 校验失败 or 接口异常
        console.log(err)
        ElMessage.error('请正确填写注册信息')
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
                <el-form-item label="姓名" prop="nickname">
                    <el-input v-model="form.nickname" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio value="male">男</el-radio>
                        <el-radio value="female">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">注册</el-button>
                    <el-button>取消</el-button>
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

    padding: 2vw 0;
}

form{
    width: 100%;
}
</style>