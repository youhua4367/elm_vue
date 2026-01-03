<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
import { useOrderStore } from "@/store/order";
import { onMounted, computed, ref } from "vue";
import type { Order } from "@/types/order";
import { ElMessage } from "element-plus";

const orderStore = useOrderStore();

// 分类折叠控制
const showUnpaid = ref(false);
const showPaid = ref(false);
const showCanceled = ref(false);

// 分类订单
const unpaidOrders = computed(() =>
    orderStore.historyOrders.filter(o => o.orderStatus === 1)
);

const paidOrders = computed(() =>
    orderStore.historyOrders.filter(o => o.orderStatus >= 2 && o.orderStatus <= 5)
);

const canceledOrders = computed(() =>
    orderStore.historyOrders.filter(o => o.orderStatus === 6)
);

// 时间格式化工具函数
const formatTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// 去支付
const goPay = async (order: Order) => {
    await orderStore.payOrder(order.orderId);
    ElMessage.success("支付成功！");
};

// 再来一单
const repeatOrder = async (order: Order) => {
    await orderStore.repeatOrder(order.orderId);
    ElMessage.success("再来一单成功！");
};

// 取消订单
const cancelOrder = async (order: Order) => {
    await orderStore.cancelOrder(order.orderId);
    ElMessage.success("取消成功！");
};

onMounted(() => {
    orderStore.getHistoryOrders();
});
</script>

<template>
    <div class="wrapper">
        <div class="header">我的订单</div>
        <!-- 订单内容区域 -->
        <div class="content">
            <div class="section-container">
                <div class="section-title" @click="showUnpaid = !showUnpaid">
                    <span>未支付订单</span>
                    <i :class="showUnpaid ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
                </div>

                <div v-show="showUnpaid" class="order-list">
                    <div
                        class="order-card"
                        v-for="order in unpaidOrders"
                        :key="order.orderId"
                    >
                        <div class="order-info">
                            <div class="left">
                                <div class="order-number">订单号：{{ order.number }}</div>
                                <div class="order-time">{{ formatTime(order.orderTime) }}</div>
                                <div class="order-amount">￥{{ order.orderTotal.toFixed(2) }}</div>
                            </div>
                            <div class="right">
                                <button class="pay-btn" @click.stop="goPay(order)">去支付</button>
                                <span class="cancel-btn" @click="cancelOrder(order)">取消订单</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-container">
                <div class="section-title" @click="showPaid = !showPaid">
                    <span>已支付订单</span>
                    <i :class="showPaid ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
                </div>

                <div v-show="showPaid" class="order-list">
                    <div
                        class="order-card"
                        v-for="order in paidOrders"
                        :key="order.orderId"
                    >
                        <div class="order-info">
                            <div class="left">
                                <div class="order-number">订单号：{{ order.number }}</div>
                                <div class="order-time">{{ formatTime(order.orderTime) }}</div>
                                <div class="order-amount">￥{{ order.orderTotal.toFixed(2) }}</div>
                            </div>
                            <div class="right">
                                <span class="repeat-btn" @click="repeatOrder(order)">再来一单</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-container">
                <div class="section-title" @click="showCanceled = !showCanceled">
                    <span>已取消订单</span>
                    <i :class="showCanceled ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
                </div>

                <div v-show="showCanceled" class="order-list">
                    <div
                        class="order-card"
                        v-for="order in canceledOrders"
                        :key="order.orderId"
                    >
                        <div class="order-info">
                            <div class="left">
                                <div class="order-number">订单号：{{ order.number }}</div>
                                <div class="order-time">{{ formatTime(order.orderTime) }}</div>
                                <div class="cancel-time" v-if="order.cancelTime">
                                    取消时间：{{ formatTime(order.cancelTime) }}
                                </div>
                                <div class="order-amount canceled">￥{{ order.orderTotal.toFixed(2) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-padding"></div>
            <FooterBar />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 100vw;
    min-height: 100vh;
    background-color: #fff;
    position: relative;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 12vw;
    background: #17baf9;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4.8vw;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.content {
    width: 89%;
    padding-top: 14vw;
}
.section-container {
    background-color: #fff;
    border: 1px solid rgba(255, 153, 0, 0.2);
    .section-title {
        margin: 1vw 0;
        font-size: 4.5vw;
        color: #666;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1vw;

    }
}

.order-list {
    display: flex;
    flex-direction: column;
    gap: 2vw;
}
.order-card {
    background: #fff;
    border-radius: 2vw;
    padding: 3vw;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    :hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .order-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .left {
            .order-number {
                font-size: 4vw;
                font-weight: 500;
                color: #333;
                margin-bottom: 1vw;
            }
            .order-time, .cancel-time {
                font-size: 3.2vw;
                color: #999;
                margin-bottom: 1vw;
                display: flex;
                justify-content: flex-start;
            }
            .order-amount {
                font-size: 4.2vw;
                font-weight: 600;
                color: #333;
                display: flex;
                justify-content: flex-start;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 1.5vw;
            .pay-btn {
                background: #ff9900;
                color: #fff;
                border: none;
                border-radius: 1.5vw;
                font-size: 3.8vw;
                cursor: pointer;
                transition: all 0.2s;
                :hover {
                    background: #e68a00;
                }
            }
            .cancel-btn,
            .repeat-btn {
                font-size: 3.8vw;
                cursor: pointer;
                padding: 1vw 2vw;
                border-radius: 1.5vw;
                transition: all 0.2s;
                :hover {
                    background-color: rgba(23, 186, 249, 0.1);
                }
            }
            .cancel-btn {
                color: #ff4d4f;
                :hover {
                    background-color: rgba(255, 77, 79, 0.1);
                }
            }
            .repeat-btn {
                color: #17baf9;
            }
        }
    }
}
.footer-padding {
    height: 14vw;
}
</style>