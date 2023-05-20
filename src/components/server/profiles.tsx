import { Profile, getProfiles as callApi } from '@/lib/xata/users'
import { headers } from 'next/headers'
import ProfileButton from '../client/profile-button'

async function getProfiles() {
  // await 3s
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const headersList = headers()
  const userId = JSON.parse(headersList.get('x-user')!) //middleware will set this header
  // console.log({ userId })
  const data = await callApi(userId)
  // console.log({ data })

  return data as Profile[]
}

const Profiles = async function Profiles() {
  // const { data } = useProfiles({ userId })
  // const setProfile = useSetAtom(profileAtom)
  // const router = useRouter()
  const data = await getProfiles()
  // console.log({ daa: data })

  return (
    <div className="mt-10 flex items-center justify-center gap-10">
      {data.map((profile) => (
        <div
          key={profile.id}
          className="flex flex-col items-center justify-center"
        >
          <ProfileButton
            picture={profile.picture}
            profile={JSON.stringify(profile)}
          />
          <p className="mt-5 text-xl font-medium text-white">{profile.name}</p>
        </div>
      ))}
    </div>
  )
} as unknown as () => JSX.Element

export default Profiles
