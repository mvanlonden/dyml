'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Medications',
        'link': 'medications'
    }, {
        'title': 'Add New Medication',
        'link': 'medications/create'
    }];
    
    $scope.isCollapsed = false;
}]);