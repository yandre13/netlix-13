import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // get userId from params
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: 'No userId',
    })
  }

  try {
    // const profiles = await getProfiles(userId)

    return NextResponse.json({
      status: 200,
      data: 'profiles',
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    })
  }
}
