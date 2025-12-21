<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
import {useRouter} from "vue-router";
import type {BusinessInfo} from "@/types/business.ts";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {businessTypeInfoService} from "@/api/business.ts";

const route = useRoute()
const typeId = computed<number>(() => {
    return Number(route.params.id)
})


const businessInfo = ref<BusinessInfo[]>([])
const router = useRouter();

const goBack = () => {
    router.go(-1)
}

/**
 * 具体的商家
 * @param id 商家 id
 */
const goDetail = (id: number) => {
    if (!Number.isInteger(id)) {
        console.error("id 必须是整数");
        return;
    }
    router.push(`/info/${id}`)
}

/**
 * 商家列表信息
 * @param typeId 商家分类 id
 */
const getInfo = async (typeId: number) => {
    try {
        const res = await businessTypeInfoService(typeId);
        if (res.code === 1) {
            businessInfo.value = res.data;
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getInfo(typeId.value)
})
</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="return" @click="goBack"><&nbsp;</div>
            <p>商家列表</p>
        </div>

        <div class="business">
            <div class="businessItem"
                 v-for="business in businessInfo"
                 @click="goDetail(business.businessId)"
                :key="business.businessId">
                <div class="businessImg">
                    <img :src="business.businessImg">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>{{ business.businessName }}</h3>
                    <p>￥{{ business.starPrice }}起送&nbsp;&nbsp;|&nbsp;&nbsp;￥{{ business.deliveryPrice }}配送</p>
                    <p>{{ business.businessExplain }}</p>
                </div>
            </div>

        </div>

        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>
        <FooterBar/>

    </div>
</template>

<style scoped>
/*总容器样式*/
.wrapper {
    width: 91vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*overflow: auto;*/
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

.header .return{
    position: fixed;
    top: 3.5vw;
    left: 2vw;
    color: white;
    cursor: pointer;
}

/*商家样式*/
.business {
    width: 100%;
    margin-top: 12vw;
}

.businessItem {
    display: flex;
    align-items: center;
    padding: 2.5vw;
    border-bottom: 1px solid #555555;
    cursor: pointer;
}

.businessInfo {
    margin-left: 3vw;
}

.businessInfo h3 {
    font-size: 4vw;
    font-weight: 700;
    color: #333333;
    text-align: left;
}

.businessInfo p {
    font-size: 3vw;
    color: #555555;
    text-align: left;
}

.businessImg {
    position: relative;
}

.businessImg img {
    width: 23vw;
    height: 23vw;;
}

.businessQty {
    border-radius: 50%;
    background-color: red;
    color: white;
    width: 5vw;
    height: 5vw;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3.6vw;

    position: absolute;
    top: -1.5vw;
    right: -1.5vw;
}

</style>