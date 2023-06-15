import { getMovieById } from '@/db/functions/movies'
import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const movie = await getMovieById(params.id)

  return {
    title: movie?.title,
    description: movie?.description,
  }
}

export default async function Movie({ params }: Props) {
  const movie = await getMovieById(params.id)

  if (!movie) {
    return notFound()
  }

  return (
    <main
      className="
      h-screen w-screen bg-black
    "
    >
      <nav
        className="
        fixed z-10 flex w-full items-center gap-3 bg-black bg-opacity-70 p-4 lg:gap-5
      "
      >
        <Link href="/browse">
          <ChevronLeft />
        </Link>
        <p
          className="
          text-lg font-bold text-white md:text-2xl
        "
        >
          <span className="font-light">Watching: </span>
          {movie.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full object-cover"
        src={movie.trailerUrl}
      />
    </main>
  )
}
