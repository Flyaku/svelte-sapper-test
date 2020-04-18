const routes_without_session =
[
	'/service-worker.js',
	'/service-worker-index.html'
];

export default async function sessionMiddleware (req, res, next)
{
// Static files
	if (req.method === 'GET' && req.url.startsWith('/client/'))
	{
		return next();
	}
	else if (routes_without_session.includes(req.url))
	{
		return next();
	}

	req.session = { };

	console.log('-> Received ' + req.method + ' on ' + req.url);

	console.log('sessionMiddleware');

// Récupération de l'utilisateur
	const users = (await req.db.collection('table-de-test')
	.find(
	{
		firstname: 'Vincent'
	})
	.toArray())
	.map(user => ({ ...user, _id: String(user._id) }));

	req.session.user = users[0];

	next();
}