/**
 * Created by Mel on 3/22/14.
 */

'use strict';

(function() {
    // Medications Controller Spec
    describe('MEAN controllers', function() {
        describe('MedicationsController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var MedicationsController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                MedicationsController = $controller('MedicationsController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one medication object ' +
                'fetched from XHR', function() {

                // test expected GET request
                $httpBackend.expectGET('medications').respond([{
                    name: 'Azithromax',
                    dosage: '20 mg'
                }]);

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.medications).toEqualData([{
                    name: 'Azithromax',
                    dosage: '20 mg'
                }]);

            });

            it('$scope.findOne() should create an array with one medication object fetched ' +
                'from XHR using a medicationId URL parameter', function() {
                // fixture URL parament
                $stateParams.medicationId = '525a8422f6d0f87f0e407a33';

                // fixture response object
                var testMedicationData = function() {
                    return {
                        name: 'Azithromax',
                        dosage: '20 mg'
                    };
                };

                // test expected GET request with response object
                $httpBackend.expectGET(/medications\/([0-9a-fA-F]{24})$/).respond(testMedicationData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.medication).toEqualData(testMedicationData());

            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                // fixture expected POST data
                var postMedicationData = function() {
                    return {
                        name: 'Azithromax',
                        dosage: '20 mg'
                    };
                };

                // fixture expected response data
                var responseMedicationData = function() {
                    return {
                        _id: '525cf20451979dea2c000001',
                        name: 'Azithromax',
                        dosage: '20 mg'
                    };
                };

                // fixture mock form input values
                scope.name = 'Azithromax';
                scope.dosage = '20 mg';

                // test post request is sent
                $httpBackend.expectPOST('medications', postMedicationData()).respond(responseMedicationData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.name).toEqual('');
                expect(scope.dosage).toEqual('');

                // test URL location to new object
                expect($location.path()).toBe('/medications/' + responseMedicationData()._id);
            });

            it('$scope.update() should update a valid medication', inject(function(Medications) {

                // fixture rideshare
                var putMedicationData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        name: 'Azithromax',
                        to: 'Chantix'
                    };
                };

                // mock medication object from form
                var medication = new Medications(putMedicationData());

                // mock medication in scope
                scope.medication = medication;

                // test PUT happens correctly
                $httpBackend.expectPUT(/medications\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/medications\/([0-9a-fA-F]{24})$/, putMedicationData()).respond();
                /*
                 Error: Expected PUT /medications\/([0-9a-fA-F]{24})$/ with different data
                 EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"Azithromax","to":"MEAN is great!"}
                 GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"Azithromax","to":"MEAN is great!","updated":[1383534772975]}
                 */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/medications/' + putMedicationData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid medicationId' +
                'and remove the medication from the scope', inject(function(Medications) {

                // fixture rideshare
                var medication = new Medications({
                    _id: '525a8422f6d0f87f0e407a33'
                });

                // mock rideshares in scope
                scope.medications = [];
                scope.medications.push(medication);

                // test expected rideshare DELETE request
                $httpBackend.expectDELETE(/medications\/([0-9a-fA-F]{24})$/).respond(204);

                // run controller
                scope.remove(medication);
                $httpBackend.flush();

                // test after successful delete URL location medications lis
                //expect($location.path()).toBe('/medications');
                expect(scope.medications.length).toBe(0);

            }));
        });
    });
}());