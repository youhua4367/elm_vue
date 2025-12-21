import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";

export const foodListService = (businessId: number): Promise<ApiResponse> => {
    return request.get("/user/food/"+ businessId);
}