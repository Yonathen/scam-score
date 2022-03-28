import dotenv from "dotenv"

dotenv.config()

export const publicConfig = {
    host: process.env.HOST || 'localhost',
    dialect: process.env.DIALECT || 'postgres',
    db: process.env.DATABASE || 'scamscore',
    db_user: process.env.DATABASE_USER || 'root',
    db_password: process.env.DATABASE_PASSWORD || 'root',
    port: process.env.PORT || 3000,
    virusTotalURL: process.env.VIRUS_TOTAL_URL || 'https://www.virustotal.com/api/v3/urls',
    virusTotalApiKey: process.env.VIRUS_TOTAL_API_KEY || ''

}