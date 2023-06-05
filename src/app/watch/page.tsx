import Movies from '@/components/server/movies'
import Navbar from '@/components/navbar'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import { Suspense } from 'react'
import { getRandomMovie } from '@/lib/prisma/movie'
import FavoritesList from '@/components/client/favorites-list'
import { ButtonOpenModal, CardModalWrapper } from '@/components/info-banner'
// import { ModalInfo } from '@/components/carousel'

export default async function Watch() {
  const movie = await getRandomMovie()

  return (
    <main className="">
      {/* <Suspense fallback={<Spinner />}> */}
      <Navbar />
      {/* </Suspense> */}
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
              <ButtonOpenModal movie={movie} />
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
      {/* <ModalCard /> */}
      <div className="py-20">
        <br />
        <br />
        <br />
        <CardModalWrapper />
      </div>
      <div className="py-20">
        <br />
        <br />
        <br />
      </div>
      <div className="py-20">
        <br />
        <br />
        <br />
      </div>
      <div className="py-20">
        <br />
        <br />
        <br />
      </div>
    </main>
  )
}
