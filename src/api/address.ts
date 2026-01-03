import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";
import type {Address} from "@/types/address.ts";

/**
 * 获取地址信息
 */
export const addressGetService = (): Promise<ApiResponse> => {
    return request.get("/user/address/list")
}

/**
 * 根据 id 查询地址
 * @param id
 */
export const addressGetByIdService = (id: number): Promise<ApiResponse> => {
    return request.get("/user/address/" + id)
}
/**
 * 根据 id 删除地址
 * @param id
 */
export const addressDeleteByIdService = (id: number): Promise<ApiResponse> => {
    return request.delete("/user/address/" + id)
}

/**
 * 获取默认地址
 */
export const addressGetDefaultService = (): Promise<ApiResponse> => {
    return request.get("/user/address/default")
}

/**
 * 设置默认地址
 * @param address 地址信息
 */
export const addressSetDefaultService = (address: Address): Promise<ApiResponse> => {
    return request.put("/user/address/default", address)
}

/**
 * 新增地址
 * @param address 地址信息
 */
export const addressAddService = (address: Address): Promise<ApiResponse> => {
    return request.post("/user/address", address)
}

/**
 * 修改地址
 * @param address 地址信息
 */
export const addressChangeByIdService = (address: Address): Promise<ApiResponse> => {
    return request.put("/user/address", address)
}

export const addressGetCurrentService = (position: string): Promise<ApiResponse> => {
    return request.get("/user/address/api/" + position)
}


