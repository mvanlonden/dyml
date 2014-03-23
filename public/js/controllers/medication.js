/**
 * Created by Mel on 3/22/14.
 */

'use strict';

angular.module('mean.medications').controller('MedicationsController', ['$scope', '$stateParams', '$location', 'Global', 'Medications', function ($scope, $stateParams, $location, Global, Medications) {
    $scope.global = Global;

    $scope.create = function() {
        var medication = new Medications({
            title: this.title,
            content: this.content
        });
        medication.$save(function(response) {
            $location.path('medications/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(medication) {
        if (medication) {
            medication.$remove();

            for (var i in $scope.medications) {
                if ($scope.medications[i] === medication) {
                    $scope.medications.splice(i, 1);
                }
            }
        }
        else {
            $scope.medication.$remove();
            $location.path('medications');
        }
    };

    $scope.update = function() {
        var medication = $scope.medication;
        if (!medication.updated) {
            medication.updated = [];
        }
        medication.updated.push(new Date().getTime());

        medication.$update(function() {
            $location.path('medications/' + medication._id);
        });
    };

    $scope.find = function() {
        Medications.query(function(medications) {
            $scope.medications = medications;
        });
    };

    $scope.findOne = function() {
        Medications.get({
            medicationId: $stateParams.medicationId
        }, function(medication) {
            $scope.medication = medication;
        });
    };
}]);