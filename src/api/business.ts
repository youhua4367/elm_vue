import request from "@/utils/request.ts";
import type {ApiResponse} from "@/types/api.ts";

export const businessInfoService = (): Promise<ApiResponse> => {
    return request.get("/user/business/list")
}

export const businessTypeInfoService = (typeId: number): Promise<ApiResponse> => {
    return request.get("/user/business/list/" + typeId)
}

export const businessGetOneService = (businessId: number): Promise<ApiResponse> => {
    return request.get("/user/business/" + businessId);
}