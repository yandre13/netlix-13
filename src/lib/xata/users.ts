import { db } from './db'

export const getUsers = async () => {
  const users = await db.users.getMany({
    // 30 mins of cache
    // cache: 30 * 60,
  })
  return users
}

type OmitedProps =
  | 'created_at'
  | 'updated_at'
  | 'getMetadata'
  | 'toSerializable'
  | 'read'
  | 'update'
  | 'delete'
  | 'replace'

export type User = Omit<
  Awaited<ReturnType<typeof getUsers>>[number],
  OmitedProps
>

export const createUser = async (
  id: string,
  data: Omit<User, 'profile' | 'id'>
) => {
  const newUser = await db.users.create(id, data)
  return newUser
}

export const getProfiles = async (userId: string) => {
  const profiles = await db.profiles
    .filter('user.id', userId)
    .select(['*'])
    .getAll()

  return profiles
}
export type Profile = Omit<
  Awaited<ReturnType<typeof getProfiles>>[number],
  OmitedProps
>

export const createProfile = async (
  userId: string,
  data: Omit<Profile, 'user' | 'id'>
) => {
  const newProfile = await db.profiles.create({
    ...data,
    user: userId,
  })

  return newProfile
}
