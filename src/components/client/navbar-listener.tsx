'use client'

import { useEffect, useRef } from 'react'

export default function NavbarListener() {
  const navbarRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ref = document.querySelector('#HeaderId')! as HTMLElement
    navbarRef.current = ref
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      if (navbarRef.current) {
        if (position > 0) {
          navbarRef.current.classList.add('NavbarOpen')
        } else {
          navbarRef.current.classList.remove('NavbarOpen')
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
