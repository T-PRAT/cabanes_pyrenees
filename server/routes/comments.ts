import { zValidator } from '@hono/zod-validator'
import { idSchema } from '../../shared/validationSchema'
import { Hono } from 'hono'
import { db } from '../db'
import { comments } from '../db/schema'
import { eq } from 'drizzle-orm'

const commentsRoute = new Hono().delete('/:id', zValidator('param', idSchema), async (c) => {
   const { id } = c.req.valid('param')

   const data = await db.delete(comments).where(eq(comments.id, id))

   return c.json(data)
})

export default commentsRoute
