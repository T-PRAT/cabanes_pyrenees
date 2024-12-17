import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import hutsRoute from './routes/huts'
import authRoute from './routes/auth'
import commentsRoute from './routes/comments'
import uploadRoute from './routes/upload'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath('/api').route('/huts', hutsRoute).route('/comments', commentsRoute).route('/uploadthing', uploadRoute).route('/auth', authRoute)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app

//export for the front-end
export type ApiType = typeof apiRoutes
