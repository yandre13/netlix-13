import MyProfiles from '@/components/profiles'

const images = {
  profileDefault: `${process.env.NEXT_PUBLIC_IMAGES_URL}/profile-blue.png`,
}

export default function ProfilesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <MyProfiles />
    </main>
  )
}
