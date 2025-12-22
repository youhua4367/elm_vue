<script setup lang="ts">
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import type {BusinessInfo} from "@/types/business.ts";
import {businessGetOneService} from "@/api/business.ts";
import {useCartStore} from "@/store/cart.ts";

const route = useRoute();
const businessId = computed(() => Number(route.query.id));
console.log(businessId);
const router = useRouter();

const businessInfo = ref<BusinessInfo>();

// 定义购物车
const cartStore = useCartStore();
/**
 * 获取商家信息
 */
const getBusinessInfo = async () => {
    try {
        const res = await businessGetOneService(businessId.value);
        if (res.code === 1) {
            businessInfo.value = res.data
        }
    } catch (error) {
        console.log(error)
    }
}

const goBack = () => {
    router.go(-1)
}


onMounted(() => {
    getBusinessInfo()
    cartStore.getCart()
})
</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="return" @click="goBack"><i class="fa fa-arrow-left"></i></div>
            <div class="orderTitle">确认订单</div>
            <div class="addInfo">
                <div>订单配送至：</div>

                <div>
                    <div>沈阳市浑南区智慧四街1-121号</div>
                    <div class="addInfoFont"> >&nbsp;</div>
                </div>
                <div>张帅先生&nbsp;&nbsp;13656785432</div>
            </div>
        </div>

        <div class="businessInfo">
            <div>{{ businessInfo?.businessName }}</div>
        </div>
        <hr>

        <div class="orderItem">
            <div class="orderItemList"
                 v-for="item in cartStore.items"
                 :key="item.cartId">
                <img :src="item.img" alt="">
                <div class="orderItemListInfo">
                    <div>{{ item.name }}&nbsp;×{{ item.quantity }}</div>
                    <div>￥{{ item.amount }}</div>
                </div>
            </div>
        </div>

        <div class="deliveryFee">
            <div>配送费</div>
            <div class="fee">￥{{ businessInfo?.deliveryPrice }}</div>
        </div>

        <div class="footer">
            <div class="orderListPrice"></div>
            <div class="submitBtn">去支付</div>
        </div>
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

/*标题头*/
.header{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #00b2ff;
    height: 25vw;
    width: 100%;



}

.orderTitle{
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 5vw;
    height: 8vw;
    color: white;
}

.header .return{
    position: fixed;
    top: 1vw;
    left: 6vw;
    color: white;
    font-size: 3vw;
    cursor: pointer;
}

.addInfo{
    height: 17vw;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.addInfo >div:nth-child(1){
    font-size: 3vw;
    color: white;
    padding-bottom: 1vw;
    padding-left: 1vw;
    text-align: left;
}

.addInfo >div:nth-child(2){
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 4vw;
    font-weight: bold;
    color: white;

    padding-bottom: 0.2vw;
    padding-left: 1vw;
}

.addInfoFont{
    font-weight: normal;
}

.addInfo >div:nth-child(3){
    font-size: 3vw;
    color: white;
    padding-top: 0.3vw;
    padding-left: 1vw;
    text-align: left;
}

/*商家名称*/
.businessInfo{
    display: flex;
    align-items: center;
    height: 10vw;
    width: 100%;
    color: #444444;
    font-size: 5vw;
}

.businessInfo >div:nth-child(1){
    padding-left: 3vw;
}

/*订单项*/
.orderItem{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}

.orderItemList{
    display: flex;
    align-items: center;
    width: 100%;

    padding-bottom: 2vw;
}

.orderItemList img{
    width: 20%;
    height: 100%;
}

.orderItemListInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 80%;
    font-size: 4vw;
    color: #666666;
    padding-left: 2.5vw;
}

.orderItemListInfo>div:nth-child(2){
    padding-right: 2vw ;
}

/*配送费*/
.deliveryFee{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    font-size: 4.5vw;
    padding-top: 1vw;
    color: #666666
}

.deliveryFee > div:nth-child(2){
    padding-right: 3vw;
}

.deliveryFee > div:nth-child(1){
    padding-left: 3vw;
}


/*底部*/
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 15vw;

    display: flex;
    align-items: center;
}

.footer >div:nth-child(1){
    width: 75%;
    height: 15vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vw;

    color: white;
    background-color: #505052;

}

.footer >div:nth-child(2){
    width: 25%;
    height: 15vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vw;

    color: white;
    background-color: #33CB73;
    cursor: pointer;
}
</style>