import { db } from '..'
import { favorites } from '../schema'
import { and, eq } from 'drizzle-orm'

//select all movies
export const getFavoriteMovies = async (profileId: string) => {
  const res = await db.query.favorites.findMany({
    where: eq(favorites.profileId, profileId),
    with: {
      movie: true,
    },
  })
  const myFavorites = res.map((favorite) => {
    return {
      ...favorite.movie,
      isFavorite: true,
    }
  })
  return myFavorites || []
}

export const addFavoriteMovie = async (profileId: string, movieId: string) => {
  const res = await db
    .insert(favorites)
    .values({ profileId, movieId })
    .returning()
  return res
}

export const removeFavoriteMovie = async (
  profileId: string,
  movieId: string
) => {
  const res = await db
    .delete(favorites)
    .where(
      and(eq(favorites.profileId, profileId), eq(favorites.movieId, movieId))
    )
    .returning()
  return res || null
}
