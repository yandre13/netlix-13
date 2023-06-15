'use client'
import { UserButton, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomeClient() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/browse')
    }
    {
      router.push('/login')
    }
  }, [isSignedIn, router])

  return (
    <div className="self-end pr-8">
      <UserButton />
    </div>
  )
}
