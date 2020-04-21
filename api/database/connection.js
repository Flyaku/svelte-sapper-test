import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';

const db_name = 'sapper-db';

const client = new MongoClient(url, { useUnifiedTopology: true });

let db;

// Connexion à la base de données et récupération de l'instance
export async function initDB ()
{
	await client.connect();

	db = client.db(db_name);

	return Promise.resolve([db, client]);
}

export function getDB ()
{
	return db;
}