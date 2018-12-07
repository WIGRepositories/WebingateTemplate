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

    $scope.TInit = function () {
        $scope.newTypeActive = 1;
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
            $scope.getselectval();
            $rootScope.spinner.off();
            $("#types-content").show();
        });
    }

    $scope.getselectval = function (seltype) {
        $scope.newType = null;
        var grpid = (seltype) ? seltype.Id : -1;

        $http.get('/api/Types/TypesByGroupId?groupid=' + grpid).then(function (res, data) {
            $scope.Types = res.data;
        });

        // $scope.selectedvalues = 'Name: ' + $scope.selitem.name + ' Id: ' + $scope.selitem.Id;

    }

    $scope.save = function (Types) {

        if (Types == null) {
            alert('Please enter name.');
            return;
        }

        if (Types.Name == null) {
            alert('Please enter name.');
            return;
        }
        if (Types.TypeGroupId == null) {
            alert('Please select a type group');
            return;
        }

        var Types = {

            Id: Types.Id,
            Name: Types.Name,
            Description: Types.Description,
            Active: Types.Active,
            TypeGroupId: Types.TypeGroupId,
            ListKey: Types.ListKey,
            Listvalue: Types.Listvalue,
            insupddelflag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/Types/SaveType',
            //headers: {
            //    'Content-Type': undefined
            data: Types
        }

        $http(req).then(function (response) {

           // $scope.showDialog("Saved successfully!");
            $scope.getselectval($scope.s);
            $scope.Group = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.getselectval($scope.s);
            $scope.showDialog1(errmssg);
        });
        $scope.currGroup = null;
    };


    $scope.saveNewType = function (newType) {

        if (newType == null) {
            alert('Please enter name.');
            return;
        }

        if (newType.Name == null) {
            alert('Please enter name.');
            return;
        }

        if (newType.Name == "") {
            alert('Please enter name.');
            $scope.getselectval($scope.s);
            return;
        }

        if (newType.group == null || newType.group.Id == null) {
            alert('Please select a type group');
            return;
        }

        var newTypeData = {

            Id: '-1',
            Name: newType.Name,
            Description: newType.Description,
            Active: ($scope.newTypeActive == null) ? 0 : $scope.newTypeActive,
            TypeGroupId: newType.group.Id,
            ListKey: newType.ListKey,
            Listvalue: newType.Listvalue,
            insupddelflag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/Types/SaveType',
            data: newTypeData
        }

        $http(req).then(function (response) {

          //  $scope.showDialog("Saved successfully!");
            $scope.getselectval($scope.s);
            $scope.newType = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.getselectval($scope.s);
            $scope.showDialog1(errmssg);
        });
        $scope.newType = null;
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




    $scope.setCompany = function (grp) {
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

});

myapp1.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
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