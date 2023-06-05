'use client'

import { animate } from 'framer-motion'
import Image from 'next/image'

import { Splide, SplideSlide } from '@splidejs/react-splide'
// Default theme
import '@splidejs/react-splide/css'
import { ChevronDown, Play, Plus, X } from 'lucide-react'
import { memo, useId, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { openModalAtom } from '@/utils/atoms'
import useAddFavorite from '@/hooks/mutations/useAddFavorite'
import useRemoveFavorite from '@/hooks/mutations/useRemoveFavorite'
import { cn } from '@/lib/cn'
import useMediaQuery from '@/hooks/useMediaQuery'

import Overlay from './overlay'
import { MovieWithFavorite } from '@/lib/prisma/movie'
import { MAX_PER_VIEW, useAnimateCard } from '@/hooks/useAnimateCard'

const currentYear = new Date().getFullYear()

export default function Carousel({ movies }: { movies: MovieWithFavorite[] }) {
  const splideRef = useRef(null)
  const { mutate: mutateAdd, error: errorAdd } = useAddFavorite()
  const { mutate: mutateRemove, error: errorRemove } = useRemoveFavorite()

  const isLg = useMediaQuery('(min-width: 992px)')
  const isXl = useMediaQuery('(min-width: 1280px)')

  const gap = isXl ? 32 : isLg ? 20 : 16
  if (movies.length < 1) return null
  return (
    <div className="flex gap-5 pb-16">
      <Splide
        options={{
          pagination: false,
          arrows: false,
          perMove: 2,
          perPage: MAX_PER_VIEW,
          gap,
          autoWidth: !isLg,
          padding: isLg ? 0 : 16,
          speed: 700,
          height: 120,
        }}
        className="w-full cursor-move lg:container"
        ref={splideRef}
      >
        {movies.map((movie, index) => {
          return (
            <SplideSlide key={index} className="min-w-[300px]">
              <CardCarousel
                movie={movie}
                mutateAdd={mutateAdd}
                mutateRemove={mutateRemove}
              />
            </SplideSlide>
          )
        })}
        <Overlay />
      </Splide>
    </div>
  )
}

function CardCarouselM({
  movie,
  mutateAdd,
  mutateRemove,
}: {
  movie: MovieWithFavorite
  mutateAdd: (id: string) => void
  mutateRemove: (id: string) => void
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const id = useId()
  const [open, setOpen] = useState(false)
  const setOpenModal = useSetAtom(openModalAtom)
  const { handleCardHover, handleCardLeave, handleCardOpen, handleCardClose } =
    useAnimateCard({
      elementRef: cardRef.current,
      open,
      onClose: () => {
        setOpen(false)
        setOpenModal(false)
      },
      sizes: {
        open: {
          maxWidth: 600,
          maxHeight: 600,
        },
        close: {
          maxWidth: 300,
          maxHeight: 300,
        },
      },
    })

  console.log('movie', open)

  return (
    <div
      className="CardContainer 
          h-screen max-h-screen w-full max-w-[300px]
          lg:h-auto lg:max-h-none"
      id={id}
      ref={cardRef}
    >
      <div
        className={cn(
          'no-scrollbar Child overflow-hidden rounded-lg lg:max-h-[590px]',
          open && 'overflow-auto'
        )}
        onMouseOver={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <div className="flex justify-end">
          <div
            className={cn(
              'absolute top-0 m-2 flex h-6 w-6 transition-opacity',
              open ? 'opacity-100' : 'opacity-0'
            )}
          >
            <button
              className="flex w-full items-center justify-center rounded-full bg-zinc-800 ring-1 ring-white"
              onClick={handleCardClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            width={280}
            height={200}
            className="aspect-video w-full"
          />
        </div>

        <div className="Info max-h-0 opacity-0">
          <div className="flex w-full flex-col gap-2 bg-zinc-800 p-4">
            <ul className="flex gap-3">
              <li>
                <button
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 transition-all duration-500',
                    open && 'h-8 w-8'
                  )}
                >
                  <Play
                    className={cn(
                      'h-4 w-4 fill-black stroke-black pl-0.5 transition-all duration-500',
                      open && 'h-6 w-6'
                    )}
                  />
                </button>
              </li>
              <li>
                <button
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white transition-all duration-500',
                    open && 'h-8 w-8'
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    if (!movie.isFavorite) {
                      mutateAdd(movie.id)
                    } else {
                      mutateRemove(movie.id)
                    }
                  }}
                >
                  {movie?.isFavorite ? (
                    <X
                      className={cn(
                        'h-4 w-4 transition-all duration-200',
                        open && 'h-6 w-6'
                      )}
                    />
                  ) : (
                    <Plus
                      className={cn(
                        'h-4 w-4 fill-white transition-all duration-200',
                        open && 'h-6 w-6'
                      )}
                    />
                  )}
                </button>
              </li>
              <li
                className={cn(
                  'ml-auto transition-all duration-200',
                  open
                    ? 'pointer-events-none invisible opacity-0'
                    : 'pointer-events-auto visible opacity-100'
                )}
              >
                <button
                  className="flex h-6 w-6 items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(true)
                    setOpenModal(true)
                    handleCardOpen()
                  }}
                >
                  <ChevronDown className="h-4 w-4 " />
                </button>
              </li>
            </ul>
            <div className="flex flex-col gap-1 lg:gap-2 [&>p>span]:font-bold">
              <h4
                className={cn(
                  'mt-1 font-semibold transition-all duration-500',
                  open && 'text-xl lg:text-2xl'
                )}
              >
                {movie.title}
              </h4>
              <p
                className={cn(
                  'text-xs transition-all duration-500',
                  open && 'text-base'
                )}
                dangerouslySetInnerHTML={{
                  __html: movie.releaseDate?.includes(`${currentYear}`)
                    ? `<span class="text-orange-500 font-semibold">New</span> • ${movie.releaseDate}`
                    : `${movie.releaseDate}`,
                }}
              />

              {open && (
                <div className="TextInfo flex flex-col gap-1 lg:gap-2 [&>p>span]:font-bold">
                  <p>
                    <span>Synopsis:</span> {movie.description}
                  </p>
                  <p>
                    <span>Duration:</span> {movie.duration}
                  </p>
                  <p>
                    <span>Genres:</span>{' '}
                    {movie.genres.map((genre, index) => {
                      return `${genre}${
                        index + 1 !== movie.genres.length && ', '
                      }`
                    })}
                  </p>

                  <p>
                    <span>Cast:</span>{' '}
                    {movie.actors.map((actor, index) => {
                      return `${actor}${
                        index + 1 !== movie.actors.length && ', '
                      }`
                    })}
                  </p>
                  <p>
                    <span>Rating:</span> {movie.rating || 0}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="Overlay fixed left-0 top-0 -z-10 h-full w-full bg-black bg-opacity-50 opacity-0"
        onClick={() => handleCardClose(id)}
      /> */}
    </div>
  )
}

const CardCarousel = memo(CardCarouselM)
