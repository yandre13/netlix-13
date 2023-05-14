'use client'
import type { Profile } from '@/lib/xata/users'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Suspense } from 'react'
import Spinner from './spinner'

async function getProfiles(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles?userId=${userId}`
  )
  const { data } = await res.json()

  return data as Profile[]
}

export default function MyProfiles() {
  const { userId, isSignedIn } = useAuth()

  if (!isSignedIn) {
    return null
  }

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">Who is watching?</h1>

      <Suspense fallback={<Spinner size="lg" />}>
        <Profiles userId={userId} />
      </Suspense>
    </>
  )
}

export function Profiles({ userId }: { userId: string }) {
  const { data } = useQuery({
    queryKey: ['profiles', userId],
    queryFn: () => getProfiles(userId),
    staleTime: Infinity,
  })

  return (
    <div className="mt-10 flex items-center justify-center gap-10">
      {data?.map((profile) => (
        <div
          key={profile.id}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={profile.picture || ''}
            alt="profile"
            width={200}
            height={200}
            className="h-44 w-44 rounded-md border-2 border-transparent object-cover"
          />
          <p className="mt-5 text-xl font-medium text-white">{profile.name}</p>
        </div>
      ))}
    </div>
  )
}
