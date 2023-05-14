'use client'
import Spinner from '@/components/spinner'
import { ClerkLoaded, ClerkLoading, SignIn, SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const images = {
  logo: `${process.env.NEXT_PUBLIC_IMAGES_URL}/applogo.png`,
  hero: `${process.env.NEXT_PUBLIC_IMAGES_URL}/hero.jpg`,
}

export default function LoginPage() {
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
    <main className="login relative flex min-h-screen w-full flex-col items-center justify-center">
      <Image
        src={images.hero}
        alt="hero"
        width={1920}
        height={1080}
        className="fixed inset-0 min-h-screen w-full object-cover brightness-50"
      />
      <div className="absolute left-0 top-0 flex h-24 w-full items-center">
        <Link href="/" className="left-0 top-0 ml-[3%]">
          <Image
            src={images.logo}
            alt="logo"
            width={120}
            height={38}
            className="object-cover"
          />
        </Link>
      </div>
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
    </main>
  )
}
