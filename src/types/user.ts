export interface RegisterData {
    userId: string
    password: string
    rePassword: string
    
    // 验证码
    authInfo: string
    // 验证码前缀
    authKey: string
}

export interface LoginData {
    userId: string
    password: string
}

export interface UserInfo {
    userId: string
    userName: string
    userSex: 0 | 1
    userImg: string
}

export interface UserUpdate {
    userName?: string
    userSex?: number
    userImg?: string
}

export interface UserAuth {
    // 验证码
    authInfo: string
    // 验证码前缀
    authKey: string
}