import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-4 md:py-6">
        <small className="text-sm text-white">
          &copy; {new Date().getFullYear()} Made with{' '}
          <Heart className="inline-block h-4 w-4 fill-red-500 text-red-500" />{' '}
          by Yaser.
        </small>
      </div>
    </footer>
  )
}
