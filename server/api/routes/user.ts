import express from 'express'
const user_route = express.Router()

import { Cookies } from "../documents";
import { getUserVersionById, createUser, getUserPage } from '../queries/users'
import { setTokens, buildTokens, refreshTokens, clearTokens } from "../authentication/tokens";
import { authMiddleware } from '../middlewares/auth'
import { verifyRefreshToken, verifyUser, verifyAccessToken } from "../authentication/verify";
import { getFriendsFromId, getUserById } from "../queries/users";

user_route.post('/register', async (req, res) => {
    const user = await createUser(req.body)
    res.send('success')
})
user_route.post('/login', async (req, res) => {
    const [isCorrect, user] = await verifyUser(req.body)
    if(!isCorrect) res.send('The username or password is not valid')
    else{
        const {accessToken, refreshToken} = buildTokens(user)
        setTokens(res, accessToken, refreshToken)
        res.send({
            status : 'success',
            user : user
        })
        //res.redirect(`${process.env.CLIENT_URL}/myPage`)
    }
})

user_route.post('/logout', authMiddleware, function(req, res){
    clearTokens(res)
    res.end()
});

user_route.post('/refresh', async (req, res) => {
    try {
        const current = verifyRefreshToken(req.cookies[Cookies.refreshToken])
        const user = await getUserVersionById(current.userId)
        if (!user) throw 'User not found'
        
        const {accessToken, refreshToken} = refreshTokens(current, user.tokenVersion)
        setTokens(res, accessToken, refreshToken)
    } catch (error) {
        console.log(error)
        clearTokens(res)
    }

    res.end()
  })

user_route.get('/getUser', authMiddleware, async (req, res) => {
    try{
        const token = verifyAccessToken(req.cookies[Cookies.accessToken])
        if(token){
            const user = await getUserById(token.userId)
            res.send(user)
        }else{
            res.send('none')
        }
    }catch(error){
        res.send('none')
    }
})

user_route.post('/getFriends', authMiddleware, async (req, res) => {
    try{
        const friends = await getFriendsFromId(req.body.userId)
        res.send(friends)
    }catch(error){
        res.send(error)
    }
})

user_route.post('/userPage', authMiddleware, async (req, res) => {
    try{
        const pageInfo = await getUserPage(req.body.userId)
        res.status(200).send(pageInfo)
    }catch(error){
        res.send(error)
    }
})

export default user_route