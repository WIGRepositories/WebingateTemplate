// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner'])


var mycrtl1 = myapp1.controller('myCtrl', ['$scope', '$http', '$localStorage', '$uibModal', 'adalAuthenticationService','$rootScope', function ($scope, $http, $localStorage, $uibModal, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;

   $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    $scope.tGroup = null;

    $scope.TGInit = function () {
        $scope.tGroupActive = 1;
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
    $scope.GetTypeGroups = function () {

        $http.get('/api/typegroups/gettypegroups').then(function (res, data) {
            $scope.TypeGroups = res.data;
            $rootScope.spinner.off();
            $("#typegroups-content").show();
        });
    }
  
    $scope.save = function (TypeGroup) {

        if (TypeGroup == null) {
            alert('Please enter name.');
            return;
        }

        if (TypeGroup.Name == null) {
            alert('Please enter name.');
            return;
        }

        if (TypeGroup.Name =="") {
            alert('Please enter name.');
            $scope.GetTypeGroups();
            return;
        }

        var SelTypeGroup = {
            Name: TypeGroup.Name,
            Description: TypeGroup.Description,
            Active: TypeGroup.Active,
            Update: TypeGroup.Update,
            Id: TypeGroup.Id,
            insupddelflag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/typegroups/savetypegroups',
            //headers: {
            //    'Content-Type': undefined
            data: SelTypeGroup
        }
        $http(req).then(function (response) {

          //  $scope.showDialog("Saved successfully!");

            $scope.GetTypeGroups();
            $scope.currGroup = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetTypeGroups();
            $scope.currGroup = null;
        });


    };


    $scope.saveNew = function (tGroup) {

        if (tGroup == null) {
            alert('Please enter name.');
            return;
        }

        if (tGroup.Name == null) {
            alert('Please enter name.');
            return;
        }

        var SelTypeGroup = {
            Name: tGroup.Name,
            Description: tGroup.Description,
            Active: ($scope.tGroupActive == null) ? 0 : $scope.tGroupActive,
            Id: -1,
            insupddelflag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/typegroups/savetypegroups',
            //headers: {
            //    'Content-Type': undefined
            data: SelTypeGroup
        }
        $http(req).then(function (response) {

          //  $scope.showDialog("Saved successfully!");

            $scope.GetTypeGroups();
            $scope.tGroup = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetTypeGroups();
            $scope.tGroup = null;
        });

    };


    $scope.setTypeGroup = function (grp) {
        $scope.currGroup = grp;
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

}]);

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




