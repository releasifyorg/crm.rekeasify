
export interface User {
    id: number
    name: string
    username: string
    avatar_url: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
}

export interface UserStore {
    isFirstRoute: boolean
    isAuth: false
    initialRoute: string
    accessToken: string
    user: User
}