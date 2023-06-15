import Movies from '@/components/server/movies'
import Navbar from '@/components/navbar'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { getRandomMovie } from '@/db/functions/movies'
import FavoritesList from '@/components/client/favorites-list'
import { ButtonOpenModal, CardModalWrapper } from '@/components/info-banner'
import Link from 'next/link'
import { Play } from 'lucide-react'
import Footer from '@/components/footer'
import { Metadata } from 'next'
// import { ModalInfo } from '@/components/carousel'

export const metadata: Metadata = {
  title: 'Browse - Netlix',
  description: 'Browse unlimited movies, TV shows, and more. Watch anywhere.',
}

export default async function Watch() {
  const movie = await getRandomMovie()

  return (
    <>
      <Navbar />
      <main className="">
        <section className="relative">
          <video
            autoPlay
            muted
            loop
            poster={movie.posterUrl}
            src={movie.trailerUrl}
            // controls
            className="aspect-video w-full object-cover brightness-50"
          />
          <div className="w-full lg:absolute lg:top-[33%]">
            <div className="container">
              <div className="lg:max-w-[42%]">
                <h1 className="mt-3 text-2xl font-bold text-white md:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
                <p className="mt-4 text-white md:mt-8 md:text-lg ">
                  {movie.description}
                </p>
                <div className="flex gap-4 lg:gap-6">
                  <Button className="mt-5 md:mt-8 lg:text-base">
                    <Link
                      href={`/watch/${movie.id}`}
                      className="flex items-center"
                    >
                      <Play className="mr-2 h-5 w-5 fill-black stroke-black" />
                      Play
                    </Link>
                  </Button>
                  <ButtonOpenModal movie={movie} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <Suspense fallback={<Spinner />}>
            <Movies />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <FavoritesList />
          </Suspense>
        </section>
        <CardModalWrapper />
        <div className="py-10"></div>
      </main>
      <Footer />
    </>
  )
}
