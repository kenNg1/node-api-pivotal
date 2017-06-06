const Post = require('../models').Post;

module.exports = {
	create(req, res){
		return Post
			.create({
				title		: req.body.title,
				slug		: req.body.slug,
				short_desc 	: req.body.short_desc,
				content_post: req.body.content_post,
				post_type	: (!req.body.post_type ? 'post' : req.body.post_type),
				user_id		: req.decoded.user
			})
			.then(post => res.send(200, post))
			.catch(error => res.send(400, error));
	}
};