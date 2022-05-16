import axios from 'axios'
import { getError } from './errors'

const SET_COOKIE_HEADER = 'set-cookie'

const refreshTokens = async (req, res) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/refresh`, undefined, {
      headers: {cookie: req.headers.cookie},
    })
    const cookies = response.headers[SET_COOKIE_HEADER]
  
    req.headers.cookie = cookies
    res.setHeader(SET_COOKIE_HEADER, cookies)
}


/**
 * This Basically handles the situation where the access token is no
 * longer available. It will thus fetch another one with the current
 * refreh token. It will also handle errors
 * @param {*} req 
 * @param {*} res 
 * @param {*} request 
 * @returns 
 */
const handleRequest = async (req, res, request) => {
    try {
      return await request()
    } catch (error) {
        //401 is the sent error when access token not available
      if (error?.response?.status === 401) {
        try {
          await refreshTokens(req, res)
          return await request()
        } catch (innerError) {
          throw getError(innerError)
        }
      }
  
      throw getError(error)
    }
  }

export const serverSideReq = async (req, res, url, method, payload) => {
  
    switch(method){
        case 'get':
            try{
                const request = () => axios.get( url, {headers : { cookie : req.headers.cookie }})
                const {data} = await handleRequest(req, res, request)
                return [null, data]   
            } catch (error){
                return [error, null]
            }
        case 'post':
          try{
            const request = () => axios.post( url, payload, {headers : { cookie : req.headers.cookie }})
            const { data } = await handleRequest(req, res, request)
            return [null, data]
          } catch(err) {
            console.log(err)
             return err
          }
        default:
            return ['wrong method', null]
    }
}