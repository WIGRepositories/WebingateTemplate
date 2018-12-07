// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'AdalAngular']);
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, adalAuthenticationService) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;

    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $scope.CInit = function () {
        $scope.Customeract = 1;
    }

    $scope.getManufacturer = function () {
        $http.get('/api/Manufacturer/getManufacturer').then(function (res, data) {
            $scope.Manufacturer = res.data;
        });

        $http.get('/api/Users/GetUsers?cmpId=1').then(function (res, data) {
            $scope.Users = res.data;
        });


    }

    $scope.save = function (Manufacturer1) {

        if (Manufacturer1 == null) {
            alert('Please enter name.');
            return;
        }

        if (Manufacturer1.Name == null) {
            alert('Please enter Name.');
            return;
        }
        //if (Manufacturer.Client == "") {
        //    alert('Please enter client name.');
        //    $scope.GetCustomers();
        //    return;
        //}

        var SelManufacture = {
            Manufacture: Manufacturer1.Name,
            Description: Manufacturer1.Description,
            Active: (Manufacturer1.Active == null) ? 0 : Manufacturer1.Active,
            Id: Manufacturer1.ID,
            flag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/Manufacturer/SaveManufacturers',
            //headers: {
            //    'Content-Type': undefined
            data: SelManufacture
        }
        $http(req).then(function (response) {
            $scope.showDialog("Updated Successfully!");
            $scope.getManufacturer();
            $scope.Manufacturer1 = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.getManufacturer();
            $scope.Manufacturer1 = null;
        });


    };


    $scope.saveNew = function (manu) {

        if (manu == null) {
            alert('Please enter name.');
            return;
        }

        if (manu.Name == null) {
            alert('Please enter client name.');
            return;
        }

        //if (customer.customerID == null) {
        //    alert('Please enter customer ID.');
        //    return;
        //}

        var SelManufacturer = {
            Manufacture: manu.Name,
            Description: manu.Description,
            Active: ($scope.manuact == null) ? 0 : $scope.manuact,
            Id: -1,
            flag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/Manufacturer/SaveManufacturers',
            //headers: {
            //    'Content-Type': undefined
            data: SelManufacturer
        }
        $http(req).then(function (response) {
            alert("Saved successfully!");
            $scope.getManufacturer();
            $scope.Customer = null;
            $scope.ju = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.getManufacturer();
            $scope.Customer = null;
        });

    };


    $scope.setCurrCustomer = function (grp) {
        $scope.Manufacturer1 = grp;
     };

    $scope.clearGroup = function () {
        $scope.Manufacturer1 = null;
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
