<script setup lang="ts">
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import type {BusinessInfo} from "@/types/business.ts";
import {businessGetOneService} from "@/api/business.ts";
import {useCartStore} from "@/store/cart.ts";
import {useAddressStore} from "@/store/address.ts";
import {useOrderStore} from "@/store/order.ts";
import type {OrderSubmitDTO} from "@/types/order.ts";
import type {Address} from "@/types/address.ts";
import {ElMessage} from "element-plus";

const route = useRoute();
const businessId = computed(() => Number(route.query.id));
const router = useRouter();

const businessInfo = ref<BusinessInfo>();

// 定义购物车
const cartStore = useCartStore();
// 定义地址
const addressStore = useAddressStore();
// 定义订单
const orderStore = useOrderStore();

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

const goCheckOut = async () => {
    // 新增地址校验
    if (!addressStore.currentAddress) {
        ElMessage.warning('请先选择收货地址');
        openAddressSelect();
        return;
    }

    const orderSubmitDTO: OrderSubmitDTO = {
        businessId: businessId.value,
        orderTotal: cartStore.totalPrice,
        addressId: addressStore.currentAddress?.addressId || 0,
        remark: "",
        packAmount: businessInfo.value?.deliveryPrice || 0,
    };
    await orderStore.submitOrder(orderSubmitDTO);
    const order = orderStore.currentOrder
    await router.push(`/payment/${order?.id}`);
}

const addressVisible = ref(false);

const openAddressSelect = () => {
    addressVisible.value = true;
};

const chooseAddress = (address: Address) => {
    addressStore.currentAddress = address;
    addressVisible.value = false;
};

onMounted(async () => {
    await getBusinessInfo()
    await cartStore.getCart(businessId.value)
    await addressStore.getDefaultAddress()
    await addressStore.getAddresses()
})
</script>

<template>
    <div class="wrapper">
        <!-- 头部区域 -->
        <div class="header">
            <div class="return" @click="goBack">
                <i class="fa fa-arrow-left"></i>
            </div>
            <div class="orderTitle">确认订单</div>
            <div class="addInfo" @click="openAddressSelect">
                <div>订单配送至：</div>

                <div v-if="addressStore.currentAddress" class="addr-main">
                    <div class="addr-detail">{{ addressStore.currentAddress.detail }}</div>
                    <div class="addInfoFont"> &gt;&nbsp;</div>
                </div>

                <div v-else class="no-address">
                    请选择收货地址 >
                </div>

                <div v-if="addressStore.currentAddress" class="addr-contact">
                    {{ addressStore.currentAddress.name }}&nbsp;&nbsp;
                    {{ addressStore.currentAddress.phone }}
                </div>
            </div>
        </div>
        <!-- 商家信息 -->
        <div class="businessInfo">
            <div>{{ businessInfo?.businessName }}</div>
        </div>
        <hr class="divider">
        <!-- 订单商品列表 -->
        <el-card class="orderItem" shadow="hover">
            <div class="orderItemList"
                 v-for="item in cartStore.items"
                 :key="item.cartId">
                <img :src="item.img" alt="" class="product-img">
                <div class="orderItemListInfo">
                    <div class="product-name">{{ item.name }}&nbsp;×{{ item.quantity }}</div>
                    <div class="product-price">￥{{ item.amount }}</div>
                </div>
            </div>
        </el-card>
        <!-- 配送费 -->
        <div class="deliveryFee">
            <div class="fee-label">配送费</div>
            <div class="fee-value">￥{{ businessInfo?.deliveryPrice }}</div>
        </div>
        <!-- 合计金额 -->
        <div class="total-amount">
            <div class="total-label">订单合计</div>
            <div class="total-value">￥{{ cartStore.totalPrice + (businessInfo?.deliveryPrice || 0) }}</div>
        </div>

        <!-- 底部操作栏 -->
        <div class="footer">
            <div class="orderListPrice">
                <span class="total-text">实付：</span>
                <span class="total-price">￥{{ cartStore.totalPrice + (businessInfo?.deliveryPrice || 0) }}</span>
            </div>
            <div class="submitBtn" @click="goCheckOut">去支付</div>
        </div>

        <!-- 地址选择抽屉 -->
        <el-drawer
            v-model="addressVisible"
            title="选择收货地址"
            direction="btt"
            size="70%"
        >
            <div class="address-list">
                <div
                    class="address-item"
                    v-for="item in addressStore.addresses"
                    :key="item.addressId"
                    @click="chooseAddress(item)"
                    :class="{ active: addressStore.currentAddress?.addressId === item.addressId }"
                >
                    <div class="address-detail">
                        {{ item.detail }}
                    </div>
                    <div class="address-info">
                        {{ item.name }} {{ item.phone }}
                    </div>
                    <div
                        v-if="addressStore.defaultAddress?.addressId === item.addressId"
                        class="default-tag"
                    >
                        默认
                    </div>
                </div>
                <!-- 空地址提示 -->
                <div v-if="addressStore.addresses.length === 0" class="empty-address">
                    暂无收货地址，请先添加
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<style lang="scss" scoped>
// 基础样式重置
.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    overflow-x: hidden;
    // 头部区域
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #00b2ff;
        height: 30vw;
        width: 100%;
        position: relative;
        .return {
            position: absolute;
            top: 3vw;
            left: 5vw;
            color: white;
            font-size: 5vw;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .orderTitle {
            font-size: 5vw;
            height: 8vw;
            color: white;
            font-weight: 600;
        }
        .addInfo {
            height: 17vw;
            width: 90%;
            display: flex;
            flex-direction: column;
            color: white;
            div:nth-child(1) {
                font-size: 3.5vw;
                padding-bottom: 1vw;
                text-align: left;
            }
            .addr-main {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 4vw;
                font-weight: bold;
                padding-bottom: 0.5vw;

                .addr-detail {
                    max-width: 70vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .addInfoFont {
                    font-weight: normal;
                }
            }
            .no-address {
                font-size: 4vw;
                color: #fff;
                padding: 1vw 0;
            }

            .addr-contact {
                font-size: 3.5vw;
                padding-top: 0.5vw;
                text-align: left;
            }
        }
    }
    // 商家信息
    .businessInfo {
        display: flex;
        align-items: center;
        height: 10vw;
        width: 100%;
        color: #333;
        font-size: 4.5vw;
        font-weight: 500;
        background-color: #fff;
        padding-left: 3vw;
    }

    .divider {
        border: none;
        height: 1px;
        background-color: #eee;
        margin: 0;
    }
    // 订单商品列表
    .orderItem {
        width: 95%;
        border: none;
        box-shadow: none;
        margin: 2vw 0;
        .orderItemList {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 2vw 0;
            border-bottom: 1px solid #f0f0f0;
            .product-img {
                width: 18vw;
                height: 18vw;
                border-radius: 8px;
                object-fit: cover;
            }

            .orderItemListInfo {
                display: flex;
                justify-content: space-between;
                width: 75%;
                font-size: 4vw;
                color: #666;
                .product-name {
                    color: #333;
                    margin-bottom: 1vw;
                }
                .product-price {
                    color: #ff4d4f;
                    font-weight: 600;
                }
            }
        }
    }
    // 配送费
    .deliveryFee {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 93%;
        font-size: 4vw;
        padding: 2vw 3vw;
        color: #666;
        background-color: #fff;
        .fee-label {
            color: #333;
        }
        .fee-value {
            color: #333;
            font-weight: 500;
        }
    }
    // 合计金额
    .total-amount {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        font-size: 4vw;
        padding: 2vw 3vw;
        color: #666;
        background-color: #fff;
        .total-label {
            color: #333;
            font-weight: 500;
        }
        .total-value {
            color: #ff4d4f;
            font-size: 4.5vw;
            font-weight: 600;
        }
    }
    // 底部操作栏
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15vw;
        display: flex;
        align-items: center;
        background-color: #fff;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        z-index: 10;
        .orderListPrice {
            width: 75%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 4vw;
            .total-text {
                font-size: 3.5vw;
                color: #666;
            }
            .total-price {
                font-size: 4.5vw;
                color: #ff4d4f;
                font-weight: 600;
                margin-left: 1vw;
            }
        }
        .submitBtn {
            width: 25%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4vw;
            color: white;
            background-color: #33cb73;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: #29b266;
            }

            &:active {
                background-color: #269a58;
            }
        }
    }

    .address-list {
        padding: 2vw;
        max-height: 70vh;
        overflow-y: auto;
        .address-item {
            padding: 3vw;
            margin-bottom: 3vw;
            background: #f7f7f7;
            border-radius: 8px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            &.active {
                border-color: #00b2ff;
                background-color: rgba(0, 178, 255, 0.05);
            }
            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            }
            .address-detail {
                font-size: 4vw;
                font-weight: bold;
                color: #333;
                margin-bottom: 1vw;
            }
            .address-info {
                font-size: 3.5vw;
                color: #666;
            }

            .default-tag {
                position: absolute;
                top: 3vw;
                right: 3vw;
                font-size: 3vw;
                color: #33cb73;
                border: 1px solid #33cb73;
                padding: 0.5vw 1.5vw;
                border-radius: 2vw;
                background-color: rgba(51, 203, 115, 0.1);
            }
        }

        .empty-address {
            text-align: center;
            font-size: 4vw;
            color: #999;
            padding: 10vw 0;
        }
    }
}
</style>
