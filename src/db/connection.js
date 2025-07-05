// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
config({ path: ".env" }); // Load environment variables from .env.local

const dburl = process.env.DATABASE_URL;
if (!dburl) {
	throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const pgclient = postgres(dburl, {
	maxPoolSize: 10, // Adjust the pool size as needed
	idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
	connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

const db = drizzle({client:pgclient});
console.log("Database connection established successfully.");

export { db };