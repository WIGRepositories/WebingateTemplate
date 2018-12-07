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
        $scope.vendoract = 1;
    }

    $scope.GetMaintenanceVendors = function () {
        $http.get('/api/MaintenanceVendor/getvendors').then(function (res, data) {
            $scope.Vendors = res.data;
        });

        $http.get('/api/Users/GetUsers?cmpId=1').then(function (res, data) {
            $scope.Users = res.data;            
        });


    }

    $scope.save = function (mainvendor) {

        if (mainvendor == null) {
            alert('Please enter Name.');
            return;
        }

        if (mainvendor.Name == null) {
            alert('Please enter Name.');
            return;
        }
        //if (mainvendor.Client == "") {
        //    alert('Please enter client name.');
        //    $scope.GetCustomers();
        //    return;
        //}

        var Selmainvendor = {
            Name: mainvendor.Name,
            Description: mainvendor.Description,
            Active: (mainvendor.Active == null) ? 0 : mainvendor.Active,
            Id: mainvendor.Id,
            flag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/MaintenanceVendor/SaveVendors',
            //headers: {
            //    'Content-Type': undefined
            data: Selmainvendor
        }
        $http(req).then(function (response) {
            $scope.showDialog("Updated successfully!");
            $scope.GetMaintenanceVendors();
            $scope.mainvendor = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetMaintenanceVendors();
            $scope.mainvendor = null;
        });


    };


    $scope.saveNew = function (vendor) {

        if (vendor == null) {
            alert('Please enter name.');
            return;
        }

        if (vendor.Name == null) {
            alert('Please enter client name.');
            return;
        }

        //if (customer.customerID == null) {
        //    alert('Please enter customer ID.');
        //    return;
        //}

        var Selvendor = {
            Name: vendor.Name,
            Description: vendor.Description,
            Active: ($scope.vendoract == null) ? 0 : $scope.vendoract,
            Id: -1,
            flag: 'I'
        };       

        var req = {
            method: 'POST',
            url: '/api/MaintenanceVendor/SaveVendors',
            //headers: {
            //    'Content-Type': undefined
            data: Selvendor
        }
        $http(req).then(function (response) {
            $scope.showDialog("Saved successfully!");
            $scope.GetMaintenanceVendors();
            $scope.vendor = null;
            $scope.ju = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetMaintenanceVendors();
            $scope.Customer = null;
        });

    };


    $scope.setCurrvendor = function (grp) {
        $scope.mainvendor = grp;
       
    };

    $scope.clearGroup = function () {
        $scope.mainvendor = null;
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




