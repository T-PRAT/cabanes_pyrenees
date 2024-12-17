import { hc } from 'hono/client'
import { type ApiType } from '@server/app'
import { z } from 'zod'
import { hutSchema } from '../../../shared/validationSchema'

const client = hc<ApiType>('/')
const api = client.api

// ------------- HUTS -------------

export async function getHuts() {
   const response = await api.huts.$get()
   const data = await response.json()
   if (!data) return []

   return data
}
export async function getMyHuts() {
   const response = await api.huts.me.$get()
   if (response.status === 401) return []
   const data = await response.json()
   if (!data) return []

   return data
}
export async function getHut(id: number) {
   const response = await api.huts[':id'].$get({ param: { id: id.toString() } })
   const data = await response.json()

   return data
}
export async function createHut(hut: z.infer<typeof hutSchema>) {
   const response = await api.huts.$post({ form: hut })
   if (response.status === 401) return null
   const data = await response.json()

   return data
}
export async function deleteHut(id: number) {
   const response = await api.huts[':id'].$delete({ param: { id: id.toString() } })
   if (response.status === 401) return null
   const data = await response.json()

   return data
}

// ------------- COMMENTS -------------

export async function getComments(hutId: number) {
   const response = await api.huts[':id'].comments.$get({ param: { id: hutId.toString() } })
   const data = await response.json()

   return data
}

export async function createComment(hutId: number, content: string) {
   const response = await api.huts[':id'].comments.$post({ param: { id: hutId.toString() }, form: { content: content } })
   if (response.status === 401) return null
   const data = await response.json()

   return data
}

export async function deleteComment(id: number) {
   const response = await api.comments[':id'].$delete({ param: { id: id.toString() } })
   if (response.status === 401) return null
   const data = await response.json()

   return data
}

// ------------- AUTH -------------

export async function login(username: string, password: string) {
   const response = await api.auth.login.$post({ form: { username, password } })
   const data = await response.json()

   return data
}
export async function signup(username: string, email: string, password: string) {
   const response = await api.auth.signup.$post({ form: { username, email, password } })
   const data = await response.json()

   return data
}
export async function logout() {
   await api.auth.logout.$post()
}

export async function getUser() {
   const response = await api.auth.me.$get()
   if (response.status === 401) return null
   const data = await response.json()

   return data
}
