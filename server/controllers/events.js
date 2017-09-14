const Event = require('../models').Event;
const User = require('../models').User;
// const Comment = require('../models').Comment;

module.exports = {
	create(req, res){
		return Event
			.create({
				name		: req.body.name,
				description	: req.body.description,
				// short_desc 	: req.body.short_desc,
				// content_post: req.body.content_post,
				// post_type	: (!req.body.post_type ? 'post' : req.body.post_type),
				user_id		: req.decoded.user
			})
			.then(post => res.send(200, post))
			.catch(error => res.send(400, error));
	},

	update(req, res){
		return Event
			.findById(req.params.postId)
			.then(
				post => {
					if(!post) return res.send(404, {message: "Event Not Found![2]"});

					return post
						.update(req.body, { fields: Object.keys(req.body) })
						.then( updateEvent => res.send(200, { message: "Event has been Updated!" }) )
						.catch( errorUpdate => res.send(400, errorUpdate) );
				}
			)
			.catch( error => res.send(404, { message: "Event Not Found![1]" }) );
	},

	destroy(req, res){
		return Event
			.findById(req.params.postId)
			.then(
				post => {
					if(!post) return res.send(404, {message: "Event Not Found![2]"});

					return post
						.destroy()
						.then( deleteEvent => res.send(200, { message: "Event has been Deleted!" }) )
						.catch( errorDelete => res.send(400, errorDelete) );
				}
			)
			.catch( error => res.send(404, { message: "Event Not Found![1]" }) );
	},

	index(req, res){
		return Event
			.findAll()
			.then( post => res.send(200, post) )
			.catch( error => res.send(400, error) );
	},

	show(req, res){
		return Event
			.findById(req.params.postId, {
				include: [{ model: Comment, as: 'EventComment' }]
			})
			.then(
				post => {
					if(!post) return res.send(404, { message: "Event Not Found!" });

					return res.send(200, post);
				}
			)
			.catch( error => res.send(404, { message: "Event Not Found!" }) );
	}
};