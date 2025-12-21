export interface RegisterData {
    userId: string
    password: string
    rePassword: string
    userName: string
    userSex: number
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