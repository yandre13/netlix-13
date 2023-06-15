import { headers } from 'next/headers'
import ProfileButton from '../client/profile-button'
import { getProfiles } from '@/db/functions/profiles'
import { redirect } from 'next/navigation'

async function getMyProfiles() {
  const headersList = headers()
  const userId = JSON.parse(headersList.get('x-user')!) //middleware will set this header
  let data = await getProfiles(userId)

  const maxWaitTime = 4000 // max wait time in milliseconds
  const checkInterval = 1000 // interval between checks in milliseconds
  let elapsedTime = 0 // elapsed time in milliseconds

  while (data?.length === 0 && elapsedTime < maxWaitTime) {
    await new Promise((resolve) => setTimeout(resolve, checkInterval)) // Espera el intervalo de verificación
    elapsedTime += checkInterval
    data = await getProfiles(userId)
  }

  if (data?.length === 0) {
    // Realiza la acción deseada si no se ha obtenido la data después del tiempo máximo de espera
    redirect('/')
  }

  return data
}

const Profiles = async function Profiles() {
  // const { data } = useProfiles({ userId })
  // const setProfile = useSetAtom(profileAtom)
  // const router = useRouter()
  const data = await getMyProfiles()
  // const favs = getFavoriteMovies() // when changing profile wont work, I prefer to use CSR

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
