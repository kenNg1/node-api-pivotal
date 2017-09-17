const Event = require('../models').Event;
const User = require('../models').User;
// const Comment = require('../models').Comment;

module.exports = {
	create(req, res){
		return Event
			.create({
				// post_type	: (!req.body.post_type ? 'post' : req.body.post_type),
				name: req.body.name,
				description: req.body.description,
				level: req.body.level,
				intensity: req.body.intensity,
				terrain: req.body.terrain,
				min_ppl: req.body.min_ppl,
				max_ppl: req.body.max_ppl,
				price: req.body.price,
				sportswear: req.body.sportswear,
				gear: req.body.gear,
				org_description: req.body.org_description,
				org_website: req.body.org_website,
				imageUpload: req.body.imageUpload,
				videoUpload: req.body.videoUpload,
				date: req.body.date,
				time: req.body.time,
				address: req.body.address,
				user_id		: req.decoded.user
				
			})
			.then(event => res.status(200).send(event))
			.catch(error => res.status(400).send(error));
	},

	update(req, res){
		return Event
			.findById(req.params.eventId)
			.then(
				event => {
					if(!event) return res.status(404).send({message: "Event Not Found![2]"});

					return post
						.update(req.body, { fields: Object.keys(req.body) })
						.then( updateEvent => res.status(200).send({ message: "Event has been Updated!" }) )
						.catch( errorUpdate => res.status(400).send(errorUpdate) );
				}
			)
			.catch( error => res.status(404).send({ message: "Event Not Found![1]" }) );
	},

	destroy(req, res){
		return Event
			.findById(req.params.eventId)
			.then(
				event => {
					if(!event) return res.status(404).send({message: "Event Not Found![2]"});

					return event
						.destroy()
						.then( deleteEvent => res.status(200).send({ message: "Event has been Deleted!" }) )
						.catch( errorDelete => res.status(400).send(errorDelete) );
				}
			)
			.catch( error => res.status(404).send({ message: "Event Not Found![1]" }) );
	},

	index(req, res){
		return Event
			.findAll()
			.then( event => res.status(200).send(event) )
			.catch( error => res.status(400).send(error) );
	},

	show(req, res){
		return Event
			.findById(req.params.eventId, {
				include: [{ model: User, as: 'User' }]
			})
			.then(
				event => {
					if(!event) return res.status(404).send({ message: "Event Not Found!" });

					return res.status(200).send(event);
				}
			)
			.catch( error => res.status(404).send({ message: "Event Not Found!" }) );
	}
};