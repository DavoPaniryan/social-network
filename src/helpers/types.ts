export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    cover: string
    picture: string
    followers: IUser[]
    following: IUser[]
    isPrivate: number
    available : boolean
}

export interface IRequets {
    id : number
    user : IUser
}

export interface IAccount extends IUser {
    posts: []
    isPrivate: number
    connection: {
        followsMe: boolean
        following: boolean
        requested: boolean
    }
}

export interface IResponse {
    status: string
    message: string
    payload: unknown
    user?: IUser
}
export type IAuth = Pick<IUser, 'login' | 'password'>

export interface IContext {
    user: null | IUser
    refetch: () => void
}

export interface IAccountContext{
    account:IAccount
    refetch: () => void
}

export interface IPost {
    isLiked: boolean
    id : string
    picture : string
    posts : []
    title : string
    likes : []
    comments : []
    userId : string
}