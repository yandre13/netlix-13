import { getUsers } from '@/lib/xata/users'
import { NextRequest, NextResponse } from 'next/server'

// create user
export async function GET(req: NextRequest) {
  // assuming your body has json data
  const users = await getUsers()
  return NextResponse.json({
    status: 200,
    message: 'User created successfully',
    data: users,
  })
}
