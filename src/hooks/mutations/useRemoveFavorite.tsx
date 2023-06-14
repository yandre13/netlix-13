import { FavoritesMovies, Profile } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useCookie from '../useCookie'

async function removeFavorite(movieId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favorites?movieId=${movieId}`,
    {
      method: 'DELETE',
    }
  )
  const { data } = await res.json()

  return data as FavoritesMovies
}

export default function useRemoveFavorite() {
  const queryClient = useQueryClient()
  const { value: profile } = useCookie<Profile>('my-profile')
  const result = useMutation({
    mutationFn: (movieId: string) => removeFavorite(movieId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['favorites', profile?.id!])
    },
  })
  return result
}
