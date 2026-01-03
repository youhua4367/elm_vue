import request from "@/utils/request"
import type {ApiResponse} from "@/types/api.ts";
import type {LoginData, RegisterData, UserUpdate} from "@/types/user.ts";


/**
 * 用户注册
 * @param registerData
 */
export const userRegisterService = (registerData: RegisterData): Promise<ApiResponse> => {
    return request.post("/user/user/register", registerData)
}

/**
 * 用户登录
 * @param loginData
 */
export const userLoginService = (loginData: LoginData): Promise<ApiResponse> => {
    return request.post("/user/user/login", loginData)
}

/**
 * 获取用户信息
 */
export const userInfoService = (): Promise<ApiResponse> => {
    return request.get("/user/user/info")
}

/**
 * 修改用户信息
 * @param userUpdate 用户信息表单
 */
export const userUpdateService = (userUpdate: UserUpdate): Promise<ApiResponse> => {
    return request.put("/user/user/update", userUpdate)
}

export const userAuthService = (): Promise<ApiResponse> => {
    return request.get("/user/user/auth")
}
