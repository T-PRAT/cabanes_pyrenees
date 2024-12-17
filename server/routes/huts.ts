import { Hono } from 'hono'
import { db } from '../db'
import { comments, huts, users } from '../db/schema'
import { eq } from 'drizzle-orm'
import { zValidator } from '@hono/zod-validator'
import { commentSchema, hutSchema, idSchema } from '../../shared/validationSchema'
import { getUser } from '../middleware/getUser'

const hutsRoute = new Hono()
   .get('/', async (c) => {
      const userId = c.req.query('userId')
      if (userId) {
         const userId = Number(c.req.query('userId'))
         const data = await db.select().from(huts).where(eq(huts.userId, userId))
         return c.json(data)
      }
      const data = await db.select().from(huts)

      return c.json(data)
   })
   .get('/me', getUser, async (c) => {
      const user = c.get('user')
      const data = await db.select().from(huts).where(eq(huts.userId, user.id))

      return c.json(data)
   })
   .get('/:id', async (c) => {
      const id = Number(c.req.param('id'))
      const data = await db.select().from(huts).where(eq(huts.id, id))

      data.length !== 1 && c.status(404)
      return c.json(data[0])
   })
   .post('/', getUser, zValidator('form', hutSchema), async (c) => {
      const user = c.get('user')
      const hut = c.req.valid('form')
      console.log(user, hut)
      const data = await db.insert(huts).values({ ...hut, userId: user.id })

      return c.json(data)
   })
   .delete('/:id', getUser, async (c) => {
      const user = c.get('user')
      if (!user) return c.status(401)
      const id = Number(c.req.param('id'))
      const data = await db.delete(huts).where(eq(huts.id, id))

      return c.json(data)
   })
   .get('/:id/comments', zValidator('param', idSchema), async (c) => {
      const { id } = c.req.valid('param')

      const data = (await db.select().from(comments).where(eq(comments.hutId, id))) as Array<{
         id: number
         createdAt: Date
         userId: number
         content: string
         hutId: number
         username?: string
      }>

      for (const comment of data) {
         const user = await db.select().from(users).where(eq(users.id, comment.userId))
         comment.username = user[0].username
      }

      return c.json(data)
   })
   .post('/:id/comments', getUser, zValidator('param', idSchema), zValidator('form', commentSchema), async (c) => {
      const user = c.get('user')
      const { id } = c.req.valid('param')
      const { content } = c.req.valid('form')

      const data = await db.insert(comments).values({ content, userId: user.id, hutId: id })

      return c.json(data)
   })

export default hutsRoute
