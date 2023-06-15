import Image from 'next/image'
import Link from 'next/link'
import LoginClient from '@/components/client/login'
import { Metadata } from 'next'

const images = {
  logo: `${process.env.NEXT_PUBLIC_IMAGES_URL}/applogo.png`,
  hero: `${process.env.NEXT_PUBLIC_IMAGES_URL}/hero.jpg`,
}

export const metadata: Metadata = {
  title: 'Login - Netlix',
  description:
    'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.',
}

export default function LoginPage() {
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
      <LoginClient />
    </main>
  )
}
