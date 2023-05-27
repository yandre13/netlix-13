import { NextRequest, NextResponse } from 'next/server'

// create user
export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 200,
    message: 'Hello World from test route',
    data: {
      content: 'Hello World',
    },
  })
}
