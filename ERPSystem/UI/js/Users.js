
// JavaScript source code
var app = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'angularFileUpload',  'treasure-overlay-spinner']);

app.directive('file-input', function ($parse) {
    return {
        restrict: "EA",
        template: "<input type='file' />",
        replace: true,
        link: function (scope, element, attrs) {

            var modelGet = $parse(attrs.fileInput);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);

            var updateModel = function () {
                scope.$apply(function () {
                    modelSet(scope, element[0].files[0]);
                    onChange(scope);
                });
            };

            element.bind('change', updateModel);
        }
    };
});

app.directive("ngFileSelect", function () {

    return {

        link: function ($scope, el) {
            el.on('click', function () {
                this.value = '';
            });

            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                var allowed = ["jpeg", "png", "gif", "jpg"];
                var found = false;
                var img;
                img = new Image();

                allowed.forEach(function (extension) {
                    if ($scope.file.type.match('image/' + extension)) {
                        found = true;
                    }
                });

                if (!found) {
                    alert('file type should be .pdf, .png, .jpg, .gif');
                    return;
                }

                img.onload = function () {

                    var dimension = $scope.selectedImageOption.split(" ");
                    if (dimension[0] == this.width && dimension[2] == this.height) {
                        allowed.forEach(function (extension) {
                            if ($scope.file.type.match('image/' + extension)) {
                                found = true;
                            }
                        });

                        if (found) {
                            if ($scope.file.size <= 3048576) {
                                $scope.getFile();
                            } else {
                                alert('file size should not be grater then 1 mb.');
                            }
                        } else {
                            alert('file type should be .pdf, .png, .jpg, .gif');
                        }

                    } else {
                        alert('selected image dimension is not equal to size drop down.');
                    }

                };
                //  img.src = _URL.createObjectURL($scope.file);
            });
        }
    };

});

var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $upload, $timeout, fileReader, $filter, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    //$scope.userCmpId = $scope.userdetails[0].CompanyId;
    //$scope.UserCmp = $scope.userdetails[0].companyName;

   $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    $scope.checkedArr = new Array();
    $scope.uncheckedArr = new Array();
    $scope.userRoles = [];

    /* user details functions */
    $scope.init = function () {

        //$http.get('/api/GetCompanys?userid=-1').then(function (response, data) {
        //    $scope.Companies = response.data;

        //});

        $http.get('/api/Location/GetLocations').then(function (response, data) {
            $scope.Locations = response.data;
            $scope.GetUsersForCmp();
        });        
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


    $scope.GetUsersForCmp = function () {

        //if ($scope.cmp == null) {
        //    $scope.User = null;
        //    $scope.MgrUsers = null;
        //    $scope.cmproles = null;
        //    return;
        //}

        $scope.User = null;
        $scope.MgrUsers = null;
        $scope.cmproles = null;

        $http.get('/api/Users/GetUsers?cmpId=1').then(function (res, data) {
            $scope.User = res.data;
            $scope.MgrUsers = res.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });

        $http.get('/api/Roles/GetCompanyRoles?companyId=1').then(function (res, data) {
            $scope.cmproles = res.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });
    }

    $scope.save = function (User, flag, role, $event) {



        if (User == null) {
            alert('Please enter Email.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

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
        if (User.FirstName == null) {
            alert('Please enter first name.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        if (User.LastName == null) {
            alert('Please enter last name.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        if (User.EmailId == null) {
            alert('Please enter E-mail address.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }
        var len = User.EmailId.split("@").length - 1;
        if (len > 0 && flag == 'I') {
            alert('Duplicate "@" is not allowed. Please enter valid Email address.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }
        if (User.Name == null || User.Name == "") {
            alert('Please enter AD User Name.');
            $event.stopPropagation();
            $event.preventDefault();
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
            Id: ((flag == 'U') ? User.Id : -1),
            FirstName: User.FirstName,
            LastName: User.LastName,
            MiddleName: User.MiddleName,
            EmpNo: (flag == 'U') ? User.EmpNo : $scope.EmpNo,
            Email: (flag == 'U') ? User.EmailId : User.EmailId+'@eestt.onmicrosoft.com',
            ContactNo1: User.ContactNo1,
            ContactNo2: User.ContactNo2,
            mgrId: User.ManagerId,//($scope.mgr == null) ? null : $scope.mgr.Id,
            CountryId: User.Country,
            StateId: User.State,
            GenderId: User.Gender,
            Address: User.Address,
            AltAdress: User.AlternateAddress,
            ZipCode: User.ZipCode,
            RoleId: User.RoleId,
            RFromDate: User.RFromDate,
            RToDate: User.RToDate,
            companyId: 1,// $scope.cmp.Id,
            Active:User.Active,

            DUserName: User.DUserName,
            DPassword: User.DPassword,

            // WUserName: User.DUserName,
            //  WPassword: User.DPassword,

            Photo: $scope.imageSrc,
            UserName:User.Name,
            insupdflag: flag
        }

        var req = {
            method: 'POST',
            url: '/api/users/saveusers',
            data: U
        }
        $http(req).then(function (response) {

            alert("Saved successfully!");
            $('#Modal-header-new').modal('hide');
            $('#Modal-header-primary').modal('hide');
            $scope.GetUsersForCmp();
            $scope.Group = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
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

    $scope.User1 = null;


    $scope.setUsers = function (usr) {
        $scope.User1 = usr;
        //$scope.imageSrc = null;
        //document.getElementById('cmpNewLogo').src = "";
        //$scope.imageSrc = usr.photo;
        //document.getElementById('uactive').checked = (usr.Active == 1);

        $http.get('/api/Users/GetUserRoles?locId=-1&usersWithOutRoles=0&userid=' + $scope.User1.Id).then(function (response, data) {
            $scope.UserRole = response.data;
        });

    }

    $scope.clearUsers = function () {
        $scope.User1 = null;
    }

    /*end of user details functions */

    $scope.getUserRolesForCompany = function (cmp) {

        if (cmp == null) {
            $scope.userRoles = null;
            $scope.checkedArr = [];
            $scope.uncheckedArr = [];
            return;
        }

        $http.get('/api/Users/GetUserRoles?cmpId=1').then(function (res, data) {
            $scope.userRoles = res.data;
            $scope.checkedArr = res.data;
            // $scope.uncheckedArr = $filter('filter')($scope.userRoles, { assigned: "0" });

        });
    }

    $scope.GetUsersinitData = function () {

        $scope.imageSrc = null;
        document.getElementById('cmpLogo').src = "";

        var date = new Date();
        var components = [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ];

        var id = components.join("");
        $scope.EmpNo = 'EMP' + id;

        //get companies list   
        $http.get('/api/GetCompanyGroups?userid=-1').then(function (response, data) {
            $scope.Companies = response.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });
    }

    $scope.getRolesForCompany = function (seltype) {
        if (seltype == null) {
            $scope.cmproles = null;
            $scope.MgrUsers = null;
            return;
        }
        var cmpId = (seltype) ? seltype.Id : -1;

        $http.get('/api/Roles/GetCompanyRoles?companyId=' + cmpId).then(function (res, data) {
            $scope.cmproles = res.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });

        $http.get('/api/Users/GetUsers?cmpId=' + cmpId).then(function (res, data) {
            $scope.MgrUsers = res.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });
        //get users for the company or all users based on company
    }

    $scope.getUsersnRoles = function () {
        if ($scope.s == null) {
            $scope.cmproles1 = null;
            $scope.cmpUsers1 = null;
            return;
        }
        var cmpId = ($scope.s == null) ? -1 : $scope.s.Id;

        $http.get('/api/Roles/GetCompanyRoles?companyId=' + cmpId).then(function (res, data) {
            $scope.cmproles1 = res.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });

        $http.get('/api/Users/GetUsers?cmpId=' + cmpId).then(function (res, data) {
            $scope.cmpUsers1 = res.data;
            $rootScope.spinner.off();
            $("#users-content").show();
        });
    }
    $scope.saveUserRoles = function (flag) {

        if ($scope.s.Id == null) {
            alert('Please select company.');
            return;
        }

        if ($scope.ur.RoleId == null) {
            alert('Please select role.');
            return;
        }
        if ($scope.uu.Id == null) {
            alert('Please select user.');
            return;
        }
        var userrole = {
            Id: -1,
            UserId: $scope.uu.Id,
            CompanyId: $scope.s.Id,
            RoleId: $scope.ur.RoleId,
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

            $scope.showDialog("Saved successfully!");

            $scope.s = null;
            $scope.ur = null;
            $scope.uu = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });


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

    //    $http(req).then(function (res) {
    //        alert('Saved successfully');
    //        $scope.s = null;
    //        $scope.ur = null;
    //        $scope.uu = null;
    //    });

    //}

    $scope.setUserRoles = function (ur) {
        $scope.UserRoles = ur;
    }

    $scope.clearUsers = function () {
        $scope.UserRoles = null;
    }

    $scope.testdel = function (ur, flag) {
        var userrole = {

            RoleId: ur.RoleId,
            UserId: ur.Id,
            CompanyId: ur.Id,
            Active: 1,
            insupdflag: 'D'
        };

        var req = {
            method: 'POST',
            url: '/api/Users/GetUsers?cmpId=-1',
            data: userrole
        }
        $http(req).then(function (response) {
            alert('Removed successfully.');

            $http.get('/api/Users/GetUsers?cmpId=' + cmpId).then(function (res, data) {
                $scope.userRoles = res.data;
                $rootScope.spinner.off();
                $("#users-content").show();
            });

        });
        $scope.currRole = null;
    }



    $scope.toggle = function (item) {
        var idx = $scope.checkedArr.indexOf(item);
        if (idx > -1) {
            $scope.checkedArr.splice(idx, 1);
        }
        else {
            $scope.checkedArr.push(item);
        }

        var idx = $scope.uncheckedArr.indexOf(item);
        if (idx > -1) {
            $scope.uncheckedArr.splice(idx, 1);
        }
        else {
            $scope.uncheckedArr.push(item);
        }
    };


    $scope.toggleAll = function () {
        if ($scope.checkedArr.length === $scope.userRoles.length) {
            $scope.uncheckedArr = $scope.checkedArr.slice(0);
            $scope.checkedArr = [];

        } else if ($scope.checkedArr.length === 0 || $scope.userRoles.length > 0) {
            $scope.checkedArr = $scope.userRoles.slice(0);
            $scope.uncheckedArr = [];
        }

    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };


    $scope.isChecked = function () {
        return $scope.checkedArr.length === $scope.userRoles.length;
    };

    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };


    $scope.UploadImg = function () {
        var fileinput = document.getElementById('fileInput');
        fileinput.click();

        //  
        //if ($scope.file == null)
        //{ $scope.file = fileinput.files[0]; }
        //fileReader.readAsDataUrl($scope.file, $scope).then(function (result) { $scope.imageSrc = result; });
        //fileReader.onLoad($scope.file, $scope).then(function (result) { $scope.imageSrc = result; });
    };

    $scope.onFileSelect = function () {
        fileReader.readAsDataUrl($scope.file, $scope).then(function (result) { $scope.imageSrc = result; });
    }

    $scope.clearImg = function () {
        $scope.imageSrc = null;
        document.getElementById('cmpLogo').src = "";
        document.getElementById('cmpNewLogo').src = "";
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




