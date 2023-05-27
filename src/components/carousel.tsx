'use client'

import { motion, useAnimate } from 'framer-motion'
import Image from 'next/image'

import { Splide, SplideSlide } from '@splidejs/react-splide'
// Default theme
import '@splidejs/react-splide/css'
import { ArrowDown, Play, Plus, X } from 'lucide-react'
import { Movie } from '@prisma/client'
import useAddFavorite from '@/hooks/mutations/useAddFavorite'
import useRemoveFavorite from '@/hooks/mutations/useRemoveFavorite'
import { useRef } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { modalMovieAtom } from '@/utils/atoms'

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

const MAX_PER_VIEW = 4

type MovieWithFavorite = Movie & { isFavorite?: boolean }

export default function Carousel({ movies }: { movies: MovieWithFavorite[] }) {
  const [scope, animate] = useAnimate()
  const splideRef = useRef(null)
  const { mutate: mutateAdd, error: errorAdd } = useAddFavorite()
  const { mutate: mutateRemove, error: errorRemove } = useRemoveFavorite()
  const modalMovie = useAtomValue(modalMovieAtom)
  // @ts-ignore
  const parent = splideRef.current?.splideRef?.current

  const handleHover = (id: string) => {
    if (parent) animate(parent, { zIndex: 10 }, { duration: 0 })
    const animationCard = animate(
      `#${id}`,
      {
        scale: 1.4,
        zIndex: 10,
      },
      { duration: 0.4, delay: 1 }
    )
    if (modalMovie?.id) {
      console.log('stoped')
      animate(
        `#${id}`,
        {
          scale: 1.8,
          zIndex: 10,
        },
        { duration: 0.4, delay: 0 }
      )
    }
    animate(
      `#${id} .Info`,
      {
        display: 'flex',
      },
      { duration: 0, delay: 1 }
    )
    animate(`#${id} .Info`, { opacity: 1 }, { duration: 0.4, delay: 1 })
  }
  const handleLeave = (id: string) => {
    if (!modalMovie?.id) {
      animate(
        `#${id}`,
        {
          scale: 1,
          zIndex: 0,
        },
        { duration: 0.3 }
      )
      animate(
        `#${id} .Info`,
        {
          opacity: 0,
        },
        { duration: 0.3 }
      )
      animate(
        `#${id} .Info`,
        {
          display: 'none',
        },
        { duration: 0, delay: 0.3 }
      )
      if (parent) animate(parent, { zIndex: 0 }, { duration: 0, delay: 0.3 })
    }
  }

  const handleOpenModal = (id: string) => {
    // const top = parent.getBoundingClientRect().top
    // animate(
    //   `#${id}-container`,
    //   {
    //     position: 'fixed',
    //     top: `-${top}px`,
    //     left: '0',
    //     height: '100vh',
    //     width: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
    //   { duration: 0 }
    // )
    // animate(
    //   `#${id}`,
    //   {
    //     scale: 2,
    //     // zIndex: 10,
    //     backgroundColor: 'red',
    //   },
    //   { duration: 0.4 }
    // )
    // animate(
    //   `#${id} .Info`,
    //   {
    //     display: 'flex',
    //   },
    //   { duration: 0, delay: 1 }
    // )
    // animate(`#${id} .Info`, { opacity: 1 }, { duration: 0 })
  }

  if (movies.length < 1) return null
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
        ref={splideRef}
        // onMounted={async () => {
        //   //wait 2 seconds
        //   await new Promise((resolve) => setTimeout(resolve, 2000))
        //   handleHover(`card-1`)
        // }}
      >
        {movies.map((movie, index) => {
          return (
            <SplideSlide key={index}>
              <CardCarousel
                movie={movie}
                id={`card-${index + 1}`}
                mutateAdd={mutateAdd}
                mutateRemove={mutateRemove}
                handleHover={handleHover}
                handleLeave={handleLeave}
                handleOpenModal={handleOpenModal}
              />
            </SplideSlide>
          )
        })}
      </Splide>
    </div>
  )
}

function calculateTranslateX(element: HTMLElement | null) {
  if (!element) return 0
  const windowWidth = window.innerWidth
  const elementWidth = element?.getBoundingClientRect().width
  const offsetLeft = element?.getBoundingClientRect().left
  const translateX = windowWidth / 2 - elementWidth / 2 - offsetLeft

  return Math.round(translateX)
}

const selector = '.splide__slide'
const baseSelector = `${selector}.is-active`
const lastSelector = generateLastSelector(MAX_PER_VIEW, baseSelector, selector)
function CardCarousel({
  movie,
  id,
  mutateAdd,
  mutateRemove,
  handleHover,
  handleLeave,
  handleOpenModal,
}: {
  movie: MovieWithFavorite
  id: string
  mutateAdd: (id: string) => void
  mutateRemove: (id: string) => void
  handleHover: (id: string) => void
  handleLeave: (id: string) => void
  handleOpenModal: (id: string) => void
}) {
  const cardRef = useRef(null)
  const [modalMovie, setModalMovie] = useAtom(modalMovieAtom)

  const isFirst =
    cardRef.current ===
    (typeof document !== 'undefined'
      ? document?.querySelector(baseSelector)?.firstElementChild
          ?.firstElementChild
      : false)
  const isLast =
    cardRef.current ===
    (typeof document !== 'undefined'
      ? document?.querySelector(lastSelector)?.firstElementChild
          ?.firstElementChild
      : false)

  const origin = isFirst ? 'left' : isLast ? 'right' : 'center'
  const handleCardHover = () => {
    handleHover(id)
  }
  const handleCardLeave = () => {
    handleLeave(id)
  }

  console.log('render', modalMovie)

  return (
    <motion.div
      className="CardContainer"
      id={`${id}-container`}
      animate={{
        transform:
          modalMovie?.id === movie.id
            ? `translateX(${calculateTranslateX(cardRef.current)}px)`
            : 'none',
        // position: modalMovie?.id === movie.id ? 'fixed' : 'static',
        // width: modalMovie?.id === movie.id ? '100%' : 'auto',
        // display: modalMovie?.id === movie.id ? 'flex' : 'block',
        // alignItems: modalMovie?.id === movie.id ? 'center' : '',
        // justifyContent: modalMovie?.id === movie.id ? 'center' : '',
        // left: modalMovie?.id === movie.id ? '0' : '',
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <motion.div
        className="overflow-hidden rounded-lg"
        id={id}
        ref={cardRef}
        onMouseOver={handleCardHover}
        onMouseLeave={handleCardLeave}
        animate={{
          scale: modalMovie?.id === movie.id ? 1.6 : 1,
        }}
        style={{
          scale: modalMovie?.id === movie.id ? 1.6 : 1,
          transformOrigin: modalMovie?.id === movie.id ? 'center' : origin,
        }}
      >
        <Image
          src={movie.posterUrl}
          alt={movie.title}
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
              <button
                className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white"
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
                  <X className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4 fill-white" />
                )}
              </button>
            </li>
            <li>
              <button
                className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white"
                onClick={(e) => {
                  e.preventDefault()
                  setModalMovie(movie)
                  handleOpenModal(id)
                  const translateX = calculateTranslateX(cardRef.current)
                  console.log(translateX)
                }}
              >
                <ArrowDown className="h-4 w-4 fill-white" />
              </button>
            </li>
          </ul>
          <p
            className="mt-1 text-xs"
            dangerouslySetInnerHTML={{
              __html: movie.releaseDate?.includes(`${currentYear}`)
                ? `<span class="text-orange-500 font-semibold">New</span> • ${movie.releaseDate}`
                : `${movie.releaseDate}`,
            }}
          />
          <p>
            {movie.genres.map((genre, index) => {
              return (
                <span key={index} className="text-xs">
                  {genre}
                  {index + 1 !== movie.genres.length && ', '}
                </span>
              )
            })}
          </p>
          <p className="text-xs">{movie.duration}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
