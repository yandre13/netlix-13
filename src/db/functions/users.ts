import { db } from '..'
import { type NewUserProps, users } from '../schema'

//select all users
export const getUsers = async () => {
  const res = await db.select().from(users)
  return res
}

export const createUser = async (user: NewUserProps) => {
  const newUser = await db.insert(users).values(user).returning()
  return newUser[0] || null
}
