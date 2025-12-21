import request from "@/utils/request"
import type {ApiResponse} from "@/types/api.ts";
import type {LoginData, RegisterData} from "@/types/user.ts";




export const userRegisterService = (registerData: RegisterData): Promise<ApiResponse> => {
    
    return request.post("/user/user/register", registerData)
}

export const userLoginService = (loginData: LoginData): Promise<ApiResponse> => {
    return request.post("/user/user/login", loginData)
}

export const userInfoService = (): Promise<ApiResponse> => {
    return request.get("/user/user/info")
}