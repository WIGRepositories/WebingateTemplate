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

    $scope.OTInit = function () {
        $scope.ObjectTypeActive = 1;
        $scope.GetDataTypes();
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
    $scope.GetObjectTypes = function () {       

        $http.get('/api/objecttypes/getobjecttypes').then(function (res, data) {
            $scope.ObjectTypes = res.data;
            $rootScope.spinner.off();
            $("#objecttypes-content").show();
        });
    }

    $scope.GetDataTypes = function () {
        $http.get('/api/Types/TypesByGroupId?groupid=2').then(function (res, data) {
            $scope.DataTypes = res.data;
            $rootScope.spinner.off();
            $("#objecttypes-content").show();
        });
    }

    $scope.save = function (ObjectType) {
      
        if (ObjectType == null) {
            alert('Please enter object.');
            return;
        }

        if (ObjectType.name == null) {
            alert('Please enter object name.');
            return;
        }

        if (ObjectType.name == "") {
            alert('Please enter object name.');
            $scope.GetObjectTypes();
            return;
        }

        var SelObjectType = {
            Name: ObjectType.name,
            Description: ObjectType.Description,
            Active: ObjectType.Active,
            DataTypeId: ($scope.dataType == null) ? ObjectType.DataTypeID : $scope.dataType.Id,
            Id: ObjectType.id,
            insupddelflag:'U'
        };

        var req = {
            method: 'POST',
            url: '/api/objecttypes/saveobjecttypes',
            //headers: {
            //    'Content-Type': undefined
            data: SelObjectType
        }
        $http(req).then(function (response) {

           $scope.showDialog("Saved successfully!");
            $scope.GetObjectTypes();
            $scope.currGroup = null;
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.GetObjectTypes();
            $scope.showDialog1(errmssg);
        });        
        $scope.currGroup = null;

    };


    $scope.saveNew = function (ObjectType) {

        if (ObjectType == null) {
            alert('Please enter name.');
            return;
        }

        if (ObjectType.Name == null) {
            alert('Please enter object name.');
            return;
        }
        if (ObjectType.dataType == null)
        {
            alert('Please enter object name.');
            return;
        }
        var SelObjectType = {
            Name: ObjectType.Name,
            Description: ObjectType.Description,
            Active: ($scope.ObjectTypeActive == null) ? 0 : $scope.ObjectTypeActive,
            DataTypeId: ObjectType.dataType.Id,
            Id: -1,
            insupddelflag:'I'
        };

        var req = {
            method: 'POST',
            url: '/api/objecttypes/saveobjecttypes',
            //headers: {
            //    'Content-Type': undefined
            data: SelObjectType
        }
        $http(req).then(function (response) {

          $scope.showDialog("Saved successfully!");
            $scope.GetObjectTypes();
            $scope.ObjectType = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });       
        $scope.ObjectType = null;
    };


    $scope.setObjectType = function (grp) {
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


