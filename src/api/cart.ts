import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";
import type {CartItem} from "@/types/cart";

export const cartAddService = (cartItem: CartItem):Promise<ApiResponse> => {
    return request.post("user/cart/add", cartItem);
}

export const cartSubService = (cartItem: CartItem):Promise<ApiResponse> => {
    return request.post("user/cart/sub", cartItem);
}

export const cartGetService = (): Promise<ApiResponse> => {
    return request.get("user/cart/get");
}

export const cartCleanService = (): Promise<ApiResponse> => {
    return request.get("user/cart/clean");
}