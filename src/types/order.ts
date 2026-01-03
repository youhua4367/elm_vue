/**
 * 提交的订单
 */
export interface OrderSubmitDTO {
    businessId: number;   // 商家ID
    orderTotal: number;   // 订单总金额
    addressId: number;    // 地址ID
    remark: string;      // 备注
    packAmount: number;  // 打包费
}

/**
 * 提交订单的响应
 */
export interface OrderSubmitVO {
    id: number;
    orderNumber: string;  // 订单号
    orderAmount: number;
    orderTime: string;
}

/**
 * 订单详情项
 */
export interface OrderDetailItem {
    odId: number;
    orderId: number;
    foodId: number;
    setMealId: number;
    quantity: number;
    name: string;
    img: string;
    amount: number;
    flavor: string;
    businessId: number;
}

/**
 * 订单项
 */
export interface Order {
    orderId: number;
    userId: string;
    businessId: number;
    orderTime: string;
    orderTotal: number;
    addressId: number;
    payStatus: number;
    remark?: string;
    packAmount?: number;
    orderStatus: number;
    deliveryTime?: string;
    cancelTime?: string;
    number: string;
}