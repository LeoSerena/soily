export interface UserDocument {
    _id : string
    username : string
    tokenVersion : number
}

export interface LoginRequest {
    credentials : string
    password : string
}

export enum Cookies {
    accessToken = 'access',
    refreshToken = 'refresh'
}

export interface AccessToken {
    userId: string
    exp: number
}


export interface RefreshToken {
    userId: string
    version: number
    exp: number
}

export type MessagePayload = {
    chatId : string
    receiverId : string
    msg : {
        senderId : string
        senderName : string
        text : string
    }
}

export type listPayload = {
    original_creator : string
    name : string
    themes : string[]
}

export type bookPayload = {
    userId : string
    title : string
    author : string
    release_year : number
}

export type modifBookPayload = {
    _id: string
    title: string
    author: string
    release_year : string
    notes: string
}

export type discussionPayload = {
    title : string
    owner : string
    description : string
    reference? : string
    tags? : string[]
    language : string
    private : boolean
}

export type postPayload = {
    owner : string
    text? : string
    image? : Buffer
}