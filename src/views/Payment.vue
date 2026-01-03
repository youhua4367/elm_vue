<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
import {useOrderStore} from "@/store/order.ts";
import {useBusinessStore} from "@/store/business.ts";
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const orderStore = useOrderStore();
const businessStore = useBusinessStore();

const currentOrder = orderStore.currentOrder;
const orderId = computed(() => {
    return Number(route.params.id);
})

const getOrderDetail = async () => {
    await orderStore.getOrderDetail(orderId.value);
    const orderDetail = orderStore.currentOrderDetail;
    const businessId = orderDetail[0]?.businessId || 0;
    // 获取到当前的商家
    businessStore.getByBusinessId(businessId);
}

const payOrder = async () => {
    await orderStore.payOrder(orderId.value);
    ElMessage.success("支付成功!")
    await router.push("/home")
}

onMounted(() => {
    getOrderDetail();
})
</script>

<template>
    <div class="wrapper">
        <div class="return" onclick="history.back()"><&nbsp;</div>
        <div class="header">在线支付</div>

        <div class="paymentInfo">
            <div class="paymentInfoTitle">订单信息：{{ currentOrder?.orderNumber }}</div>
            <div class="paymentInfoContent">
                <div>{{ businessStore.currentBusiness?.businessName }}</div>
                <div class="finalBill">￥{{ currentOrder?.orderAmount }}</div>
            </div>
        </div>

        <div class="paymentItem">
            <div class="paymentItemInfo"
                 v-for="detail in orderStore.currentOrderDetail"
                 :key="detail.odId">
                <img :src="detail.img" alt="" width="40px" height="40px">
                <div>{{ detail.name }}）&nbsp;×{{ detail.quantity }}</div>
                <div>￥{{ detail.amount }}</div>
            </div>

            <div class="paymentItemInfo">
                <div>配送费</div>
                <div>￥{{ businessStore.currentBusiness?.deliveryPrice }}</div>
            </div>
        </div>

        <div class="paymentWay">
            <form>
                <label class="paymentWayInfo">
                    <input type="radio" name="payment" value="alipay" checked>
                    <div class = "paymentWayItem">
                        <img src="@/assets/img/wechat.png" alt="">
                        <img src="@/assets/img/check.png" alt="" class="checkmark">
                    </div>
                </label>

                <label class="paymentWayInfo">
                    <input type="radio" name="payment" value="wechat">
                    <div class = "paymentWayItem">
                        <img src="@/assets/img/alipay.png" alt="">
                        <img src="@/assets/img/check.png" alt="" class="checkmark">
                    </div>
                </label>
            </form>
        </div>

        <div class="paymentConfirm">
            <div class="paymentConfirmInfo" @click="payOrder">确认支付</div>
        </div>

        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>
        <FooterBar/>
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
.header{
    width: 100%;
    height: 10vw;
    background-color: #0097FF;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    font-size: 5vw;
}

.return{
    position: fixed;
    top: 3vw;
    left: 2vw;
    color: white;
    cursor: pointer;
}

/*信息列*/
.paymentInfo{
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.paymentInfoTitle{
    font-size: 4vw;
    padding: 2.5vw;
    color: #888888;
    text-align: left;
}

.paymentInfoContent{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.paymentInfoContent >div:nth-child(1){
    color: #666666;
    padding: 2.5vw;
    font-size: 4vw;
}

.paymentInfoContent >div:nth-child(2){
    font-size: 4vw;
    color: red;
    padding: 2.5vw;
}

/*支付项*/
.paymentItem{
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.paymentItemInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 3.5vw;
    color: #666666;
    padding: 0.5vw 2.5vw;
}

/*支付方式*/
.paymentWay{
    display: flex;
    flex-direction: column;
    padding-top: 3vw;
    width: 100%;
}

.paymentWayInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-bottom: 4vw;
}

.paymentWayInfo input[type="radio"]{
    display: none;
}

.paymentWayItem{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
}

.paymentWayItem img{
    width: 30%;
    height: 100%;
    padding-left: 2vw;
}

.paymentWayItem .checkmark{
    width: 5vw;
    height: 5vw;
    margin-left: auto;
    padding-right: 2vw;

    visibility: hidden;
}

.paymentWayInfo input[type="radio"]:checked + .paymentWayItem .checkmark{
    visibility: visible;
}

/*确认支付*/
.paymentConfirm{
    width: 100%;
    height: 10vw;

    display: flex;
    justify-content: center;
    align-items: center;

}

.paymentConfirmInfo{
    display: flex;
    justify-content: center;
    align-items: center;

    width: 92%;
    height: 10vw;

    color: white;
    font-size: 4vw;

    background-color: #38CA73;

}
</style>