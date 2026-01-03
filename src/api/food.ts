import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";

/**
 * 获取商家的食物列表
 * @param businessId
 */
export const foodListService = (businessId: number): Promise<ApiResponse> => {
    return request.get("/user/food/"+ businessId);
}