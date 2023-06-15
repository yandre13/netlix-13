import MoviesList from '../client/movies-list'
import { getMovies } from '@/db/functions/movies'

const Movies = async function Movies() {
  const data = await getMovies()

  return <MoviesList moviesJson={JSON.stringify(data)} />
} as unknown as () => JSX.Element

export default Movies
