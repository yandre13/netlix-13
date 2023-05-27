import MoviesList from '../client/movies-list'
import { getMovies } from '@/lib/prisma/movie'

async function getMoviesServer() {
  // await 3s

  const data = await getMovies()
  return data
}

const Movies = async function Movies() {
  const data = await getMoviesServer()

  return (
    <div className="py-8">
      <MoviesList moviesJson={JSON.stringify(data)} />
    </div>
  )
} as unknown as () => JSX.Element

export default Movies
