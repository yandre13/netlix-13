import { db } from '@/lib/xata/db'
import { Movie } from '@/lib/xata/movies'
import MoviesList from '../client/movies-list'

async function getMovies() {
  // await 3s
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const data = await db.movies.getAll()
  return data as Movie[]
}

const Movies = async function Movies() {
  const data = await getMovies()

  return (
    <div className="py-20">
      <MoviesList moviesStr={JSON.stringify(data)} />
    </div>
  )
} as unknown as () => JSX.Element

export default Movies
