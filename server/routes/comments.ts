import { zValidator } from '@hono/zod-validator'
import { idSchema } from '../../shared/validationSchema'
import { Hono } from 'hono'
import { db } from '../db'
import { comments } from '../db/schema'
import { eq } from 'drizzle-orm'
import { getUser } from '../middleware/getUser'

const commentsRoute = new Hono().delete('/:id', getUser, zValidator('param', idSchema), async (c) => {
   const { id } = c.req.valid('param')
   const user = c.get('user')

   const comment = await db.select().from(comments).where(eq(comments.id, id))
   if (comment.length !== 1) return c.status(404)
   if (comment[0].userId !== user.id) return c.status(401)

   const data = await db.delete(comments).where(eq(comments.id, id))

   return c.json(data)
})

export default commentsRoute
