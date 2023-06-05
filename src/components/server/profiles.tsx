import { headers } from 'next/headers'
import ProfileButton from '../client/profile-button'
import { getProfiles } from '@/lib/prisma/user'
import { getFavoriteMovies } from '@/lib/prisma/favoritesMovies'

async function getMyProfiles() {
  const headersList = headers()
  const userId = JSON.parse(headersList.get('x-user')!) //middleware will set this header
  // console.log({ userId })
  const data = await getProfiles(userId)
  // console.log({ data })
  return data
}

const Profiles = async function Profiles() {
  // const { data } = useProfiles({ userId })
  // const setProfile = useSetAtom(profileAtom)
  // const router = useRouter()
  const data = await getMyProfiles()
  // const favs = getFavoriteMovies() // when changing profile wont work, I prefer to use CSR
  console.log({ daa: data })

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:mt-12 lg:gap-8">
      {data.map((profile) => (
        <div
          key={profile.id}
          className="flex flex-col items-center justify-center"
        >
          <ProfileButton picture={profile.picture} profile={profile} />
          <p className="mt-5 text-xl font-medium text-white">{profile.name}</p>
        </div>
      ))}
    </div>
  )
} as unknown as () => JSX.Element

export default Profiles
