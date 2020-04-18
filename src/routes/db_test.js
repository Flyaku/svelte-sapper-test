import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';

const db_name = 'sapper-db';

const client = new MongoClient(url);

// Connexion à la base de données et récupération de l'instance
async function getDB ()
{
	await client.connect();

	const db = client.db(db_name);

	return db;
}

export async function getUsers ()
{
	const db = await getDB();

	// Insertion d'un document
	const results = await db.collection('table-de-test')
	.find(
	{
		firstname : 'Vincent'
	})
	.toArray(res => res);

	console.log(results);

// Fermeture de la connexion
	client.close();
}

getUsers();