// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;

   $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $scope.LInit = function () {
        $scope.newLocationactive = 1;
    }
    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    }
    $rootScope.spinner.on();
    $scope.GetLocations = function () {

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
            $rootScope.spinner.off();
            $("#locations-content").show();
        });
    }

    $scope.save = function (Locations) {
      
        if (Locations == null) {
            alert('Please enter location.');
            return;
        }

        if (Locations.name == null) {
            alert('Please enter location name.');
            return;
        }

        var SelLocation = {
            Name: Locations.name,
            Description: Locations.description,
            Active: (Locations.active == null) ? 0 : Locations.active,
            Id: Locations.id,
            insupddelflag:'U'
        };

        var req = {
            method: 'POST',
            url: '/api/location/savelocations',
            //headers: {
            //    'Content-Type': undefined
            data: SelLocation
        }
        $http(req).then(function (response) {

            $scope.showDialog("Saved successfully!");
            $scope.GetLocations();
            $scope.currGroup = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetLocations();
        });
       
        $scope.currGroup = null;

    };


    $scope.saveNew = function (Location) {

        if (Location == null) {
            alert('Please enter location.');
            return;
        }

        if (Location.Name == null) {
            alert('Please enter location name.');
            return;
        }

        var SelLocation = {
            Name: Location.Name,
            Description: Location.Description,
            Active: ($scope.newLocationactive == null) ? 0 : $scope.newLocationactive,
            Id: -1,
            insupddelflag:'I'
        };

        var req = {
            method: 'POST',
            url: '/api/location/savelocations',
            //headers: {
            //    'Content-Type': undefined
            data: SelLocation
        }
        $http(req).then(function (response) {

            $scope.showDialog("Saved successfully!");
            $scope.GetLocations();
            $scope.newLocation = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });       
        $scope.newLocation = null;
    };


    $scope.setLocation = function (loc) {
        $scope.currGroup = loc;
    };

    $scope.clearGroup = function () {
        $scope.currGroup = null;
    };


    $scope.showDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }
    $scope.showDialog1 = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalInstanceCtrl1',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }

    
});

myapp1.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});




myapp1.controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.showDialog1 = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalInstanceCtrl1',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }
});