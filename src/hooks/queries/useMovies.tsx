import { MovieWithFavorite } from '@/lib/prisma/movie'
import { Movie } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`)
  const { data } = await res.json()

  return data as MovieWithFavorite[]
}

export default function useMovies({ initialData }: { initialData?: any }) {
  const result = useQuery<MovieWithFavorite[]>({
    queryKey: ['movies'],
    queryFn: getMovies,
    initialData,
  })
  return result
}
