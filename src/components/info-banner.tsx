'use client'
import { Info } from 'lucide-react'
import { Button } from './ui/button'
import { useAtomValue, useSetAtom } from 'jotai'
import { movieAtom } from '@/utils/atoms'
import type { MovieProps, ProfileProps } from '@/db/schema'
import Overlay from './overlay'
import { Suspense, useCallback, useEffect, useId, useState } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import { Play, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, animate, usePresence } from 'framer-motion'
import useRemoveFavorite from '@/hooks/mutations/useRemoveFavorite'
import useAddFavorite from '@/hooks/mutations/useAddFavorite'
import useCookie from '@/hooks/useCookie'
import useFavorites from '@/hooks/queries/useFavorites'
import Spinner from './spinner'
import Link from 'next/link'

export function ButtonOpenModal({ movie }: { movie: MovieProps }) {
  const setMovie = useSetAtom(movieAtom)
  return (
    <Button
      className="mt-5 bg-white bg-opacity-30 text-white hover:bg-white hover:bg-opacity-20 md:mt-8 lg:text-base"
      size="default"
      onClick={(e) => {
        e.preventDefault()
        setMovie(movie)
      }}
    >
      <Info className="mr-2 h-5 w-5" />
      More info
    </Button>
  )
}

const currentYear = new Date().getFullYear()

function FavoriteButton({ movie }: { movie: MovieProps }) {
  const { value: profile } = useCookie<ProfileProps>('my-profile')
  const { data: myFavs } = useFavorites({
    profileId: profile?.id!,
  })
  const { mutate: mutateAdd, error: errorAdd } = useAddFavorite()
  const { mutate: mutateRemove, error: errorRemove } = useRemoveFavorite()
  // validate if movie is in  myFavs
  const isFavorite = myFavs?.some((fav) => fav.id === movie.id)

  return (
    <li>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-white"
        onClick={(e) => {
          e.preventDefault()
          if (!isFavorite) {
            mutateAdd(movie.id)
          } else {
            mutateRemove(movie.id)
          }
        }}
      >
        {isFavorite ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6 fill-white" />
        )}
      </button>
    </li>
  )
}

export function CardModal({ movie }: { movie: MovieProps }) {
  const id = useId()

  // the id has : at the start and end, so we need to remove them
  const newId = id.replace(/:/g, '\\:')
  const [isPresent, safeToRemove] = usePresence()
  const setMovie = useSetAtom(movieAtom)

  const isMd = useMediaQuery('(min-width: 768px)')

  const handleCardClose = useCallback(() => {
    setMovie(null)
  }, [setMovie])

  useEffect(() => {
    if (isPresent) {
      const eneterAnimation = async () => {
        const offset = document.getElementById(newId)?.getBoundingClientRect()
        const x = offset?.left || 0
        const y = offset?.top || 0
        const sequence = [
          [`#${newId}`, { zIndex: 100 }, { duration: 0 }],
          [
            `#${newId}`,
            {
              scale: 0.4,
              opacity: 0,
              x: isMd ? '-50%' : 0,
              y: isMd ? '-50%' : 0,
            },
            { duration: 0, at: 0.1 },
          ],
          [
            `#${newId}`,
            {
              scale: 1,
              opacity: 1,
            },
            { duration: 0.4 },
          ],
          [`#OverBanner`, { scale: 6, zIndex: 60 }, { duration: 0, at: 0.3 }],
          [`#OverBanner`, { opacity: 1 }, { duration: 0.3, at: 0.3 }],
        ]
        // @ts-ignore
        animate(sequence)
      }
      eneterAnimation()
    } else {
      const exitAnimation = async () => {
        const sequence = [
          [`.Overlay`, { opacity: 0, zIndex: 0 }, { duration: 0.4 }],
          [`.Overlay`, { scale: 0 }, { duration: 0.001, at: 0.3 }],
          [`#${newId}`, { scale: 0.4, opacity: 0 }, { duration: 0.4, at: 0.3 }],
          [`#${newId}`, { zIndex: 10 }, { duration: 0.001 }],
        ]
        // @ts-ignore
        await animate(sequence)
        safeToRemove()
      }
      exitAnimation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent, newId, isMd])

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape' && movie) {
        handleCardClose()
      }
    }
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleCardClose, movie])

  useEffect(() => {
    const overlay = document.querySelector('#OverBanner') as HTMLElement
    if (overlay && movie) {
      overlay.addEventListener('click', handleCardClose)
    }
    return () => {
      if (overlay) {
        overlay.removeEventListener('click', handleCardClose)
      }
    }
  }, [handleCardClose, movie])

  if (!movie) {
    return null
  }

  return (
    <>
      <div
        className="CardContainer fixed left-0 top-0 
          h-screen max-h-screen w-full max-w-[580px] bg-zinc-800
          md:left-1/2
          md:top-1/2 lg:h-auto lg:max-h-none lg:bg-inherit
        "
        id={id}
      >
        <div className="no-scrollbar Child overflow-auto rounded-lg lg:max-h-[590px]">
          <div className="flex justify-end">
            <div className="absolute top-0 m-2 flex h-6 w-6 transition-opacity">
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

          <div className="Info">
            <div className="flex w-full flex-col gap-2 bg-zinc-800 p-4 lg:gap-4">
              <ul className="flex gap-3 lg:mt-1">
                <li>
                  <Link
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200"
                    href={`/watch/${movie.id}`}
                  >
                    <Play className="h-6 w-6 fill-black stroke-black pl-0.5" />
                  </Link>
                </li>
                <Suspense fallback={<Spinner className="m-0.5" />}>
                  <FavoriteButton movie={movie} />
                </Suspense>
              </ul>
              <div className="flex flex-col gap-1 lg:gap-2 [&>p>span]:font-bold">
                <h4 className="mt-1 text-xl font-semibold lg:text-2xl">
                  {movie.title}
                </h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: movie.releaseDate?.includes(`${currentYear}`)
                      ? `<span class="text-orange-500 font-semibold">New</span> • ${movie.releaseDate}`
                      : `${movie.releaseDate}`,
                  }}
                />

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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Overlay id="OverBanner" />
    </>
  )
}

export function CardModalWrapper() {
  const movie = useAtomValue(movieAtom)
  return (
    <AnimatePresence>
      {movie?.id && <CardModal movie={movie} />}
    </AnimatePresence>
  )
}
