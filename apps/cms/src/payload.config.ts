import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Users } from './collections/Users'
import { Profile } from './globals/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
const allowedOrigins = [frontendURL, serverURL, 'http://127.0.0.1:5173', 'http://127.0.0.1:3001']

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    meta: {
      titleSuffix: '- Portfolio CMS'
    }
  },
  collections: [Users, Media, Projects, Skills],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./portfolio.db'
    }
  }),
  editor: lexicalEditor(),
  globals: [Profile],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  serverURL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
