import type { FavMovieProps } from '@/db/schema'
import { useQuery } from '@tanstack/react-query'

async function getFavorites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`)
  const { data } = await res.json()

  return data as FavMovieProps[]
}

export default function useFavorites({
  profileId,
  initialData,
  ...opts
}: {
  profileId: string
  initialData?: any
  suspense?: boolean
}) {
  const result = useQuery<FavMovieProps[]>({
    queryKey: ['favorites', profileId],
    queryFn: getFavorites,
    initialData,
    enabled: !!profileId,
    onSuccess: (e) => {
      // console.log('success', e)
    },
    onError: (e) => {
      console.log('error', e)
    },
    ...opts,
  })
  return result
}
