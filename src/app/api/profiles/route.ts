import { createProfile } from '@/db/functions/profiles'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { TypeOf, object, string } from 'zod'

export async function GET(req: NextRequest) {
  // get userId from params
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: 'No userId',
    })
  }

  try {
    // const profiles = await getProfiles(userId)

    return NextResponse.json({
      status: 200,
      data: 'profiles',
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    })
  }
}

const newProfileSchema = object({
  name: string(),
  picture: string(),
})
type NewProfileApiRequest = Request & { body: TypeOf<typeof newProfileSchema> }

export async function POST(req: NewProfileApiRequest) {
  const cookiestore = cookies()
  const profileJson = cookiestore.get('my-profile')?.value

  if (!profileJson) {
    return NextResponse.json({
      status: 400,
      message: 'No profile id found',
    })
  }

  try {
    const userId = JSON.parse(profileJson).userId as string
    const body = await req.json()
    const { name, picture } = body
    const removedFavorite = await createProfile({
      userId,
      name,
      picture,
    })

    return NextResponse.json({
      status: 201,
      message: 'favorite deleted successfully',
      data: removedFavorite,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
}
