import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";
import type {CartItem} from "@/types/cart";

/**
 * 添加购物车
 * @param cartItem 购物车对象
 */
export const cartAddService = (cartItem: CartItem):Promise<ApiResponse> => {
    return request.post("user/cart/add", cartItem);
}

/**
 * 移除购物车
 * @param cartItem 购物车对象
 */
export const cartSubService = (cartItem: CartItem):Promise<ApiResponse> => {
    return request.post("user/cart/sub", cartItem);
}

/**
 * 获取到购物车
 */
export const cartGetService = (): Promise<ApiResponse> => {
    return request.get("user/cart/get");
}

/**
 * 清空购物车
 */
export const cartCleanService = (): Promise<ApiResponse> => {
    return request.get("user/cart/clean");
}