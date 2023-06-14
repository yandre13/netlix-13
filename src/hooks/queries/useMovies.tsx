import { Movie } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`)
  const { data } = await res.json()

  return data as Movie[]
}

export default function useMovies({
  initialData,
  revalidateOnMounted,
}: {
  initialData?: any
  revalidateOnMounted?: boolean
}) {
  const result = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: getMovies,
    initialData,
  })

  useEffect(() => {
    if (revalidateOnMounted) {
      result.refetch()
    }
  }, [result, revalidateOnMounted])

  return result
}
