/**
 * Created by Mel on 3/22/14.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Medication = mongoose.model('Medication'),
    _ = require('lodash');


/**
 * Find medication by id
 */
exports.medication = function(req, res, next, id) {
    Medication.load(id, function(err, medication) {
        if (err) return next(err);
        if (!medication) return next(new Error('Failed to load medication ' + id));
        req.medication = medication;
        next();
    });
};

/**
 * Create an medication
 */
exports.create = function(req, res) {
    var medication = new Medication(req.body);
    medication.user = req.user;

    medication.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                medication: medication
            });
        } else {
            res.jsonp(medication);
        }
    });
};

/**
 * Update an medication
 */
exports.update = function(req, res) {
    var medication = req.medication;

    medication = _.extend(medication, req.body);

    medication.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                medication: medication
            });
        } else {
            res.jsonp(medication);
        }
    });
};

/**
 * Delete an medication
 */
exports.destroy = function(req, res) {
    var medication = req.medication;

    medication.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                medication: medication
            });
        } else {
            res.jsonp(medication);
        }
    });
};

/**
 * Show an medication
 */
exports.show = function(req, res) {
    res.jsonp(req.medication);
};

/**
 * List of Medications
 */
exports.all = function(req, res) {
    Medication.find().sort('-created').populate('user', 'name username').exec(function(err, medications) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(medications);
        }
    });
};
