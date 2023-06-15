import Navbar from '@/components/navbar'
import AddProfileForm from '@/components/client/add-profile-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Profile - Netlix',
  description:
    'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.',
}

export default function NewProfile() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-10 text-center text-5xl font-medium">Add profile</h1>
        <AddProfileForm />
      </main>
    </>
  )
}
