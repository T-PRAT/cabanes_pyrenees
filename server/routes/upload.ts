import { Hono } from 'hono'

import { createRouteHandler } from 'uploadthing/server'

import { uploadRouter } from '../lib/upload'

const handlers = createRouteHandler({
   router: uploadRouter,
})

const uploadRoute = new Hono().all('/uploadthing', (c) => handlers(c.req.raw))

export default uploadRoute
