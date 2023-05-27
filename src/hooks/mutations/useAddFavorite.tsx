import { FavoritesMovies, Profile } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useCookie from '../useCookie'

async function addFavorite(movieId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
    method: 'POST',
    body: JSON.stringify({ movieId }),
  })
  const { data } = await res.json()

  return data as FavoritesMovies
}

export default function useAddFavorite() {
  const queryClient = useQueryClient()
  const { value: profile } = useCookie<Profile>('my-profile')
  const result = useMutation({
    mutationFn: (movieId: string) => addFavorite(movieId),
    onSuccess: (data) => {
      console.log('success', data)
      queryClient.invalidateQueries(['favorites', profile?.id!])
    },
  })
  return result
}
