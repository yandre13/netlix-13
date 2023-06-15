'use client'
import useCookie from '@/hooks/useCookie'
import type { ProfileProps } from '@/db/schema'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProfileButton({
  picture,
  name = 'profile',
  profile,
}: {
  picture: string
  name?: string
  profile: ProfileProps
}) {
  const router = useRouter()
  const { write } = useCookie('my-profile')

  return (
    <button
      className="rounded-md transition-all ease-in-out hover:scale-105 focus:ring-1 focus:ring-white focus:ring-offset-2"
      // href="/watch"
      onClick={() => {
        // setProfile(profile)
        write(profile)
        // console.log('setting', { profile })
        router.push('/watch')
        // router.refresh()
      }}
    >
      <Image
        src={picture}
        alt={name}
        width={200}
        height={200}
        className="h-28 w-28 rounded-md border-2 border-transparent object-cover lg:h-44 lg:w-44"
      />
    </button>
  )
}
