import { Hono } from 'hono'
import { db } from '../db'
import { comments, hutImages, huts, users } from '../db/schema'
import { eq } from 'drizzle-orm'
import { zValidator } from '@hono/zod-validator'
import { commentSchema, hutSchema, idSchema } from '../../shared/validationSchema'
import { getUser } from '../middleware/getUser'
import { storage } from '../lib/bucket'

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
      // get hut and associated images
      const data = (await db.select().from(huts).where(eq(huts.id, id)))[0]
      const hut = {
         id: data.id,
         name: data.name,
         description: data.description ?? '',
         summerCapacity: data.summerCapacity ?? 0,
         winterCapacity: data.winterCapacity ?? 0,
         altitude: data.altitude,
         latitude: Number(data.latitude),
         longitude: Number(data.longitude),
         createdAt: data.createdAt,
         updatedAt: data.updatedAt,
         userId: data.userId ?? 0,
         images: [] as Array<{ id: number; hutId: number; imageUrl: string }>,
      }
      if (!data) return c.status(404)
      const images = await db.select().from(hutImages).where(eq(hutImages.hutId, id))
      for (const image of images) {
         hut.images.push({ id: image.id, hutId: image.hutId, imageUrl: image.imageUrl })
      }

      return c.json(hut)
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
   .post('/:id/upload', zValidator('param', idSchema), storage.single('image'), async (c) => {
      const { id } = c.req.valid('param')
      const { image } = c.var.files

      if (!image) return c.status(400)

      const imageUrl = `${process.env.IMAGE_BASE_URL}${id}-${image?.name}`
      await db.insert(hutImages).values({ hutId: id, imageUrl })

      return c.json({ message: 'success' })
   })

export default hutsRoute
