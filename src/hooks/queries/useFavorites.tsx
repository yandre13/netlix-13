import { Movie } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

async function getFavorites(profileId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favorites?profileId=${profileId}`
  )
  const { data } = await res.json()

  return data as Movie[]
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
  const result = useQuery<Movie[]>({
    queryKey: ['favorites', profileId],
    queryFn: () => getFavorites(profileId),
    initialData,
    enabled: !!profileId,
    onSuccess: (e) => {
      console.log('success', e)
    },
    onError: (e) => {
      console.log('error', e)
    },
    ...opts,
  })
  return result
}
