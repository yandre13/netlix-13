import { getMovieById } from '@/lib/prisma/movie'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Movie({
  params,
}: {
  params: {
    id: string
  }
}) {
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
        <Link href="/watch">
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
