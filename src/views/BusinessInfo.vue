<script setup lang="ts">
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {foodListService} from "@/api/food.ts";
import {computed, onMounted, ref} from "vue";
import type {Food} from "@/types/food.ts";
import {businessGetOneService} from "@/api/business.ts";
import type {BusinessInfo} from "@/types/business.ts";
import {useCartStore} from "@/store/cart.ts";
import { Plus, Minus } from '@element-plus/icons-vue'


// 定义路由
const route = useRoute()
// 食物列表
const foodList = ref<Food[]>([])
// 路由获取商家 id
const businessId = computed<number>(() => {
    return Number(route.params.id)
})
// 定义商家
const business = ref<BusinessInfo>()

// 定义路由器
const router = useRouter();

// 定义购物车
const cartStore = useCartStore();

/**
 * 添加到购物车
 * @param food 食物对象
 */
const addFood = async (food: Food) => {
    await cartStore.addToCart({foodId:food.foodId, businessId:businessId.value});
}
/**
 * 移除购物车
 * @param food 食物
 */
const removeFood = (food: Food) => {
    cartStore.subFromCart({foodId:food.foodId, businessId:businessId.value});
}

/**
 * 获取数量
 * @param foodId 食物id
 */
const getQuantity = (foodId: number) => {
    const item = cartStore.items.find(item => item.foodId === foodId);
    return item?.quantity ?? 0
}
/**
 * 返回上一界面
 */
const goBack = () => {
    router.go(-1)
}

/**
 * 获取食物列表
 */
const getFoodList = async () => {
    try {
        const res = await foodListService(businessId.value);
        if (res.code === 1) {
            foodList.value = res.data
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取商家信息
 */
const getBusinessInfo = async () => {
    try {
        const res = await businessGetOneService(businessId.value);
        if (res.code === 1) {
            business.value = res.data
        }
    } catch (error) {
        console.log(error)
    }
}

const checkout = () => {
    router.push({path:'/checkout', query: {
            id: String(businessId.value),
        }});
}


onMounted(() => {
    getFoodList()
    getBusinessInfo()
    cartStore.getCart(businessId.value)

})
</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="return" @click="goBack"><i class="fa fa-arrow-left"></i></div>
            <p>商家信息</p>
        </div>
        <div class="content">
            <div class="businessInfo">
                <img :src="business?.businessImg" alt="">
                <div>{{ business?.businessName }}</div>
                <div>&#165;{{ business?.starPrice }}起送&#165;{{ business?.deliveryPrice }}配送</div>
                <div>{{ business?.businessExplain }}</div>
            </div>

            <div class="foodList">
                <div class="foodListMenu"
                     v-for="food in foodList"
                     :key="food.foodId">
                    <img :src="food.foodImg" alt="">
                    <div class="foodListForm">
                        <div class="foodListMenuInfo">
                            <div class="foodName">{{ food.foodName }}</div>
                            <div>{{ food.foodExplain }}</div>
                            <div class="menuPrice">&#165;{{ food.foodPrice }}</div>
                        </div>
                        <div class="foodListMenuInput">
                            <!-- 减号按钮 -->
                            <el-button
                                size="small"
                                circle
                                @click="removeFood(food)"
                                v-show="getQuantity(food.foodId) > 0"
                            >
                                <el-icon style="color:#00b2ff"><Minus /></el-icon>
                            </el-button>

                            <!-- 数量显示 -->
                            <span class="number" v-show="getQuantity(food.foodId) > 0">{{ getQuantity(food.foodId) }}</span>

                            <!-- 加号按钮 -->
                            <el-button size="small" circle @click="addFood(food)" type="primary">
                                <el-icon><Plus /></el-icon>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div>&nbsp;</div>
        <div class="footer">
            <div class="footerLeft">
                <div class="footerIcon">
                    <i class="fa fa-shopping-cart"></i>
                    <div class="footerQty">{{ cartStore.totalQuantity }}</div>
                </div>
                <div class="footerInf">
                    <div class="footerPrice">&#165;{{ cartStore.totalPrice }}</div>
                    <div>另需配送费{{ business?.deliveryPrice }}元</div>
                </div>
            </div>
            <div class="footerRight" id="submitBtn" @click="checkout">
                去结算
            </div>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    width: 91vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/*头部样式*/
.header {
    width: 100%;
    height: 12vw;

    background-color: #17BAF9;
    color: white;
    font-size: 4.8vw;

    display: flex;
    align-items: center;
    justify-content: center;

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

/*内容样式*/
.content {
    width: 100%;
    margin-top: 14vw;
    margin-bottom: 14vw;
}

.businessInfo{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.businessInfo img{
    width: 30%;
    border-radius: 5px;
}

.businessInfo div:nth-child(2){
    font-size: 6vw;
    margin-left: 1vw;
    font-weight: bold;
}

.businessInfo div:nth-child(3){
    font-size: 5vw;
    color: #666666;
    margin-top: 1vw;
}

.businessInfo div:nth-child(4){
    font-size: 5vw;
    color: #666666;
    margin-top: 1vw;
}

/*商品信息*/
.foodListMenu{
    width: 100%;
    padding-top: 2vw;

    display: flex;
    align-items: center;
    /*border: 0.5vw solid #17BAF9;*/
}

.foodListMenu div {
    text-align: left;
}

.foodListMenu img{
    width: 20%;
    height: 100%;
}

.foodListForm{
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 80%;
}

.foodListMenuInfo{
    margin-left: 2.4vw;
}

.foodListMenuInfo div:nth-child(1){
    font-size: 5vw;
    color: #505051;
    margin-bottom: 1vw;
}

.foodListMenuInfo div:nth-child(2){
    font-size: 4.5vw;
    color: #666666;
    margin-bottom: 1vw;
}

.foodListMenuInfo div:nth-child(3){
    font-size: 4.5vw;
    color: #666666;
    margin-bottom: 1vw;
}

.foodListMenuInput {
    display: flex;
    align-items: center;
}

.foodListMenuInput .number {
    width: 2.5rem;
    text-align: center;
    font-size: 1rem;
    margin: 0 0.5rem;
    background-color: white;
}


.foodListMenuInput button{
    border-radius: 50%;
    width: 4vw;
    height: 4vw;
    font-size: 3vw;
    cursor: pointer;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
}

.foodListMenuInput span{
    font-size: 3.5vw;
    text-align: center;
    margin: 0 3vw;
}

.foodListMenuInput span,
.foodListMenuInput .minus{
    background-color: #777777;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5vw
}

.foodListMenuInput .plus{
    background-color: #00b2ff;

}
/*底部样式*/
.footer {
    width: 100%;
    height: 14vw;

    position: fixed;
    left: 0;
    bottom: 0;
    border: 1px;

    display: flex;
    z-index: 999;
}

.footerLeft {
    flex: 2;
    background-color: #505051;
    display: flex;
}

.footerIcon{
    width: 16vw;
    height: 16vw;
    font-size: 4vw;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: blue;
    border: 1.6vw solid #444444;

    position: relative;
    top: -7vw;
    left: 4vw;
}

.footerQty{
    border-radius: 50%;
    width: 5vw;
    height: 5vw;
    background-color: red;
    font-size: 3.6vw;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -1.5vw;
    right: -1vw;
}

.footerInf{
    padding-left: 4vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.footerInf div:nth-of-type(1){
    font-size: 5vw;
    color: white;
}

.footerInf div:nth-of-type(2){
    font-size: 3.6vw;
    color: #AAAAAA;
}

.footerRight {
    flex: 1;
    background-color: #38CA73;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 4.6vw;
    font-weight: bold;

    cursor: pointer;
}
</style>