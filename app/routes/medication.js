/**
 * Created by Mel on 3/22/14.
 */
'use strict';

// Medications routes use medications controller
var medications = require('../controllers/medications');
var authorization = require('./middlewares/authorization');

// Medication authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.medication.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/medications', medications.all);
    app.post('/medications', authorization.requiresLogin, medications.create);
    app.get('/medications/:medicationId', medications.show);
    app.put('/medications/:medicationId', authorization.requiresLogin, hasAuthorization, medications.update);
    app.del('/medications/:medicationId', authorization.requiresLogin, hasAuthorization, medications.destroy);

    // Finish with setting up the medicationId param
    app.param('medicationId', medications.medication);

};