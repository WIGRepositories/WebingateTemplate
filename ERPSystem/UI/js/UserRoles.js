var app = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);

var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $filter, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;

   $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    $scope.checkedArr = new Array();
    $scope.uncheckedArr = new Array();
    $scope.userRoles = [];

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

    /* user details functions */
    $scope.GetLocations = function () {

        $http.get('/api/Location/GetLocations').then(function (response, data) {
            $scope.Locations = response.data;
            $scope.NLocations = response.data;
            $rootScope.spinner.off();
            $("#userroles-content").show();
        });

        $http.get('/api/Roles/GetRoles?allroles=-1').then(function (res, data) {
            $scope.roles = res.data;
            $rootScope.spinner.off();
            $("#userroles-content").show();
        });

        $scope.GetUserRoles(0);
    }

    $scope.GetUserRolesForLocation = function () {

    }

    $scope.GetUserRoles = function (newUser) {

        var locId = ($scope.l == null) ? -1 : $scope.l.id
        var usersWithOutRoles = (newUser) ? newUser : 0;
       
        $http.get('/api/Users/GetUserRoles?locId=' + locId + '&usersWithOutRoles=' + usersWithOutRoles+'&userid=-1').then(function (response, data) {
            $scope.UserRoles = response.data;
            $rootScope.spinner.off();
            $("#userroles-content").show();
        });
    }

    $scope.GetUsers = function () {
        $scope.newrole = null;
        $scope.s = null;
        $scope.ur = null;
        $scope.uu = null;
      
        
        $http.get('/api/Users/GetUserRoles?locId=-1&usersWithOutRoles=1&userid=-1').then(function (response, data) {
            $scope.Users = response.data;
            $rootScope.spinner.off();
            $("#userroles-content").show();
        });       
    }

    $scope.saveNewUserRoles = function () {

        if ($scope.u == null) {
            alert('Please select user.');
            return;
        }

        if ($scope.u.Id == null) {
            alert('Please select user.');
            return;
        }
        if ($scope.r == null) {
            alert('Please select role.');
            return;
        }
        if ($scope.r.Id == null) {
            alert('Please select role.');
            return;
        }

        //for non location roles location is mandatory
        if ($scope.r.IsGlobal == 0)
        {
            if ($scope.nl == null)
            {
                alert('Please select location.');
                return;
            }
            if ($scope.nl.id == null) {
                alert('Please select location.');
                return;
            }
        }
        var userrole = {
            Id: -1,
            UserId: $scope.u.Id,
            LocationId: ($scope.nl == null || $scope.r.IsGlobal == 1) ? null :$scope.nl.id,
            RoleId: $scope.r.Id,
            insupdflag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/Users/SaveUserRoles',
            //headers: {
            //    'Content-Type': undefined
            data: userrole
        }
        $http(req).then(function (response) {

            //$scope.showDialog("Saved successfully!");
            $scope.GetUserRoles(0);
            $scope.u = null;
            $scope.nl = null;
            $scope.r = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });


    };

    $scope.saveUserRoles = function (flag) {

        if ($scope.uRoleId == null) {
            alert('Please select role.');
            return;
        }        

        //for non location roles location is mandatory
        if ($scope.uRoleId.IsGlobal == 0) {
            if ($scope.ulocationId == null) {
                alert('Please select location.');
                return;
            }
            
            if ($scope.ulocationId.id == null) {
                    alert('Please select location.');
                    return;
                }
            
        }
        var userrole = {
            Id: $scope.CurrUserRole.Id,
            UserId: $scope.CurrUserRole.UserId,
            LocationId: ($scope.uRoleId.IsGlobal == 1) ? null : $scope.ulocationId.id,
            RoleId: $scope.uRoleId.Id,
            insupdflag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/Users/SaveUserRoles',
            //headers: {
            //    'Content-Type': undefined
            data: userrole
        }
        $http(req).then(function (response) {
            $scope.u = null;
            $scope.nl = null;
            $scope.r = null;
            //$scope.showDialog("Saved successfully!");
            $scope.GetUserRoles(0);
          

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });

    };

    $scope.setUserRoles = function (ur) {
        $scope.CurrUserRole = ur;
        //set role and location

        for (i = 0; i < $scope.roles.length; i++) {
            if ($scope.roles[i].Id == ur.RoleId) {
                $scope.uRoleId = $scope.roles[i];
                break;
            }
        }

        for (i = 0; i < $scope.Locations.length; i++) {
            if ($scope.Locations[i].id == ur.locationId) {
                $scope.ulocationId = $scope.Locations[i];
                break;
            }
        }
    }

    $scope.clearUsers = function () {
        $scope.CurrUserRole = null;
    }

    $scope.DeleteUserRole = function (userrole) {

        var candelete = confirm('Do you really wish to delete role for the user?');
        if (!candelete) {
            return;
        }

        userrole.insupdflag = 'D';
        var req = {
            method: 'POST',
            url: '/api/Users/SaveUserRoles',
            //headers: {
            //    'Content-Type': undefined
            data: userrole
        }
        $http(req).then(function (response) {

            $scope.s = null;
            $scope.ur = null;
            $scope.uu = null;
            $scope.GetUserRoles();
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
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


    $scope.GoToUserDetails = function (userID) {
        $localStorage.navUserId = userID;
        window.location.href = "Userdetails.html";
    }
});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance, mssg) {

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