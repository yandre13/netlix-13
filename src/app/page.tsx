import { Metadata } from 'next'
import Footer from '@/components/footer'
import HomeClient from '@/components/client/home'

export const metadata: Metadata = {
  title: 'Netlix Perú',
  description:
    'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.',
}

export default function Home() {
  return (
    <>
      <main className="container flex h-screen flex-col items-center justify-center py-16">
        <h1 className="text-center text-4xl font-bold text-white">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="mt-6 text-center text-white">
          Watch anywhere. Cancel anytime.
        </p>
        <HomeClient />
      </main>
      <Footer />
    </>
  )
}
