import { db } from '..'
import { type NewProfileProps, profiles } from '../schema'
import { eq } from 'drizzle-orm'

export const getProfiles = async (userId: string) => {
  const res = await db.query.profiles.findMany({
    where: eq(profiles.userId, userId),
  })
  return res || []
}

export const createProfile = async (profile: NewProfileProps) => {
  const newProfile = await db.insert(profiles).values(profile).returning()
  return newProfile
}
