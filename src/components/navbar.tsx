import { BasicDropdown } from './dropdown'
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronDown, Search, Bell } from 'lucide-react'
import { cookies } from 'next/headers'
import { Profile } from '@/lib/xata/users'
import ProfileMenu from './client/profile-menu'

const items = [
  {
    label: 'Home',
  },
  {
    label: 'Series',
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

export default function Navbar() {
  const cookiesList = cookies()
  const profile: Profile = JSON.parse(cookiesList.get('my-profile')?.value!) //middleware will set this cookie

  // console.log('Servers', profile.name)
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
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
            {/* <Suspense fallback={<Spinner />}> */}
            <ProfileMenu profileSsr={profile} />
            {/* </Suspense> */}
          </div>
        </section>
      </header>
    </>
  )
}
