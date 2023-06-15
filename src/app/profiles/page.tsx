import Profiles from '@/components/server/profiles'
import Spinner from '@/components/spinner'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'My Profiles - Netlix',
  description:
    'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.',
}

export default function ProfilesPage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-semibold text-white lg:text-5xl">{`Who's watching Netlix?`}</h1>
      <Suspense fallback={<Spinner size="lg" />}>
        <Profiles />
      </Suspense>
    </main>
  )
}
