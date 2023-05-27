import { prismaDb } from '.'

export const addFavoriteMovie = async (profileId: string, movieId: string) => {
  const newFavoriteMovie = await prismaDb.favoritesMovies.create({
    data: {
      profileId,
      movieId,
    },
  })
  return newFavoriteMovie || null
}

export const getFavoriteMovies = async (profileId: string) => {
  const favoriteMovies = await prismaDb.profile.findUnique({
    where: {
      id: profileId,
    },
    include: {
      favorites: {
        include: {
          movie: true,
        },
      },
    },
  })

  const favorites = favoriteMovies?.favorites.map((favorite) => favorite.movie)

  return favorites || []
}

export const removeFavoriteMovie = async (
  profileId: string,
  movieId: string
) => {
  const favoriteMovie = await prismaDb.favoritesMovies.findFirst({
    where: {
      profileId,
      movieId,
    },
  })

  if (!favoriteMovie) {
    return null
  }

  const deletedFavoriteMovie = await prismaDb.favoritesMovies.delete({
    where: {
      profileId_movieId: {
        movieId,
        profileId,
      },
    },
  })

  return deletedFavoriteMovie || null
}
