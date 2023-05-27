import { prismaDb } from '@/lib/prisma'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// create user
export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({
      status: 400,
      message: 'No body',
    })
  }
  // assuming your body has json data
  const body: WebhookEvent = await req.json()

  if (body.type === 'user.created') {
    // console.log({ data: body.data })
    const {
      id,
      first_name,
      last_name,
      image_url,
      email_addresses: [{ email_address }],
      username,
    } = body.data
    const name = last_name ? `${first_name} ${last_name}` : first_name

    try {
      const newUser = await prismaDb.user.create({
        data: {
          id,
          name,
          email: email_address,
          username,
          picture: image_url,
          profiles: {
            create: {
              name: username,
              picture:
                'https://dr66lyt7li8ja.cloudfront.net/public/profile-blue.png',
            },
          },
        },
      })

      // console.log({ newUser })

      // console.log({ newProfile })

      return NextResponse.json({
        status: 201,
        message: 'User created successfully',
        data: {
          user: newUser,
        },
      })
    } catch (error) {
      console.log({ error })
      return NextResponse.json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
