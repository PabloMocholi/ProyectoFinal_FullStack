
/**---------------------------------------- 
 * API EXPRESS
 * 
 * Configuraciones de las variables de entorno para poder 
 * acceder a la BBDD de Mongo
 * 
--------------------------------------------*/
import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 8080

export const domain = process.env.DOMAIN ||  "http://localhost"

export const fullDomain = `${domain}:${PORT}`
/*
export const DB_USER = process.env.DB_USER 
export const DB_PASS = process.env.DB_PASS
export const DB_DB = process.env.DB_DB */
export const DB_MONGO = process.env.DB_MONGO
export const DIR_PUBLIC = process.env.DIR_PUBLIC