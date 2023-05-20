import Profiles from '@/components/server/profiles'
import Spinner from '@/components/spinner'
import { Suspense } from 'react'

const images = {
  profileDefault: `${process.env.NEXT_PUBLIC_IMAGES_URL}/profile-blue.png`,
}

export default function ProfilesPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-semibold text-white">{`Who's watching Netlix?`}</h1>
      <Suspense fallback={<Spinner size="lg" />}>
        <Profiles />
      </Suspense>
    </main>
  )
}
