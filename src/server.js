import * as sapper from '@sapper/server'

import compression from 'compression'
import sirv        from 'sirv'
import polka       from 'polka'

import { getDB, closeConnection } from '../api/database/connection'

import session from '../api/middleware/session'

const { PORT, NODE_ENV } = process.env;

const dev = NODE_ENV !== 'production';

(async function server ()
{
	const db = await getDB();

	polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		function (req, res, next)
		{
			req.db = db;

			return next();
		},
		session,
		sapper.middleware(
		{
			session: function (req, res)
			{
				console.log('session ?', req.session);

				return req.session || { };
			}
		})
	)
	.listen(PORT, function (error)
	{
		if (error)
		{
			console.log('error', error);

			closeConnection();
		}
	});
})();