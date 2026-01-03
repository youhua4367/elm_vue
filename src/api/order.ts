import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api.ts";
import type {OrderSubmitDTO} from "@/types/order.ts";

/**
 * 取消某一个订单
 * @param id 订单号
 */
export const orderCancelService = (id: number): Promise<ApiResponse> => {
    return request.put("/user/order/cancel/" + id);
}

/**
 * 用户下单
 * @param orderSubmitDTO 下单表单
 */
export const orderSubmitService = (orderSubmitDTO: OrderSubmitDTO): Promise<ApiResponse> => {
    return request.post("/user/order/submit", orderSubmitDTO)
}

/**
 * 再来一单
 * @param id 订单 id
 */
export const orderRepeatService = (id: number): Promise<ApiResponse> => {
    return request.post("/user/order/repeat/" + id);
}

/**
 * 订单详情
 * @param id
 */
export const orderDetailService = (id: number): Promise<ApiResponse> => {
    return request.get("/user/order/orderDetail/" + id);
}

/**
 * 获取历史订单
 */
export const orderHistoryService = (): Promise<ApiResponse> => {
    return request.get("/user/order/history");
}

/**
 * 支付订单
 * @param id 订单 id
 */
export const orderPayService = (id: number): Promise<ApiResponse> => {
    return request.put("/user/order/pay/" + id);
}