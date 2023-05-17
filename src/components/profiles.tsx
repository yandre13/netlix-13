'use client'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { Suspense } from 'react'
import Spinner from './spinner'
import useProfiles from '@/hooks/useProfiles'
import { useSetAtom } from 'jotai'
import { profileAtom } from '@/utils/atoms'
import { useRouter } from 'next/navigation'

export default function MyProfiles() {
  const { userId, isSignedIn } = useAuth()

  if (!isSignedIn) {
    return null
  }

  return (
    <>
      <h1 className="text-5xl font-semibold text-white">{`Who's watching Netlix?`}</h1>
      <Suspense fallback={<Spinner size="lg" />}>
        <Profiles userId={userId} />
      </Suspense>
    </>
  )
}

export function Profiles({ userId }: { userId: string }) {
  const { data } = useProfiles({ userId })
  const setProfile = useSetAtom(profileAtom)
  const router = useRouter()

  return (
    <div className="mt-10 flex items-center justify-center gap-10">
      {data?.map((profile) => (
        <div
          key={profile.id}
          className="flex flex-col items-center justify-center"
        >
          <button
            className="rounded-md transition-all ease-in-out hover:scale-105 focus:ring-1 focus:ring-white focus:ring-offset-2"
            onClick={() => {
              setProfile(profile)
              router.push('/watch')
            }}
          >
            <Image
              src={profile.picture || ''}
              alt="profile"
              width={200}
              height={200}
              className="h-44 w-44 rounded-md border-2 border-transparent object-cover"
            />
          </button>
          <p className="mt-5 text-xl font-medium text-white">{profile.name}</p>
        </div>
      ))}
    </div>
  )
}
