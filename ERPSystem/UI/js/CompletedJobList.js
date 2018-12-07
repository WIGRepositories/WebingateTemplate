// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $filter, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }

    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    $scope.roleLocations = $localStorage.roleLocation;
         

    $scope.init = function () {

        $http.get('/api/GetCustomers').then(function (res, data) {
            $scope.Customers = res.data;
        });

        //$http.get('/api/Types/TypesByGroupId?groupid=4').then(function (res, data) {
        //    $scope.jobStatus = res.data;
        //});

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
        });
        $scope.getJobsListByStatus();
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


    $scope.getJobsListByStatus = function () {
        
        var locId =($scope.s == null) ? -1:$scope.s.id;
        var custId = ($scope.c == null) ? -1 : $scope.c.Id;

        $http.get('/api/Jobs/GetJobsByStatus?statusId=9&locationId='+locId+'&customerId='+custId).then(function (res, data) {
            $scope.jobsList = res.data.Table;
            $rootScope.spinner.off();
            $("#completedjoblist-content").show();
        });
    }

    $scope.GoToJobDetails = function (aid) {
        $localStorage.nJobId = aid;
        window.location.href = "JobDetails.html";
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