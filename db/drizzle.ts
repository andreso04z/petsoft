import "dotenv/config";
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const dbFileName = process.env.DB_FILE_NAME;

if (!dbFileName) {
	throw new Error('DB_FILE_NAME is not set. Add it to your .env file.');
}

const sqlite = new Database(dbFileName);
const db = drizzle({ client: sqlite });

export { db, sqlite };