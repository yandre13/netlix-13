import { Profile, User } from '@prisma/client'
import { prismaDb } from '.'

export const getUsers = async () => {
  const users = await prismaDb.user.findMany()
  return users
}

export const createUser = async (id: string, data: User) => {
  const newUser = await prismaDb.user.create({
    data: {
      ...data,
      id,
    },
  })
  return newUser
}

export const getProfiles = async (userId: string) => {
  const profiles = await prismaDb.profile.findMany({
    where: {
      userId: userId,
    },
  })

  return profiles
}

export const createProfile = async (userId: string, data: Profile) => {
  const newProfile = await prismaDb.profile.create({
    data: {
      ...data,
      userId,
    },
  })

  return newProfile
}
