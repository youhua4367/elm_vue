<script setup lang="ts">
import {useRouter} from "vue-router";
import {useAddressStore} from "@/store/address.ts";
import {onMounted, reactive, ref} from "vue";
import type { Address } from "@/types/address";

// 定义地址提交表单对象
const form: Address = reactive({
    addressId: 0,
    userId: "",
    name: "",
    phone: "",
    sex: 0,
    provinceCode: "",
    cityCode: "",
    districtCode: "",
    provinceName: "",
    cityName: "",
    districtName: "",
    detail: "",
    label: "",
    isDefault: 0
})
const dialogFormVisible = ref(false)
const formLabelWidth = "20vw"

const router = useRouter();
const addressStore = useAddressStore();

const goBack = () => {
    router.go(-1)
}

const getAddress = () => {
    addressStore.getAddresses()
}

onMounted( () => {
    getAddress()
})
</script>

<template>
    <el-container class="container">
        <el-card class="box-card">
            <el-row class="header">
                <div @click="goBack"><i class="fa fa-angle-left"></i></div>
                <div class="my-address">收货地址</div>
                <div class="add-address" @click="dialogFormVisible=true">新增地址</div>
                <el-divider />

            </el-row>

            <el-row class="address"
                    v-for="address in addressStore.addresses"
                    :key="address.addressId">
                <div class="left">
                    <div class="addressInfo">
                        <div class="label">家</div>
                        <div class="address-info">{{ address.detail }}</div>
                    </div>
                    <div class="personInfo">
                        <div>{{ address.name }}</div>
                        <div>{{ address.phone }}</div>
                    </div>
                </div>
                <div class="right"><i class="fa fa-pencil"></i></div>
                <el-divider />
            </el-row>
            <el-dialog v-model="dialogFormVisible" title="修改地址簿" width="500">
                <el-form :model="form">
                    <el-form-item label="Promotion name" :label-width="formLabelWidth">
                        <el-input v-model="form.provinceName" autocomplete="off" />
                    </el-form-item>
                </el-form>

                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">
                            确定
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </el-card>
        <div id="container"></div>
    </el-container>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.box-card {
    width: 91vw;
    height: 100%;
}

.header {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;

}

.my-address {
    font-size: 4vw;
    color: black;
    font-weight: bold;
}

.address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
}

.left {
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.addressInfo {
    display: flex;
    width: 40vw;
    align-items: center;
    justify-content: flex-start;
}

.label {
    width: 10vw;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2vh;

    color: orange;
    background-color: #F7D6CD;
    border-radius: 10px;

}

.address-info {
    color: black;
    font-size: 2.5vh;
    font-weight: bold;
    padding-left: 1vw;

}

.personInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1vw;
    font-size: 2vh;
    width: 35vw;
}
</style>