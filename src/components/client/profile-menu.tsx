'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Search, Bell, LogOut } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { BasicDropdown } from '../dropdown'
import { Profile } from '@/lib/xata/users'

export default function ProfileMenu({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false)
  const { signOut } = useClerk()
  const router = useRouter()

  const menuItems = [
    {
      label: 'Change profile',
      onSelect: () => router.push('/profiles'),
    },
  ]
  const menuFooter = {
    label: 'Logout',
    onSelect: signOut,
    icon: <LogOut className="h-4 w-4" />,
  }
  const onOpenChange = () => setOpen(!open)

  // useEffect(() => {
  //   // because on first render profile is null, then gets from ls
  //   const getProfileFromLocalStorage = () => {
  //     const profile = localStorage.getItem('my-profile')
  //     return profile ? JSON.parse(profile) : null
  //   }
  //   const profile = getProfileFromLocalStorage()
  //   profile ? setProfile(profile) : router.push('/profiles')
  // }, [profile?.id, router, setProfile])

  console.log('Clients', profile.name)

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
        footer={menuFooter}
      />
    </div>
  )
}
