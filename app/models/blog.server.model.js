'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please add a title',
		trim: true
	},
    body: {
        type: String,
        default: '',
        required: 'Please add the body of your article.',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Blog', BlogSchema);