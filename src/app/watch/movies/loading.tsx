import Spinner from '@/components/spinner'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="2xl" />
    </div>
  )
}
