var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);

myapp1.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $rootScope) {

    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $scope.init = function () {

        $http.get('/api/GetCustomers').then(function (res, data) {
            $scope.Customers = res.data;
        });

        $http.get('/api/Types/TypesByGroupId?groupid=3').then(function (res, data) {
            $scope.jobStatus = res.data;
        });

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
        });

        $http.get('/api/AssetModel/GetAssetModels?locId=-1').then(function (res, data) {
            $scope.Models = res.data;          
        });

        $scope.GetJobEquipment();
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

    $scope.GetJobEquipment = function () {
        var mid = ($scope.s == null) ? -1 : $scope.s.Id;
        var lid = ($scope.l == null) ? -1 : $scope.l.id;
        var custId = ($scope.c == null || $scope.c.Id == null) ? -1 : $scope.c.Id;
        var modelId = ($scope.e == null || $scope.e.id == null) ? -1 : $scope.e.id;

        $http.get('/api/Jobs/GetJobEquipment?locationId=' + lid + '&statusId=' + mid + '&customerId=' + custId + '&AssetModelId=' + modelId).then(function (res, data) {
            $scope.JobEquipment = res.data;
            $rootScope.spinner.off();
            $("#jobequipment-content").show();
        });
    }

    //function stuffController($scope) {
    //    $scope.$on('$viewContentLoaded', jqueryStartWork);
    //}

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        //alert("ng-repeat finished");
        $("#example-advanced").treetable({ expandable: true }, true);
    });

    $scope.GoToJobDetails = function (aid) {
        $localStorage.nJobId = aid;
        window.location.href = "JobDetails.html";
    }

    $scope.GotToAssetDetails = function (aid) {
        $localStorage.assetDetailsId = aid;
        window.location.href = "AssetDetails.html";
    }
});