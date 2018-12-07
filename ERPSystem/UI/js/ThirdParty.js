// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'AdalAngular']);
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, adalAuthenticationService) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    //$scope.userCmpId = $scope.userdetails[0].CompanyId;
    //$scope.UserCmp = $scope.userdetails[0].companyName;

   $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $scope.GetThirdPartyRes = function () {
        $http.get('/api/ThirdParty/GetThirdPartyResources').then(function (res, data) {
            $scope.ThirdPartyRes = res.data;
        });
    }

    $scope.save = function (ThirdParty) {

        if (ThirdParty == null) {
            alert('Please enter name.');
            return;
        }

       
        if (ThirdParty.ResourceName == null) {
            alert('Please enter Resource Name.');
            return;
        }

        if (ThirdParty.VendorName == null) {
            alert('Please enter Vendor Name.');
            return;
        }

        var SelThirdParty = {
            ResourceName: ThirdParty.ResourceName,
            VendorName: ThirdParty.VendorName,
            ResourceType: ThirdParty.ResourceType,
            Description: ThirdParty.Description,
            Id: ThirdParty.Id,
            insupddelflag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/ThirdParty/saveTPResource',
            //headers: {
            //    'Content-Type': undefined
            data: SelThirdParty
        }
        $http(req).then(function (response) {
            $scope.GetThirdPartyRes();
            $scope.ThirdParty1 = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);            
            $scope.ThirdParty1 = null;
            $scope.GetThirdPartyRes();
        });
    };

    $scope.saveNew3rdPartyRes = function (tres) {

        if (tres == null) {
            alert('Please enter resource name.');
            return;
        }

        if (tres.ResourceName == '' || tres.ResourceName == null) {
            alert('Please enter resource name.');
            return;
        }

        if (tres.VendorName == '' ||tres.VendorName == null) {
            alert('Please enter vendor name.');
            return;
        }

        var TPResource = {
            ResourceName: tres.ResourceName,
            VendorName: tres.VendorName,
            ResourceType: tres.ResourceType,
            Description: tres.Description,           
            Id: -1,
            insupddelflag: 'I'
            };


        var req = {
            method: 'POST',
            url: '/api/ThirdParty/saveTPResource',            
            data: TPResource
        }
        $http(req).then(function (response) {
            $scope.GetThirdPartyRes();
            $scope.ThirdParty = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);           
            $scope.ThirdParty = null;
        });

    };


    $scope.setCurrThirdparty = function (grp) {
        $scope.ThirdParty1 = grp;
    };

    $scope.clearGroup = function () {
        $scope.ThirdParty1 = null;
    };

    $scope.deleteTPResource = function (tpres) {

        var candelete = confirm('Do you really wish to delete the third party resource?');
        if (!candelete) {
            return;
        }

        tpres.insupddelflag = 'D'
        var req = {
            method: 'POST',
            url: '/api/ThirdParty/saveTPResource',
            data: tpres
        }
        $http(req).then(function (response) {
            
            $scope.GetThirdPartyRes();
            $scope.ThirdParty = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.ThirdParty = null;
        });
    }

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


