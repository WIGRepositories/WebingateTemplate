var myapp1 = angular.module('myApp', ['ngStorage', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'treasure-overlay-spinner'])

myapp1.animation('.ng-slide-down', function () {
    return {
        enter: function (element, done) {
            element.hide().slideDown()
            return function (cancelled) { };
        },
        leave: function (element, done) {
            element.slideUp();
        },
    };
});

myapp1.animation('.slide', function () {
    var NG_HIDE_CLASS = 'ng-hide';
    return {
        beforeAddClass: function (element, className, done) {
            if (className === NG_HIDE_CLASS) {
                element.slideUp(done);
            }
        },
        removeClass: function (element, className, done) {
            if (className === NG_HIDE_CLASS) {
                element.hide().slideDown(done);
            }
        }
    }
});

var mycrtl1 = myapp1.controller('myCtrl', ['$scope', '$http', '$localStorage', '$uibModal', '$rootScope', '$location', function ($scope, $http, $localStorage, $uibModal, $rootScope,  $location) {
    //var mycrtl1 = myapp1.controller('myCtrl', ['$scope', '$http', '$localStorage', '$uibModal', '$rootScope', '$location', function ($scope, $http, $localStorage, $uibModal, $rootScope,  $location) {   
    $scope.CanCreate = 0;
    $scope.itemsperpage = '10';
    $scope.currpage = 1;
    $scope.Active = 1;
    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    }

    var userinfor = $localStorage.userInfo;
    //if (userinfor == null) {
    //    adalAuthenticationService.login();
    //}


    $scope.ValidateCredentials = function () {

        $rootScope.spinner.on();

        if (userinfor == null) {
          // // window.location.href = "../login.html";
        }
        else {

            if ($localStorage.uname == null) {


                var inputcred = {
                    uname: userinfor.profile.name,
                    emailid: userinfor.userName,
                    FirstName: userinfor.profile.given_name,
                    LastName: userinfor.profile.family_name
                }

                var req = {
                    method: 'POST',
                    url: '/api/LOGIN/ValidateADCredentials',
                    data: inputcred
                }


                $http(req).then(function (res) {


                    //if the user has role, then get the details and save in session
                    $localStorage.uname = res.data.Table[0].uname;
                    $scope.uname = $localStorage.uname;
                    $localStorage.userdetails = res.data.Table[0];
                    //for user there can be multiple roles
                    //need to check all
                    $localStorage.isSuperUser = 0;
                    for (var i = 0; i < res.data.Table1.length; i++) {
                        if (res.data.Table1[i].roleid == 1) {
                            $localStorage.isSuperUser = 1;
                            break;
                        }
                    }
                    if ($localStorage.isSuperUser == 0) {
                        for (var i = 0; i < res.data.Table1.length; i++) {
                            if (res.data.Table1[i].roleid == 2 || res.data.Table1[i].roleid == 3) {
                                $localStorage.isAdminSupervisor = 1;
                                break;
                            }
                        }
                    }

                    $localStorage.roleLocation = res.data.Table1;

                    $scope.userdetails = $localStorage.userdetails;
                    $scope.isSuperUser = $localStorage.isSuperUser;
                    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
                    $scope.roleLocations = $localStorage.roleLocation;

                    $scope.expand = false;
                    $scope.GetLocations();

                    $rootScope.spinner.off();
                    $("#index-content").show();
                }, function (errres) {
                    // alert(errres);
                    $rootScope.spinner.off();
                    $("#index-content").show();
                });
            }
            else {

                $scope.uname = $localStorage.uname;
                $scope.userdetails = $localStorage.userdetails;
                $scope.isSuperUser = $localStorage.isSuperUser;
                $scope.roleLocations = $localStorage.roleLocation;
                $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
                $scope.expand = false;
                $scope.GetLocations();
                $rootScope.spinner.off();
                $("#index-content").show();
            }


        }


    }

    $scope.ETInit = function () {
        $scope.newAssetActive = 1;
    }

    $scope.GetLocations = function () {
        //   $scope.ValidateCredentials();
        $scope.expand = false;
        $scope.expandT = false;
        $scope.expandJ = false;
        // $rootScope.spinner.on();
        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
            $scope.Locations1 = res.data;

            $scope.GetDashBoardDetails();

            //  $rootScope.spinner.off();

        }, function (errres) {
            // alert(errres);
            //$rootScope.spinner.off();
        });
    }
    $http.get('/api/Types/getstates').then(function (res, data) {
        $scope.States = res.data;
    });
    $scope.GetDashBoardDetails = function (loc) {

        $rootScope.spinner.on();

        // var locationId = ($scope.l == null) ? -1 : $scope.l.id;
        var locationId = (loc == null) ? -1 : loc.id;

        $http.get('/api/LOGIN/GetDashboardDetails?locationId=' + locationId).then(function (res, data) {
            $scope.dashboardDS = res.data;
            $rootScope.spinner.off();
            $("#index-content").show();

        }, function (errres) {
            // alert(errres);
            $rootScope.spinner.off();
            $("#index-content").show();
        });

        //check if he is a location admin and accordingly enable assets and jobs creation for his location
        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanCreate = ($scope.isSuperUser == 1) ? 1 : 0;
        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            //$scope.CanCreate = 0;

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if (locationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanCreate = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
                    break;
                }
            }
        }
    }

    $scope.CheckCanCreate = function (t) {
        // alert(t);
        var locationId = t;//($scope.l == null) ? -1 : $scope.l.id;

        //check if he is a location admin and accordingly enable assets and jobs creation for his location
        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanCreate = ($scope.isSuperUser == 1 || locationId == null) ? 1 : 0;
        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            //$scope.CanCreate = 0;

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if (locationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanCreate = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
                    break;
                }
            }
        }
    }

    $scope.Logout = function () {
        $localStorage.$reset();
        adalAuthenticationService.userInfo.isAuthenticated = false;
        adalAuthenticationService.logOut();
    }
    $scope.Login = function () {
        // adalAuthenticationService.login();

        var urlstring = window.location.hash;
        var tokenstr = urlstring.substr(urlstring.indexOf('id_token'), urlstring.length);

        if (tokenstr != "") {
            window.authContext = new AuthenticationContext(window.config);

            // Read the token from URL.        
            var token = token.split('&state')[0];
            // alert('token');
            //// Parse the token to get user profile and the expire (.exp) value.
            var user = authContext._createUser(token);
        }
        else {
            //  alert('login');
            if (adalAuthenticationService.userInfo.isAuthenticated) {
                $localStorage.userInfo = adalAuthenticationService.userInfo;
                adalAuthenticationService.userInfo.isAuthenticated = true;
            } else {
                // alert();
                adalAuthenticationService.login();
            }
        }

    }

    $scope.GetParentTypes = function () {
        $http.get('/api/objecttypes/getobjecttypes').then(function (res, data) {
            $scope.AssetType = res.data;
        });
    }
    $scope.GetCustomers = function () {
        $http.get('/api/GetCustomers').then(function (res, data) {
            $scope.Customers = res.data;
        });
    }
    $scope.Test = function (ele, t) {

        ////  $('#11').click();

        //  if ($('#11').hasClass('fa-chevron-up')) {
        //      $('#111').slideUp('fast');
        //      $('#11').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        //  }
        //  else if ($('#11').hasClass('fa-chevron-down')) {
        //      $('#111').slideDown('fast');
        //      $('#11').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        //  }
    }

    $scope.GoToAssetsList = function (assetModel, $event) {
        //  alert(assetModel.id);
        $event.stopPropagation();
        $event.preventDefault();

        window.location.href = "Assets.html"

    }

    $scope.GoToAssetModels = function (assetModel, $event) {
        //  alert(assetModel.id);
        $event.stopPropagation();
        $event.preventDefault();

        window.location.href = "AssetModels.html"

    }

    $scope.GetAssetModels = function () {
        //var curpage = $scope.page;

        //if (flag == 'n') {
        //    $scope.page++;
        //    curpage = $scope.page;
        //} else if (flag == 'p') {
        //    $scope.page--
        //    curpage = $scope.page;
        //}
        //else {
        //    $scope.page = 1;
        //    curpage = $scope.page;
        //}

        //$http.get('/api/location/getlocations').then(function (res, data) {
        //    $scope.Locations = res.data;
        //    $scope.Locations1 = res.data;
        //});
        $scope.TypeGroupsData();


        $http.get('/api/AssetModel/GetAssetModels?locId=-1').then(function (res, data) {
            $scope.Models = res.data;
            $scope.Models1 = res.data;
            //$scope.s = $scope.Models[0];
            //$scope.GetAssetsForModel();
        });

    }

    $scope.getManufacturer = function () {
        $http.get('/api/Manufacturer/getManufacturer').then(function (res, data) {
            $scope.Manufacturer = res.data;
        });
    }
    $scope.GetCounty = function (code) {
        if (code == null) return;
        $http.get('/api/Types/GetCounty?Id=' + code.Id).then(function (res, data) {
            $scope.county = res.data;
        });
    }
    $scope.TypeGroupsData = function () {
        var vc = {
            includeStatus: '1',
            includeInspectionVendors: '1',
            includeMaintenanceVendors: '1',
            includeMaterial: '1',
            includeState: '1',
            includeJobType: '1'

        };

        var req = {
            method: 'POST',
            url: '/api/Types/TypeGroupsData',
            data: vc
        }

        $http(req).then(function (res) {
            $scope.Typesdata = res.data.Table;
            $scope.Typeinit = res.data.Table1;
            $scope.Typemain = res.data.Table2;
            $scope.materiallist = res.data.Table3;
            $scope.Typesdataa = res.data.Table4;
            $scope.jobtypes = res.data.Table5;
            var st = [];
            if ($scope.Typesdata) {
                for (var i = 0; i < $scope.Typesdata.length; i++) {
                    if ($scope.Typesdata[i].Id != 9) {
                        st.push($scope.Typesdata[i]);
                    }
                }
                $scope.astatus = st;
            }
        });
    }

    $scope.GoToJobsList = function (assetModel, $event) {
        //  alert(assetModel.id);
        $event.stopPropagation();
        $event.preventDefault();

        window.location.href = "JobsList.html"

    }

    $scope.GetObjectTypes = function () {
        $http.get('/api/objecttypes/getobjecttypes').then(function (res, data) {
            $scope.AssetType = res.data;
        });
    }

    $scope.CheckCanCreate = function (t) {
        // alert(t);
        var locationId = t;//($scope.l == null) ? -1 : $scope.l.id;

        //check if he is a location admin and accordingly enable assets and jobs creation for his location
        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanCreate = ($scope.isSuperUser == 1) ? 1 : 0;
        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if (locationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanCreate = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
                    break;
                }
            }
        }
    }

    $scope.Changerental = function () {

        if ($scope.newAsset.Rental == '1') {
            $scope.tt = $scope.newAsset.Rental;
        }
        else if ($scope.newAsset.Rental == '' || $scope.currobj.Rental == null) {
            $scope.tt = $scope.newAsset.Rental;
        }
    }

    $scope.saveNewAsset = function (newAsset) {
        var newAsset = $scope.newAsset;
        //for (var a = 0; a < $scope.AssetType.length; a++) {
        //    if ($scope.AssetTypeName = $scope.AssetType.Name) {
        //        $scope.atn = $scope.AssetType.ID;
        //    }
        //}
        if (newAsset == null) {
            alert('Please enter the equipment name');
            return;
        }
        if (newAsset.Name == null) {
            alert('Please enter the equipment name');
            return;
        }
        //if ($scope.newAsset.Rental == '1' && $scope.mtl == null) {
        //    alert('Please select Material.');
        //    return;
        //}

        if ($scope.selectedAsstType.AssetTypeName == 'Mills' || $scope.selectedAsstType.AssetTypeName == 'Shoes') {
            if ($scope.newAsset.Rental == null || $scope.newAsset.Rental == '') {
                alert('Please Select Rental.');
                return;
            }
        }
        if ((
            ($scope.selectedAsstType.AssetTypeName == 'Mills' && $scope.mtl == null ||
            $scope.selectedAsstType.AssetTypeName == 'Shoes' && $scope.mtl == null)) ||
            $scope.newAsset.Rental == '1' && $scope.mtl == null) {
            alert('Please select Material.');
            return;
        }
                
        if ($scope.newAsset.Rental == '1' && newAsset.JobRate == null) {
            alert('Please Enter Rental Day Rate.');
            return;
        }
        if ($scope.selectedEqipType == null) {
            alert('Please select an equipment model');
            return;
        }
        if ($scope.selectedEqipType.id == null) {
            alert('Please select an equipment model');
            return;
        }
        //if ($scope.AssetTypeName == null) {
        //    alert('Please select an equipment model');
        //    return;
        //}
        if ($scope.atn == null) {
            alert('Please select an equipment model');
            return;
        }


        //if (newAsset.CycleCountDate == null) {
        //    alert('Please select a CycleCountDate');
        //    return;
        //}
        //if ($scope.ManufactureId == null || $scope.ManufactureId.ID == null) {
        //    alert('Please select a Manufacturer');
        //    return;
        //}
        if (newAsset.UnitPrice == null) {
            alert('Please select a UnitPrice');
            return;
        }
        //if (newAsset.JobRate == null) {
        //    alert('Please select a JobRate');
        //    return;
        //}
        if (newAsset.AdditionalDayRate == null) {
            alert('Please select a AdditionalDayRate');
            return;
        }
        //if (newAsset.DayRate == null) {
        //    alert('Please select a DayRate');
        //    return;
        //}
        if (newAsset.PerWeekStbyCharge == null) {
            alert('Please select a PerWeekStbyCharge');
            return;
        }
        if (newAsset.RedressCost == null) {
            alert('Please select a RedressCost');
            return;
        }
        //if (newAsset.DateSold == null) {
        //    alert('Please select a DateSold');
        //    return;
        //}
        //if (newAsset.LostDamaged == null) {
        //    alert('Please select a LostDamaged');
        //    return;
        //}
        //if (newAsset.Price == null) {
        //    alert('Please select a Price');
        //    return;
        //}
        //if ($scope.Status == null || $scope.Status.Id == null) {
        //    alert('Please select a Status');
        //    return;
        //}
        if ($scope.iv == null || $scope.iv.Id == null) {
            alert('Please select a Inspection vendor');
            return;
        }
        if ($scope.mv == null || $scope.mv.Id == null) {
            alert('Please select a Maintenance vendor');
            return;
        }
        if (newAsset.Condition == null) {
            alert('Please select a Condition');
            return;
        }
        //if (newAsset.Material == null) {            
        //    alert('Please select a Material');
        //    return;
        //}
        if (newAsset.PurchaseCost == null) {
            alert('Please select a PurchaseCost');
            return;
        }
        //if (newAsset.Lost == null) {
        //    alert('Please select a Lost');
        //    return;
        //}
        //if (newAsset.LocationDate == null) {
        //    alert('Please select a LocationDate');
        //    return;
        //}
        if (newAsset.Description == null) {
            alert('Please select a Description');
            return;
        }

        var newAsset1 = {
            Id: -1,
            Name: newAsset.Name,
            Description: newAsset.Description,
            Active: $scope.Active,//selectedRole.Active, 
            AsstMDLHierarID: $scope.amodel,
            AssetModelId: $scope.selectedEqipType.id,
            ParentID: null,
            RootAssetID: -1,
            LocationId: ($scope.CurrLocation == null) ? null : $scope.CurrLocation.id,
            AssetTypeId: $scope.atn,
            changedById: $scope.userdetails.Id,
            CycleCountDate: newAsset.CycleCountDate,
            CurrLocation: ($scope.CurrLocation == null) ? null : $scope.CurrLocation.id,
            ManufactureId: ($scope.ManufactureId == null) ? null : $scope.ManufactureId.ID,
            DatePurchased: newAsset.DatePurchased,
            UnitPrice: newAsset.UnitPrice,
            JobRate: newAsset.JobRate,
            Rental: (newAsset.Rental == null || newAsset.Rental == '') ? 0 : newAsset.Rental,
            AdditionalDayRate: newAsset.AdditionalDayRate,
            DayRate:null, //newAsset.DayRate,
            PerWeekStbyCharge: newAsset.PerWeekStbyCharge,
            RedressCost: newAsset.RedressCost,
            DateSold: newAsset.DateSold,
            LostDamaged: newAsset.LostDamaged,
            Price: newAsset.Price,
            InspectionVendorId: ($scope.iv == null) ? null : $scope.iv.Id,
            MaintenanceVendorId: ($scope.mv == null) ? null : $scope.mv.Id,
            StatusId: ($scope.Status == null) ? null : $scope.Status.Id,
            Condition: newAsset.Condition,
            Material: ($scope.mtl == null) ? null : $scope.mtl.Id,
            PurchaseCost: newAsset.PurchaseCost,
            Customer: ($scope.jc == null) ? null : $scope.jc.Id,
            LostLIHDamaged: newAsset.Lost,
            LocationDate: (newAsset.LocationDate == null) ? null : newAsset.LocationDate,
            Notes: newAsset.Notes,
            insupddelflag: 'I'
        };



        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: newAsset1
        }
        $http(req).then(function (response) {

            alert("Saved successfully!");
            //$scope.GetAssetsForModel();
            $scope.GetDashBoardDetails();
            $scope.newAsset = null;
            $scope.newAssetModel = null;
            $('#Modal-header-newAsset').modal('hide');
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $('#Modal-header-newAsset').modal('hide');
            $scope.showDialog1(errmssg);
            //$scope.GetAssetsForModel();
        });

    }

    $scope.Changejobtype = function () {
        if ($scope.jbty.Id == 46 || $scope.jbty.Id == 47 || $scope.jbty.Id == 48) {
            $scope.ty = $scope.jbty.Id;
        }
    }

    $scope.saveNewAssetModel = function (newModel, $event) {

        if (newModel == null) {
            alert('Please enter name.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        if (newModel.Name == null) {
            alert('Please enter name.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        if ($scope.s == null) {
            alert('Please select asset type.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        var SelTypeGroup = {
            Name: newModel.Name,
            Description: newModel.Description,
            AssetTypeId: $scope.s.id,
            Id: -1,
            insupddelflag: 'I'
        };


        var req = {
            method: 'POST',
            url: '/api/AssetModel/SaveAssetModel',
            //headers: {
            //    'Content-Type': undefined
            data: SelTypeGroup
        }
        $http(req).then(function (response) {

            //$scope.showDialog("Saved successfully!");

            $scope.GetDashBoardDetails();
            $scope.newModel = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.newModel = null;
        });

    }

    $scope.SetAssetModel = function (a) {
        $scope.selectedEqipType = a;
        $scope.selectedAsstType = a;
        $scope.atn = a.AssetTypeId;
        $scope.amodel = a.AssetModelHierId;
        $scope.newAssetActive = 1;
    }
    //$scope.saveNewAsset = function ($event) {
    //    var newAsset = $scope.newAsset;
    //    if (newAsset == null) {
    //        alert('Please enter the equipment name');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }
    //    if (newAsset.Name == null) {
    //        alert('Please enter the equipment name');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }
    //    if ($scope.selectedEqipType == null) {
    //        alert('Please select an equipment model');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }
    //    if ($scope.selectedEqipType.id == null) {
    //        alert('Please select an equipment model');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }
    //    //if ($scope.selectedEqipType.AssetType == null) {
    //    //    alert('Please select an equipment model');
    //    //    return;
    //    //}
    //    if ($scope.selectedEqipType.AssetTypeId == null) {
    //        alert('Please select an equipment model');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }
    //    if ($scope.nl == null) {
    //        alert('Please select a location');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }
    //    if ($scope.nl.id == null) {
    //        alert('Please select a location');
    //        $event.stopPropagation();
    //        $event.preventDefault();
    //        return;
    //    }

    //    var newAsset1 = {
    //        Id: -1,
    //        Name: newAsset.Name,
    //        Description: newAsset.Description,
    //        Active: ($scope.newAssetActive == null) ? 0 : $scope.newAssetActive,//selectedRole.Active, 
    //        AsstMDLHierarID: $scope.selectedEqipType.AssetModelHierId,
    //        AssetModelId: $scope.selectedEqipType.id,
    //        ParentID: null,
    //        RootAssetID: -1,
    //        LocationId: $scope.nl.id,
    //        AssetTypeId: $scope.selectedEqipType.AssetTypeId,
    //        changedById: $scope.userdetails.Id,
    //        insupddelflag: 'I'
    //    };

    //    var req = {
    //        method: 'POST',
    //        url: '/api/Asset/SaveAsset',
    //        data: newAsset1
    //    }
    //    $http(req).then(function (response) {

    //        //$scope.showDialog("Saved successfully!");
    //        $scope.GetDashBoardDetails();

    //        $scope.newAsset = null;
    //        $scope.newAssetModel = null;

    //    }, function (errres) {
    //        var errdata = errres.data;
    //        var errmssg = "";
    //        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
    //        $scope.showDialog(errmssg);

    //    });

    //}
    $scope.AddNewJob = function () {
        var newJob = $scope.newJob;
        if (newJob == null) {
            alert('Please enter Job name.');
            return;
        }
        var phoneformat = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
        if (newJob.PhoneNo != null && newJob.PhoneNo != "") {
            if ((newJob.PhoneNo).match(phoneformat)) {
                $scope.phonevalid = '';
            }
            else {
                if ((newJob.PhoneNo).match(/^\d{10}$/)) {
                    $scope.phonevalid = '';
                }
                else {
                    alert('Phone number format is invalid.');
                    return;
                }
            }
        }
        //job name
        //if (newJob.Name == null) {
        //    alert('Please enter job name.');
        //    return;
        //}
        //Job Type
        if ($scope.jbty == null || $scope.jbty == '' || $scope.jbty.Id == null) {
            alert('Please select Job Type.');
            return;
        }
        //  PhoneNo
        //if (newJob.PhoneNo == null) {
        //    alert('Please select PhoneNo.');
        //    return;
        //}
        //CustomerID
        if (newJob.CustomerId == null) {
            alert('Please select Customer.');
            return;
        }
        //Estimate Start Date
        if (newJob.EstStartDt == null || newJob.EstStartDt == '') {
            alert('Please select  Estimate Start Date.');
            return;
        }
        //Estimate End Date
        if (newJob.EstEndDt == null || newJob.EstEndDt == '') {
            alert('Please select  Estimate End Date.');
            return;
        }
        // AFE
        if (newJob.AFE == null) {
            alert('Please select AFE.');
            return;
        }
        //Field
        if (newJob.Field == null) {
            alert('Please enter Field.');
            return;
        }
        //Well#
        if (newJob.Well == null) {
            alert('Please enter Well number.');
            return;
        }
        //State
        if (($scope.jbty.Id == 48 && newJob.State == null) || ($scope.jbty.Id == 47 && newJob.State == null)) {
            alert('Please select State.');
            return;
        }
        //County
        if (($scope.jbty.Id == 48 && newJob.County == null) || ($scope.jbty.Id == 47 && newJob.County == null)) {
            alert('Please enter County/Parish.');
            return;
        }
        //CoMan
        if (newJob.CoMan == null) {
            alert('Please enter CoMan.');
            return;
        }
        //RigName
        if ($scope.newJob.sss == null) {
            alert('Please enter servicecomp.');
            return;
        }
        //Lease
        if (($scope.jbty.Id == 47 && newJob.Lease == null)) {
            alert('Please Enter Lease.');
            return;
        }
        //OCSG
        if ($scope.jbty.Id == 46 && (newJob.OCSG == null || newJob.OCSG == '')) {
            alert('Select OCSG.');
            return;
        }


        var job = {

            Id: -1,
            Name: newJob.Name,
            JobID: 1,//newJob.JobID,          
            AFE: newJob.AFE,
            LocationID: '',//newJob.LocationId.id,
            CustomerID: newJob.CustomerId.Id,
            StatusId: 7,//newJob.StatusId,
            ProjDesc: newJob.ProjDesc,
            EstStartDt: newJob.EstStartDt,
            EstEndDt: newJob.EstEndDt,
            ActualStartDt: newJob.ActStartDt,
            ActualEndDt: newJob.ActEndDt,
            WellNo: newJob.Well,
            RIG: newJob.sss,
            OCSG: newJob.OCSG,
            Supervisor: newJob.Supervisor,
            Lease: newJob.Lease,
            CoMan: newJob.CoMan,
            PhoneNo: newJob.PhoneNo,
            //RigName: newJob.servicecomp,
            //OrderBy: newJob.OrderBy,
            Field: newJob.Field,
            States: (newJob.State == null) ? null : newJob.State.Id,
            County: (newJob.County == null) ? null : newJob.County.Id,
            JobTypeId: ($scope.jbty.Id == null || $scope.jbty.Id == '') ? 0 : $scope.jbty.Id,
            //ShipVia: newJob.ShipVia,
            //ShipTo: newJob.ShiTo,
            changedById: $scope.userdetails.Id,
            insupddelflag: 'I'
        }

        var req = {
            method: 'POST',
            url: '/api/Jobs/SaveJobDetails',
            data: job
        }
        $http(req).then(function (response) {

            //alert("Saved successfully!");
            //$scope.getJobsListByStatus();
            $scope.GetDashBoardDetails();
            $scope.newJob = null;
            $('#Modal-header-newJob').modal('hide');
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
        $scope.currGroup = null;
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

    $scope.GotToAssetDetails = function (aid) {
        $localStorage.assetDetailsId = aid;
        window.location.href = "AssetDetails.html?assetId=" + aid;
    }

    $scope.GotToAssetModelDetails = function (aid) {
        $localStorage.assetModelId = aid;
        window.location.href = "AssetModelDetails.html";
    }

    $scope.GoToJobDetails = function (aid) {
        $localStorage.nJobId = aid;
        window.location.href = "JobDetails.html";
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
