import { getMovies, getMoviesWithFavs } from '@/lib/prisma/movie'
import { cookies } from 'next/headers'

import { NextResponse } from 'next/server'

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
    const moviesList = await getMoviesWithFavs(profileId)
    return NextResponse.json({
      status: 201,
      message: 'new favorite added successfully',
      data: moviesList,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error from favorites',
    })
  }
}
