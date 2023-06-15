'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const profileImages = [
  'https://dr66lyt7li8ja.cloudfront.net/public/profile-blue.png',
  'https://dr66lyt7li8ja.cloudfront.net/public/profile-red.png',
  'https://dr66lyt7li8ja.cloudfront.net/public/profile-green.png',
]

const getRandomPic = () => {
  return profileImages[Math.floor(Math.random() * profileImages.length)]
}
export default function AddProfileForm() {
  const [picture, setPicture] = useState(getRandomPic())
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // get name and current picture
    // @ts-ignore
    const name = e.currentTarget.name.value
    if (name) {
      fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, picture }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          router.refresh()
          router.push('/profiles')
        })
        .catch((err) => {
          console.log(err)
          //TODO: should be error page
          router.push('/profiles')
        })
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <form
      className="flex flex-col gap-8 rounded-[0.5rem] border bg-background p-8 shadow-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-6">
        <div
          className="cursor-pointer"
          onClick={() => {
            setPicture(getRandomPic())
          }}
        >
          <img
            src={picture}
            alt="profile image"
            width={128}
            height={128}
            className="overflow-hidden rounded-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">Click to change</p>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Ex: Jhon doe" />
          <p className="text-sm text-muted-foreground">
            Enter your name for this profile.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Button type="submit">Continue</Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
