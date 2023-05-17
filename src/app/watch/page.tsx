import Navbar from '@/components/navbar'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container">
      <Navbar />
    </main>
  )
}
