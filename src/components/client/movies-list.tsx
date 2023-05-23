'use client'
import { cn } from '@/lib/cn'
import type { Movie } from '@/lib/xata/movies'
import { motion, useAnimate } from 'framer-motion'
import Image from 'next/image'

import { Splide, SplideSlide } from '@splidejs/react-splide'
// Default theme
import '@splidejs/react-splide/css'
import { Play, PlayCircle, Plus } from 'lucide-react'

const variants = {
  open: {},
}

function generateLastSelector(
  max: number,
  baseSelector: string,
  selector: string
) {
  let result = baseSelector

  Array.from({ length: max - 1 }).forEach(() => {
    result += ` + ${selector}`
  })

  return result
}
const currentYear = new Date().getFullYear()

function runCallbackAfterTime() {
  let timer: NodeJS.Timeout | null = null

  function reset() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function run(cb: () => void, sconds = 1) {
    reset()
    timer = setTimeout(cb, sconds * 1000)
  }

  return {
    reset,
    run,
  }
}

const MAX_PER_VIEW = 6

export default function MoviesList({ moviesStr }: { moviesStr: string }) {
  const movies: Movie[] = JSON.parse(moviesStr)
  const [scope, animate] = useAnimate()

  const { run, reset } = runCallbackAfterTime()

  return (
    <div className="flex gap-5 pb-16" ref={scope}>
      <Splide
        options={{
          perPage: MAX_PER_VIEW,
          perMove: 2,
          gap: '1rem',
          pagination: false,
          height: 118,
        }}
      >
        {movies.map((movie, index) => {
          return (
            <SplideSlide
              key={index}
              id={`card-${index + 1}`}
              onMouseOver={async (e) => {
                const selector = '.splide__slide'
                const baseSelector = `${selector}.is-active`
                const first =
                  document.querySelector(baseSelector) === e.currentTarget
                const lastSelector = generateLastSelector(
                  MAX_PER_VIEW,
                  baseSelector,
                  selector
                )
                const last =
                  document.querySelector(lastSelector) === e.currentTarget

                let transformOrigin = 'center'
                if (first) {
                  transformOrigin = 'left'
                }
                if (last) {
                  transformOrigin = 'right'
                }
                const id = e.currentTarget.id
                const parent =
                  e.currentTarget.parentElement?.parentElement?.parentElement!
                // Inicia un nuevo temporizador después de 2 segundos
                const animations = () => {
                  animate(parent, { zIndex: 10 }, { duration: 0 })
                  animate(
                    `#${id} .Info`,
                    {
                      display: 'flex',
                    },
                    { duration: 0 }
                  )
                  animate(`#${id} .Info`, { opacity: 1 }, { duration: 0.4 })
                  animate(
                    `#${id}`,
                    { scale: 1.4, transformOrigin },
                    { duration: 0.4 }
                  )
                }
                run(() => {
                  animations()
                })
              }}
              onMouseLeave={(e) => {
                reset()
                const id = e.currentTarget.id
                const parent =
                  e.currentTarget.parentElement?.parentElement?.parentElement!
                const animations = async () => {
                  animate(
                    `#${id} .Info`,
                    {
                      opacity: 0,
                    },
                    { duration: 0.3 }
                  ).then(() => {
                    animate(
                      `#${id} .Info`,
                      { display: 'none' },
                      { duration: 0 }
                    )
                    animate(parent, { zIndex: 0 }, { duration: 0 })
                  })
                  animate(`#${id}`, { scale: 1 }, { duration: 0.3 })
                }
                animations()
              }}
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={movie.poster_url!}
                  alt={movie.title!}
                  width={280}
                  height={200}
                  className="aspect-video w-full"
                />
                <div className="Info hidden flex-col gap-2 bg-zinc-800 p-3 opacity-0">
                  <ul className="flex gap-3">
                    <li>
                      <button className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                        <Play className="h-4 w-4 fill-black stroke-black pl-0.5" />
                      </button>
                    </li>
                    <li>
                      <button className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white">
                        <Plus className="h-4 w-4 fill-white" />
                      </button>
                    </li>
                  </ul>
                  <p
                    className="mt-1 text-xs"
                    dangerouslySetInnerHTML={{
                      __html: movie.release_date?.includes(`${currentYear}`)
                        ? `<span class="text-orange-500 font-semibold">New</span> • ${movie.release_date}`
                        : `${movie.release_date}`,
                    }}
                  />
                  <p className="text-xs">{movie.duration}</p>
                </div>
              </div>
            </SplideSlide>
          )
        })}
      </Splide>
    </div>
  )
}
