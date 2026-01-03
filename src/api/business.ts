import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";

/**
 * 获取商家列表
 */
export const businessInfoService = (): Promise<ApiResponse> => {
    return request.get("/user/business/list")
}

/**
 * 获取商家列表（分类之后的）
 * @param typeId 商家类型号
 */
export const businessTypeInfoService = (typeId: number): Promise<ApiResponse> => {
    return request.get("/user/business/list/" + typeId)
}

/**
 * 获取指定的商家
 * @param businessId 商家id
 */
export const businessGetOneService = (businessId: number): Promise<ApiResponse> => {
    return request.get("/user/business/" + businessId);
}