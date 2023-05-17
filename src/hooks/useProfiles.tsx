import { Profile } from '@/lib/xata/users'
import { useQuery } from '@tanstack/react-query'

async function getProfiles(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles?userId=${userId}`
  )
  const { data } = await res.json()

  return data as Profile[]
}

export default function useProfiles({ userId }: { userId: string }) {
  const query = useQuery({
    queryKey: ['profiles', userId],
    queryFn: () => getProfiles(userId),
    staleTime: Infinity,
  })
  return query
}
