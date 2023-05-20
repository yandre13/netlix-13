import { db } from '@/lib/xata/db'
import { Movie } from '@/lib/xata/movies'
import { useQuery } from '@tanstack/react-query'

async function getMovies() {
  const data = await db.movies.getAll()

  return data as Movie[]
}

export default function useMovies() {
  const query = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMovies(),
    staleTime: Infinity,
  })
  return query
}
