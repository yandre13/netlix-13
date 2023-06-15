'use client'
import Spinner from '@/components/spinner'
import { ClerkLoaded, ClerkLoading, SignIn, SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginClient() {
  const [signup, setSignup] = useState(false)
  const searchParams = useSearchParams()
  const search = searchParams.get('signup')

  useEffect(() => {
    if (search === 'true') {
      setSignup(true)
    } else {
      setSignup(false)
    }
  }, [signup, search])

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <ClerkLoading>
        <Spinner />
      </ClerkLoading>
      <ClerkLoaded>
        {!signup && (
          <SignIn signUpUrl="/login?signup=true" redirectUrl="/profiles" />
        )}
        {signup && <SignUp signInUrl="/login" redirectUrl="/profiles" />}
      </ClerkLoaded>
    </div>
  )
}
