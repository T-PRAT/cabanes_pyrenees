import { generateSessionToken, createSession, generateUserId, validateSessionToken } from '../lib/auth'
import { loginSchema, signupSchema } from '../../shared/validationSchema'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { db } from '../db'
import { sessions, users } from '../db/schema'
import { setCookie, getCookie } from 'hono/cookie'
import { eq } from 'drizzle-orm'
import { getUser } from '../middleware/getUser'

const authRoute = new Hono()
   .post('/signup', zValidator('form', signupSchema), async (c) => {
      const { username, email, password } = c.req.valid('form')
      const passwordHash = await Bun.password.hash(password)
      const userId = generateUserId()

      try {
         await db.insert(users).values({ id: userId, username, email, passwordHash })
         const token = generateSessionToken()
         const session = await createSession(token, userId)
         setCookie(c, 'session', session.id, { maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: 'strict', path: '/' })

         return c.json({ success: true })
      } catch (error) {
         return c.json({ success: false, error: error })
      }
   })
   .post('/login', zValidator('form', loginSchema), async (c) => {
      const { username, password } = c.req.valid('form')
      const [user] = await db.select().from(users).where(eq(users.username, username))
      if (!user) {
         return c.json({ success: false, error: 'Invalid username or password' })
      }

      const isValid = await Bun.password.verify(password, user.passwordHash)

      if (!isValid) {
         return c.json({ success: false, error: 'Invalid username or password' })
      }

      const token = generateSessionToken()
      const session = await createSession(token, user.id)

      setCookie(c, 'session', session.id, { maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: 'strict', path: '/' })

      return c.json({ success: true })
   })
   .post('/logout', async (c) => {
      const sessionId = getCookie(c, 'session')
      if (!sessionId) {
         return c.json({ success: false, error: 'No session found' })
      }

      await db.delete(sessions).where(eq(sessions.id, sessionId))

      return c.json({ success: true })
   })
   .get('/me', getUser, async (c) => {
      const user = c.get('user')
      if (!user) {
         return c.json({ error: 'No user found' })
      }
      return c.json({ username: user.username })
   })

export default authRoute
