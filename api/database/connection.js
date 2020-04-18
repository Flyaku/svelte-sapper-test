import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';

const db_name = 'sapper-db';

const client = new MongoClient(url);

// Connexion à la base de données et récupération de l'instance
export async function getDB ()
{
	await client.connect();

	const db = client.db(db_name);

	return db;
}

export function closeConnection ()
{
	console.log('closing connection');

	client.close();
}