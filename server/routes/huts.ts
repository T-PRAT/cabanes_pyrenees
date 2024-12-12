import { Hono } from 'hono'
import { db } from '../db'
import { huts } from '../db/schema'
import { eq } from 'drizzle-orm'
import { zValidator } from '@hono/zod-validator'
import { hutSchema } from '../../shared/validationSchema'
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
      const hut = c.req.valid('form')
      hut.userId = c.get('user').id
      console.log(hut)
      const data = await db.insert(huts).values(hut)

      return c.json(data)
   })

export default hutsRoute
