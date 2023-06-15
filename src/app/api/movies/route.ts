import { getMovies } from '@/db/functions/movies'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const moviesList = await getMovies()
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
