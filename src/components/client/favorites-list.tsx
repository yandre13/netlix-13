'use client'

import useFavorites from '@/hooks/queries/useFavorites'
import useCookie from '@/hooks/useCookie'
// Default theme
import { Movie, Profile } from '@prisma/client'
import MoviesList from './movies-list'
import Carousel from '../carousel'

export default function FavoritesList() {
  const { value: profile } = useCookie<Profile>('my-profile')
  const { data, error } = useFavorites({ profileId: profile?.id! })

  console.log({ error, data })

  if (data?.length === 0) return null

  return (
    <div className="py-8">
      <h1 className="mb-6 text-2xl font-semibold">My list ⭐</h1>
      <Carousel movies={data || []} />
    </div>
  )
}
