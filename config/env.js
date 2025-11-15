// Import the 'config' function from dotenv package
import { config } from "dotenv";


// Call config() with an object to tell it WHICH .env file to load
// Example: .env.development.local or .env.production.local
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});


// Export PORT so other files can use it
// This is a shortcut for:
// export const PORT = process.env.PORT;
export const { 
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV,
    QSTASH_TOKEN, QSTASH_URL,
    SERVER_URL,
    EMAIL_PASSWORD,
} = process.env;  