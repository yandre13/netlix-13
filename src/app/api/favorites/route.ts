import { cookies } from 'next/headers'
import {
  addFavoriteMovie,
  getFavoriteMovies,
  removeFavoriteMovie,
} from '@/db/functions/favorites'
import { NextRequest, NextResponse } from 'next/server'
import { object, string, TypeOf } from 'zod'

// add favorite

const favoriteSchema = object({
  movieId: string(),
})
type FavoriteApiRequest = Request & { body: TypeOf<typeof favoriteSchema> }

export async function POST(req: FavoriteApiRequest) {
  const cookiestore = cookies()
  const profileJson = cookiestore.get('my-profile')?.value

  if (!profileJson) {
    return NextResponse.json({
      status: 400,
      message: 'No profile id found',
    })
  }

  const profileId = JSON.parse(profileJson).id as string

  try {
    const body = await req.json()
    const { movieId } = body

    const newFavorite = await addFavoriteMovie(profileId, movieId)
    return NextResponse.json({
      status: 201,
      message: 'new favorite added successfully',
      data: newFavorite,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
}

export async function GET() {
  const cookiestore = cookies()
  const profileJson = cookiestore.get('my-profile')?.value

  if (!profileJson) {
    return NextResponse.json({
      status: 400,
      message: 'No profile id found',
    })
  }

  const profileId = JSON.parse(profileJson).id

  try {
    // wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const favoritesList = await getFavoriteMovies(profileId)
    // console.log({ favoritesList })
    return NextResponse.json({
      status: 201,
      message: 'new favorite added successfully',
      data: favoritesList,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error from favorites',
    })
  }
}

export async function DELETE(req: NextRequest) {
  const cookiestore = cookies()
  const profileJson = cookiestore.get('my-profile')?.value

  if (!profileJson) {
    return NextResponse.json({
      status: 400,
      message: 'No profile id found',
    })
  }

  const profileId = JSON.parse(profileJson).id as string

  try {
    const movieId = req.nextUrl.searchParams.get('movieId') as string
    const removedFavorite = await removeFavoriteMovie(profileId, movieId)

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
