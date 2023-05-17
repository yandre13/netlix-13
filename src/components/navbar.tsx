'use client'

import { BasicDropdown } from './dropdown'
import { Suspense, useEffect, useState } from 'react'
import Spinner from './spinner'
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronDown, Search, Bell, LogOut } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAtom, useAtomValue } from 'jotai'
import { profileAtom } from '@/utils/atoms'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'

const items = [
  {
    label: 'Home',
    onSelect: () => {},
  },
  {
    label: 'Series',
    onSelect: () => {},
  },
  {
    label: 'Films',
  },
  {
    label: 'New & Popular',
  },
  {
    label: 'My List',
  },
  {
    label: 'Watch Again',
  },
]
const images = {
  logo: `${process.env.NEXT_PUBLIC_IMAGES_URL}/applogo.png`,
  hero: `${process.env.NEXT_PUBLIC_IMAGES_URL}/hero.jpg`,
}

const menuItems = [
  {
    label: 'Change profile',
  },
]
const menuFooter = (onSelect: () => void) => ({
  label: 'Logout',
  onSelect,
  icon: <LogOut className="h-4 w-4" />,
})

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const onOpenChange = () => setOpen(!open)
  const router = useRouter()
  const profile = useAtomValue(profileAtom)
  const { signOut } = useClerk()

  useEffect(() => {
    if (!profile) {
      router.push('/profiles')
    }
  }, [profile, router])

  if (!profile) {
    return null
  }

  return (
    <div className="relative overflow-hidden">
      <BasicDropdown
        button={
          <div className="flex items-center gap-2" role="button">
            <Image
              src={profile.picture}
              alt="Profile picture"
              width={72}
              className="h-9 w-9 rounded-sm"
              height={72}
            />
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', {
                'rotate-180 transform': open,
              })}
            />
          </div>
        }
        customClass="w-auto"
        alignContent="end"
        onOpenChange={onOpenChange}
        header={profile.name}
        items={menuItems}
        footer={menuFooter(signOut)}
      />
    </div>
  )
}

export default function Navbar() {
  return (
    <>
      <header className="fixed inset-x-0 top-0">
        <section className="container flex h-[88px] items-center gap-6 py-2 lg:gap-8">
          <div>
            <Image
              src={images.logo}
              alt="logo"
              width={120}
              height={38}
              className="h-[24px] w-20 object-cover md:h-auto md:w-auto"
            />
          </div>
          <nav className="flex w-full flex-1">
            <ul className="hidden items-center gap-0.5 py-6 md:flex lg:gap-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <a className="mr-4 text-white" href="#">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="md:hidden">
              <BasicDropdown
                button={
                  <Button variant="ghost" className="focus-visible:ring-0">
                    <span>Browse</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                }
                items={items}
                customClass="w-auto"
                alignContent="start"
              />
            </div>
          </nav>
          <div className="flex items-center gap-6">
            <div role="button">
              <Search className="h-5 w-5" />
            </div>
            <div role="button">
              <Bell className="h-5 w-5" />
            </div>
            <Suspense fallback={<Spinner />}>
              <ProfileMenu />
            </Suspense>
          </div>
        </section>
      </header>
    </>
  )
}
