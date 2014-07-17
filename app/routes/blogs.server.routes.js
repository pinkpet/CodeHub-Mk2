'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var blogs = require('../../app/controllers/blogs');

	// Blogs Routes
	app.route('/blogs')
		.get(blogs.list)
		.post(blogs.create);

	app.route('/blogs/:blogId')
		.get(blogs.read)
		.put(blogs.update)
		.delete(blogs.delete);

	// Finish by binding the Blog middleware
	app.param('blogId', blogs.blogByID);
};