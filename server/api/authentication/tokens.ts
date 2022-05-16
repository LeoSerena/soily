import jwt from 'jsonwebtoken'
import { CookieOptions, Response } from 'express'

import { RefreshToken, Cookies } from '../documents'
import { UserDocument } from '../documents'

const ACCESS_TOKEN_EXPIRE  =  1000 * 60 * 15 // 15 minutes
const REFRESH_TOKEN_EXPIRE = 1000 * 60 * 60 * 24 * 3 // 3 days
export const REFRESH_IF_LESS_THAN = 1000 * 60 * 60 * 3 // 3 hours

const defaultCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: (process.env.NODE_ENV==='production'), // -> cookies only through secure channel
    sameSite: (process.env.NODE_ENV==='production') ? 'strict' : 'lax', // ->  only own website can access them, i.e. the next field
    domain: 'localhost', // -> domain which can access the cookies
    path: '/', // -> available to all pages
  }
  
  const refreshTokenCookieOptions: CookieOptions = {
    ...defaultCookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRE
  }
  
  const accessTokenCookieOptions: CookieOptions = {
    ...defaultCookieOptions,
    maxAge: ACCESS_TOKEN_EXPIRE
  }

export function signAccessToken(userId : string) : string {
  return jwt.sign(
      { userId : userId }, 
      process.env.TOKEN_SECRET!, 
      { expiresIn : ACCESS_TOKEN_EXPIRE }
  )
}
export function signRefreshToken(userId : string, tokenVersion : number) : string {
  return jwt.sign(
      { userId : userId, version : tokenVersion }, 
      process.env.REFRESH_TOKEN_SECRET!, 
      { expiresIn : REFRESH_TOKEN_EXPIRE }
  )
}

export function buildTokens(user : UserDocument){
    const accessToken : string = signAccessToken( user._id )
    // instantiate the user version at 0
    const refreshToken : string = signRefreshToken( user._id, 0)
    return {accessToken, refreshToken}
}

export function setTokens(res : Response, accessToken : string, refreshToken? : string){
    res.cookie(Cookies.accessToken, accessToken, accessTokenCookieOptions)
    // If the refresh token isn't about to expire we don't update it, this is why the function
    // may not receive one
    if (refreshToken) res.cookie(Cookies.refreshToken, refreshToken, refreshTokenCookieOptions)
}

export function clearTokens(res: Response) {
  res.cookie(Cookies.accessToken, '', {...defaultCookieOptions, maxAge: 0})
  res.cookie(Cookies.refreshToken, '', {...defaultCookieOptions, maxAge: 0})
}

export function refreshTokens(current : RefreshToken, version : number){
  if (current.version !== version){ throw 'Token was revoked'}

  const expiration = (new Date(current.exp * 1000)).getTime()
  const timeBeforeExpiration = (expiration - (new Date()).getTime())
  // we update the refresh token if about to expire
  const accessToken = signAccessToken(current.userId)
  if( timeBeforeExpiration < REFRESH_IF_LESS_THAN ){
      console.log('refresh refreshed')
      const refreshToken = signRefreshToken(current.userId, current.version)
      return {accessToken, refreshToken}
  }else{
      return {accessToken, undefined}
  }
}