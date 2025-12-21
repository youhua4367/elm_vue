import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api.ts";

export const foodTypeService = (): Promise<ApiResponse> => {
    return request.get("/user/type");
}