'use client'

import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function ProfileButton({
  picture,
  name = 'profile',
  profile,
}: {
  picture: string
  name?: string
  profile: string
}) {
  const router = useRouter()

  return (
    <button
      className="rounded-md transition-all ease-in-out hover:scale-105 focus:ring-1 focus:ring-white focus:ring-offset-2"
      // href="/watch"
      onClick={() => {
        // setProfile(profile)
        Cookies.set('my-profile', profile)
        // console.log('setting', { profile })
        router.push('/watch')
        router.refresh()
      }}
    >
      <Image
        src={picture}
        alt={name}
        width={200}
        height={200}
        className="h-44 w-44 rounded-md border-2 border-transparent object-cover"
      />
    </button>
  )
}
