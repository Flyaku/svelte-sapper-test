import * as sapper from '@sapper/server'

import compression from 'compression'
import connect     from 'connect-mongo'
import session     from 'express-session'
import express     from 'express'
import uniqid      from 'uniqid'
import sirv        from 'sirv'

import { initDB } from '../api/database/connection'

const MongoStore = connect(session);

const { PORT, NODE_ENV } = process.env;

const dev = NODE_ENV !== 'production';

const secret = 'JcbA5XFESJUvqmFU6xhAEP57VHLQMBbuW6Q8bZiyzF3D38JpfnAAgGZhjgpz';

(async function server ()
{
	const [db, client] = await initDB();

	express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		session(
		{
			secret: secret,

			cookie:
			{
				path: '/',
				httpOnly: true,
				secure: false,
				maxAge: null,
				sameSite: true,
				proxy: false
			},

			store: new MongoStore(
			{
				client: client,
				dbName: 'sapper-db'
			}),

			genid: req => uniqid(),

			resave: true,
			saveUninitialized: true
		}),
		sapper.middleware(
		{
			session: function (req, res)
			{
				console.log('session ?', req.session.user);

				return (req.session || { }).user || { };
			}
		})
	)
	.listen(PORT, function (error)
	{
		if (error)
		{
			console.log(error);

			client.close();
		}
	});
})();