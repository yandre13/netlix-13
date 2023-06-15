'use client'

import useFavorites from '@/hooks/queries/useFavorites'
import useCookie from '@/hooks/useCookie'
// Default theme
import type { ProfileProps } from '@/db/schema'
import Carousel from '../carousel'

export default function FavoritesList() {
  const { value: profile } = useCookie<ProfileProps>('my-profile')
  const { data, error } = useFavorites({ profileId: profile?.id! })

  if (data?.length === 0) return null

  return (
    <div className="py-8">
      <h1 className="container mb-6 text-xl font-semibold lg:text-2xl">
        My list ⭐
      </h1>
      <Carousel movies={data || []} />
    </div>
  )
}
