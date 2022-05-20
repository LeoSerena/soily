import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {Request} from 'express'

import userModel from '../database/models/User'
import { LoginRequest, RefreshToken, AccessToken } from 'api/documents'
import { Cookies } from "../documents";


export async function verifyUser(body : LoginRequest) {
    const { credentials, password } = body
    const user = await userModel.findOne(
    {
        $or :[
            {username : credentials},
            {email : credentials}
        ]
    }, 'username email _id password image')
    if(!user) return [false, {}]
    const isCorrect = await bcrypt.compare(password, user.password)
    if(!isCorrect) return [false, {}]
    delete user.password
    return [true, user]
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as RefreshToken
}

export function verifyAccessToken(token: string) {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET!) as AccessToken
    } catch (e) {}
}
  
export function verifyAccess(
    req : Request, userId : string, discussionOwner : string, coOwners : string[]
){
    const token = verifyAccessToken(req.cookies[Cookies.accessToken])
    if(!token){ throw new Error('Unauthorized')}
    if(token.userId == userId){
        if(userId != discussionOwner && !coOwners.includes(userId)){
            throw new Error('Unauthorized')
        }
    }
}
