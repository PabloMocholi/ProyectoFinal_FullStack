import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000

export const domain = process.env.DOMAIN ||  "http://localhost"

export const fullDomain = `${domain}:${PORT}`