// store/order.ts
import {defineStore} from "pinia";
import type {Order, OrderDetailItem, OrderSubmitDTO, OrderSubmitVO} from "@/types/order.ts";
import type {ApiResponse} from "@/types/api.ts";
import {
    orderCancelService,
    orderDetailService,
    orderHistoryService, orderPayService,
    orderRepeatService,
    orderSubmitService
} from "@/api/order.ts";
import {ref} from "vue";

export const useOrderStore = defineStore("order", () => {
    // 历史订单
    const historyOrders = ref<Order[]>([]);
    // 订单详情
    const currentOrderDetail = ref<OrderDetailItem[]>([]);
    const loading = ref(false);
    const currentOrder = ref<OrderSubmitVO>();
    
    /**
     * 获取历史订单
     */
    const getHistoryOrders = async () => {
        loading.value = true;
        try {
            const res: ApiResponse = await orderHistoryService();
            if (res.code === 1) {
                historyOrders.value = res.data;
            }
        } finally {
            loading.value = false;
        }
    };
    
    /**
     * 获取订单详情
     * @param id 订单id
     */
    const getOrderDetail = async (id: number) => {
        loading.value = true;
        try {
            const res: ApiResponse = await orderDetailService(id);
            if (res.code === 1) {
                currentOrderDetail.value = res.data;
            }
        } finally {
            loading.value = false;
        }
    };
    
    /**
     * 提交订单
     * @param orderSubmitDTO 提交订单DTO
     */
    const submitOrder = async (orderSubmitDTO: OrderSubmitDTO) => {
        loading.value = true;
        try {
            const res = await orderSubmitService(orderSubmitDTO)
            currentOrder.value = res.data;
        } finally {
            loading.value = false;
        }
    };
    
    /**
     * 取消订单
     * @param id 订单id
     */
    const cancelOrder = async (id: number) => {
        loading.value = true;
        try {
            const res: ApiResponse = await orderCancelService(id);
            if (res.code === 1) {
                await getHistoryOrders();
            }
            return res;
        } finally {
            loading.value = false;
        }
    };
    
    /**
     * 再来一单
     * @param id 订单id
     */
    const repeatOrder = async (id: number) => {
        loading.value = true;
        try {
            const res: ApiResponse = await orderRepeatService(id);
            await getOrderDetail(id);
            await getHistoryOrders();
            return res;
        } finally {
            loading.value = false;
        }
    };
    
    const payOrder = async (id: number) => {
        loading.value = true;
        try {
            await orderPayService(id);
            await getHistoryOrders();
        } finally {
            loading.value = false;
        }
    }
    
    return {
        historyOrders,
        currentOrderDetail,
        currentOrder,
        loading,
        getHistoryOrders,
        getOrderDetail,
        submitOrder,
        cancelOrder,
        repeatOrder,
        payOrder,
    };
});
