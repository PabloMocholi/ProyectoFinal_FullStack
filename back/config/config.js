import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000

export const domain = process.env.DOMAIN ||  "http://localhost"

export const fullDomain = `${domain}:${PORT}`

export const DB_USER = process.env.DB_USER 
export const DB_PASS = process.env.DB_PASS
export const DB_DB = process.env.DB_DB 