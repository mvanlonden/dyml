/**
 * Created by Mel on 3/22/14.
 */
'use strict';

//Medications service used for medications REST endpoint
angular.module('mean.medications').factory('Medications', ['$resource', function($resource) {
    return $resource('medications/:medicationId', {
        medicationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);