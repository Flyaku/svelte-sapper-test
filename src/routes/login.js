export async function post (req, res, next)
{
	let user = { name: 'test' };

	req.session.user = { ...user };

	return res.send({ success: true });
}