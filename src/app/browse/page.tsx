import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold">Hello Bowser</h1>
      <div>{/* <UserButton /> */}</div>
    </main>
  )
}
