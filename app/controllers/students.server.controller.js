'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Student = mongoose.model('Student'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Student already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Student
 */
exports.create = function(req, res) {
	var student = new Student(req.body);
	student.user = req.user;

	student.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(student);
		}
	});
};

/**
 * Show the current Student
 */
exports.read = function(req, res) {
	res.jsonp(req.student);
};

/**
 * Update a Student
 */
exports.update = function(req, res) {
	var student = req.student ;

	student = _.extend(student , req.body);

	student.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(student);
		}
	});
};

/**
 * Delete an Student
 */
exports.delete = function(req, res) {
	var student = req.student ;

	student.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(student);
		}
	});
};

/**
 * List of Students
 */
exports.list = function(req, res) { Student.find().sort('-created').populate('user', 'displayName').exec(function(err, students) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(students);
		}
	});
};

/**
 * Student middleware
 */
exports.studentByID = function(req, res, next, id) { Student.findById(id).populate('user', 'displayName').exec(function(err, student) {
		if (err) return next(err);
		if (! student) return next(new Error('Failed to load Student ' + id));
		req.student = student ;
		next();
	});
};

/**
 * Student authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.student.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};