import Movies from '@/components/server/movies'
import Navbar from '@/components/navbar'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'

import { getRandomMovie } from '@/lib/xata/movies'
import { UserButton } from '@clerk/nextjs'
import { Info } from 'lucide-react'
import Image from 'next/image'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { Profile } from '@/lib/xata/users'

export default async function Watch() {
  const movie = await getRandomMovie()

  return (
    <main className="">
      <Suspense fallback={<Spinner />}>
        <Navbar />
      </Suspense>
      <section className="relative">
        <video
          autoPlay
          muted
          loop
          poster={movie.poster_url || ''}
          src={movie.trailer_url || ''}
          // controls
          className="aspect-video w-full object-cover brightness-50"
        />
        <div className="absolute top-[33%] w-full">
          <div className="container">
            <div className="max-w-[42%]">
              <h1 className="text-2xl font-bold text-white md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>
              <p className="mt-5 text-lg text-white md:mt-8 ">
                {movie.description}
              </p>

              <Button
                className="mt-5 bg-white bg-opacity-30 text-white hover:bg-white hover:bg-opacity-20 md:mt-8 lg:text-base"
                size="default"
              >
                <Info className="mr-2 h-5 w-5" />
                More info
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Suspense fallback={<Spinner />}>
          <Movies />
        </Suspense>
      </section>
    </main>
  )
}
