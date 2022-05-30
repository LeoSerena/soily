import { getError } from './errors'
import axios from 'axios'

const refreshTokens = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/refresh`, 
      undefined, 
      {withCredentials: true}
    )
}

const handleRequest = async (request) => {
    try {
        return await request()
    } catch (error) {
      if (error?.response?.status === 401) {
        try {
          await refreshTokens()
          return await request()
        } catch (innerError) {
          throw getError(innerError)
        }
      }
  
      throw getError(error)
    }
}

export const fetcher = async (url, method, payload) => {
  switch(method){
      case 'get':
          try{
              const request = () => axios.get( url, {withCredentials:true} )
              const {data} = await handleRequest(request)
              return [null, data]   
          } catch (error){
              return [error, null]
          }
      case 'post':
        try{
            const request = () => axios.post( url, payload, { withCredentials: true } )
            const {data} = await handleRequest(request)
            return [null, data]
        } catch(error) {
            return [error, null]
        }
      default:
          return ['wrong method', null]
  }
}

export const postFile = async (url, formData) => {
    try{
      const request = () => axios.post(url, formData,
        { headers : { 'Content-Type' : 'multipart/form-data' }}
      )
      const {data} = await handleRequest(request)
      return [null, data]   
    } catch (error){ return [error, null] }
}