import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api.ts";

/**
 * 获取所有的食物的类型
 */
export const foodTypeService = (): Promise<ApiResponse> => {
    return request.get("/user/type");
}