import express from 'express'
const discussions_route = express.Router()

import { getRecentDiscussions } from "../queries/discussions";

discussions_route.get('/recentDiscussions', async (req, res) => {
    const discussions = await getRecentDiscussions()
    res.send(discussions)
})

export default discussions_route