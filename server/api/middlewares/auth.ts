import {NextFunction, Request, Response} from 'express'

import { Cookies } from "../documents";
import {verifyAccessToken} from '../authentication/verify'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = verifyAccessToken(req.cookies[Cookies.accessToken])

  if (!token) {
    res.status(401)
    console.log('Not Signed in, need to refresh access token')
    return next()
  }
  // this prevents that we access any ressource that is not the one of the token
  if(req.body.userId){
    if(req.body.userId !== token.userId){
      res.status(401)
      console.log("This ressource is not accessible with this token")
      return next()
    }
  }

  res.locals.token = token
  next()
}