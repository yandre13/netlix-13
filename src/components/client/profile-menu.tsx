'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, LogOut } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { BasicDropdown } from '../dropdown'

import useCookie from '@/hooks/useCookie'
import type { ProfileProps } from '@/db/schema'

export default function ProfileMenu({
  profileSsr,
}: {
  profileSsr: ProfileProps
}) {
  const [open, setOpen] = useState(false)
  const { signOut } = useClerk()
  const router = useRouter()
  const { value: profile } = useCookie<ProfileProps>('my-profile', profileSsr)

  const menuItems = [
    {
      label: 'Change profile',
      onSelect: () => router.push('/profiles'),
    },
    {
      label: 'New profile',
      onSelect: () => router.push('/profiles/new'),
    },
  ]
  const menuFooter = {
    label: 'Logout',
    onSelect: signOut,
    icon: <LogOut className="h-4 w-4" />,
  }
  const onOpenChange = () => setOpen(!open)

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
        footer={menuFooter}
      />
    </div>
  )
}
