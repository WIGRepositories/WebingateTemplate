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

    $scope.parseLocation = function (location) {
        var pairs = location.substring(1).split("&");
        var obj = {};
        var pair;
        var i;

        for (i in pairs) {
            if (pairs[i] === "") continue;

            pair = pairs[i].split("=");
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        return obj;
    };


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

    $scope.GetUsers = function () {

        $scope.selUserId = $localStorage.navUserId;//$scope.parseLocation(window.location.search)['userid'];
        $localStorage.navUserId = null;

        $http.get('/api/Users/GetUsers?cmpId=1').then(function (response, data) {
            $scope.Users = response.data;
            $rootScope.spinner.off();
            $("#userdetails-content").show();
            if ($scope.selUserId == null) {
               // $scope.UsersDetails = $scope.Users[0];
                $scope.ju = $scope.Users[0];
            }
            else{
                for (i = 0; i < $scope.Users.length; i++) {
                    if ($scope.Users[i].Id == $scope.selUserId) {
                        $scope.ju = $scope.Users[i];
                     //   $scope.UsersDetails = $scope.Users[i];
                        break;
                    }
                }
            }
            $scope.GetUserDetails($scope.ju);
        });
    }

    $scope.GetUserDetails = function (selUser) {
        $scope.UserRole = null;
        $scope.UsersDetails = selUser;
        //if (selUser == null)
        //{
        //    $scope.UsersDetails = null;
        //    return;
        //}
        ////$http.get('/api/Users/GetUsers?cmpId=1').then(function (response, data) {
        ////    $scope.UsersDetails = response.data[0];
        ////});
        //for (i = 0; i < $scope.Users.length; i++) {
        //    if ($scope.Users[i].Id == selUser.Id) {
        //        $scope.UsersDetails = $scope.Users[i];
        //        break;
        //    }
        //}

        $http.get('/api/Users/GetUserRoles?locId=-1&usersWithOutRoles=0&userid=' + selUser.Id).then(function (response, data) {
            $scope.UserRole = response.data;
            $rootScope.spinner.off();
            $("#userdetails-content").show();
        });
       
    }

    $scope.saveUserDetails = function () {
        var User = $scope.UsersDetails
        
        var phoneformat = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
        if (User.ContactNo1 != null && User.ContactNo1 != "") {
            if ((User.ContactNo1).match(phoneformat)) {
                $scope.phonevalid = '';
            }
            else {
                if ((User.ContactNo1).match(/^\d{10}$/)) {
                    $scope.phonevalid = '';
                }
                else {
                    alert('Phone number format is invalid.');
                    return;
                }
            }
        }
        if (User == null) {
            alert('Please enter user details.');
            return;
        }

        if (User.FirstName == null) {
            alert('Please enter first name.');
            return;
        }

        if (User.LastName == null) {
            alert('Please enter last name.');
            return;
        }

        if (User.EmailId == null) {
            alert('Please enter Email.');
            return;
        }

        if (User.Name == null || User.Name == "") {
            alert('Please enter AD User Name.');
            return;
        }

        //if (flag == 'U' && User.EmpNo == null) {
        //    alert('Please enter employee no.');
        //    return;
        //}

        //if (flag == 'I' && $scope.EmpNo == null) {
        //    alert('Please enter employee no.');
        //    return;
        //}

        //if ($scope.cmp == null) {
        //    alert('Please select a company.');
        //    return;
        //}

        var U = {
            Id: User.Id,
            FirstName: User.FirstName,
            LastName: User.LastName,
            MiddleName: User.MiddleName,
            EmpNo: User.EmpNo,
            Email: User.EmailId,
            ContactNo1: User.ContactNo1,
            ContactNo2: User.ContactNo2,
            mgrId: User.ManagerId,//($scope.mgr == null) ? null : $scope.mgr.Id,
            CountryId: User.Country,
            StateId: User.State,
            GenderId: (User.Gender == null || User.Gender == "") ? null : User.Gender,
            Address: User.Address,
            AltAdress: User.AlternateAddress,
            ZipCode: User.ZipCode,
            RoleId: User.RoleId,
            RFromDate: User.RFromDate,
            RToDate: User.RToDate,
            companyId:1,// $scope.cmp.Id,
            Active: $scope.UsersDetails.Active,

            DUserName: User.DUserName,
            DPassword: User.DPassword,

            // WUserName: User.DUserName,
            //  WPassword: User.DPassword,

           // Photo: $scope.imageSrc,
            UserName: User.Name,
            insupdflag: 'U'
        }

        var req = {
            method: 'POST',
            url: '/api/users/saveusers',
            data: U
        }
        $http(req).then(function (response) {

            $scope.showDialog("Saved successfully!");           
            

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

    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
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