import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { config } from 'dotenv'
import * as schema from './schema'

config()
// create database connection
const connection = postgres(`${process.env.DATABASE_URL}`, {
  ssl: 'require',
  max: 1,
})

export const db = drizzle(connection, { schema })
