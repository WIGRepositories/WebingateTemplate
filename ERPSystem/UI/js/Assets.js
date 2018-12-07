// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal,$filter, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.CanCreate = 0;
    $scope.selectedvalue = '10';
    $scope.selectgoto = 1;
    $scope.ty = '-1';
    var tttt = '';
    var ttt = '';
    var ttloc = '';
    var tlloc = '';
    //$scope.s = ['-1'];
    $scope.roleLocations = $localStorage.roleLocation;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    }
    $scope.testing = function () {
        if ($scope.s == null) {
            tttt = -1;
        }
        if ($scope.tty == null) {
            ttt = -1;
        }
        if ($scope.ty == -1) {
            ttloc = -1;
        }
        if ($scope.l == null) {
            tlloc = -1;
        }
    }
    $rootScope.spinner.on();
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

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
            $scope.Locations1 = res.data;
            //$localStorage.locationdatapopulate = $scope.Locations;
        });
        $scope.TypeGroupsData();


        $http.get('/api/AssetModel/GetAssetModels?locId=-1').then(function (res, data) {
            $scope.Models = res.data;
            $scope.Models1 = res.data;
            //$scope.s = $scope.Models[0];
            //$localStorage.assetmodeldata = $scope.Models;
            $scope.GetAssetsForModel();
        });

    }

    $scope.TypeGroupsData = function () {
        var vc = {
            includeStatus: '1',
            includeInspectionVendors: '1',
            includeMaintenanceVendors: '1',
            includeMaterial: '1'
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
            //$localStorage.typedatastoring = $scope.Typesdata;
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
    $scope.Changerental = function () {

        if ($scope.newAsset.Rental == '1') {
            $scope.tt = $scope.newAsset.Rental;
        }
        else if ($scope.newAsset.Rental == null || $scope.newAsset.Rental == '') {
            $scope.tt = $scope.newAsset.Rental;
        }
    }

    $scope.saveNewAsset = function (newAsset) {

        var newAsset = $scope.newAsset;
        if ($scope.newAsset.Rental == '1' && $scope.mtl == null) {
            alert('Please select Material.');
            return;
        }

        if ($scope.newAsset.Rental == '1' && newAsset.JobRate == null) {
            alert('Please Enter Rental Day Rate.');
            return;
        }

        if (newAsset == null) {
            alert('Please enter the equipment name');
            return;
        }
        if (newAsset.Name == null) {
            alert('Please enter the equipment name');
            return;
        }
        if ($scope.newAssetModel == null) {
            alert('Please select an equipment model');
            return;
        }
        if ($scope.newAssetModel.id == null) {
            alert('Please select an equipment model');
            return;
        }
        if ($scope.newAssetModel.AssetType == null) {
            alert('Please select an equipment model');
            return;
        }
        if ($scope.newAssetModel.AssetTypeId == null) {
            alert('Please select an equipment model');
            return;
        }
        if (newAsset.Description == null) {
            alert('Please select a Description');
            return;
        }
        //if ($scope.nl.id == null) {
        //    alert('Please select a location');
        //    return;
        //}
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
        //if ($scope.mtl == null || $scope.mtl.Id == null) {
        //    alert('Please select a JobRate');
        //    return;
        //}
        if (newAsset.DayRate == null) {
            alert('Please select a DayRate');
            return;
        }
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
        //if (newAsset.Notes == null) {
        //    alert('Please select a Notes');
        //    return;
        //}
        var newAsset1 = {
            Id: -1,
            Name: newAsset.Name,
            Description: newAsset.Description,
            Active: ($scope.newAsset.Active == null) ? 0 : $scope.newAsset.Active,//selectedRole.Active, 
            AsstMDLHierarID: $scope.newAssetModel.AssetModelHierId,
            AssetModelId: $scope.newAssetModel.id,
            ParentID: null,
            RootAssetID: -1,
            LocationId: ($scope.newAsset.CurrLocation == null) ? null : $scope.newAsset.CurrLocation.id,
            AssetTypeId: $scope.newAssetModel.AssetTypeId,
            changedById: $scope.userdetails.Id,
            CycleCountDate: newAsset.CycleCountDate,
            CurrLocation: ($scope.newAsset.CurrLocation == null) ? null : $scope.newAsset.CurrLocation.id,
            ManufactureId: ($scope.ManufactureId == null) ? null : $scope.ManufactureId.ID,
            DatePurchased: newAsset.DatePurchased,
            UnitPrice: newAsset.UnitPrice,
            //JobRate: '',//newAsset.JobRate,
            Rental: (newAsset.Rental == null || newAsset.Rental == '') ? 0 : newAsset.Rental,
            RentalDayRate: newAsset.RentalDayRate,
            AdditionalDayRate: newAsset.AdditionalDayRate,
            DayRate: newAsset.DayRate,
            PerWeekStbyCharge: newAsset.PerWeekStbyCharge,
            RedressCost: newAsset.RedressCost,
            DateSold: newAsset.DateSold,
            LostDamaged: (newAsset.LostDamaged == null) ? null : newAsset.LostDamaged,
            Price: '',// newAsset.Price,
            InspectionVendorId: ($scope.iv == null) ? null : $scope.iv.Id,
            MaintenanceVendorId: ($scope.mv == null) ? null : $scope.mv.Id,
            StatusId: ($scope.Status == null) ? null : $scope.Status.Id,
            Condition: newAsset.Condition,
            Material: ($scope.mtl == null) ? null : $scope.mtl.Id,
            PurchaseCost: newAsset.PurchaseCost,
            //Customer: ($scope.jc == null) ? null : $scope.jc.Id,
            Customer: '',
            LostLIHDamaged: (newAsset.Lost == null) ? null : newAsset.Lost,
            LocationDate: newAsset.LocationDate,
            Notes: newAsset.Notes,
            insupddelflag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: newAsset1
        }
        $http(req).then(function (response) {
            //$('#  myModalContent.html').modal('hide');
            alert("Saved successfully!");
            $('#Modal-header-new').modal('hide');
            $scope.GetAssetsForModel();

            $scope.newAsset = null;
            $scope.newAssetModel = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $('#Modal-header-new').modal('hide');
            $scope.showDialog1(errmssg);
        });

    }

    $scope.Changerentall = function () {

        if ($scope.currAsset.Rental == '1') {
            $scope.ttt = $scope.currAsset.Rental;
        }
        else if ($scope.currAsset.Rental == '0' || $scope.currAsset.Rental=='') {
            $scope.ttt = $scope.currAsset.Rental;
        }
    }


    $scope.saveAsset = function (currAsset, flag, $event) {
        if (flag == 'D') {
            var candelete = confirm('Do you really wish to delete this asset?');
            if (!candelete) {
                return;
            }
        }
        else {
            if (currAsset == null) {
                alert('Please enter the equipment name');
                return;
            }
            if (currAsset.Name == null || currAsset.Name.trim() == '') {
                alert('Please enter the equipment name');
                $scope.GetAssetsForModel();
                return;
            }
            if ($scope.currAsset.Rental == '1' && ($scope.mtl == null ||$scope.mtl=='')) {
                alert('Please select Material.');
                return;
            }

            if ($scope.currAsset.Rental == '1' && (currAsset.RentalDayRate == null || currAsset.RentalDayRate+''=='')) {
                alert('Please Enter Rental Day Rate.');
                return;
            }

            if ($scope.currAsset.AssetType == 'Mills' || $scope.currAsset.AssetType == 'Shoes') {
                if ($scope.currAsset.Rental == null || $scope.currAsset.Rental == '') {
                    alert('Please Select Rental.');
                    return;
                }
            }
            
            if ((($scope.currAsset.AssetType == 'Mills' && $scope.mtl == null ||$scope.currAsset.AssetType == 'Shoes' && $scope.mtl == null)) ||$scope.currAsset.Rental == '1' && $scope.mtl == null) {
                alert('Please select Material.');
                return;
            }
        
            if (currAsset.AdditionalDayRate == null || currAsset.AdditionalDayRate+''== '') {
                alert('Please Enter AdditionalDayRate.');
                return;
            }
            if (currAsset.PerWeekStbyCharge + '' == '' || currAsset.PerWeekStbyCharge == null) {
                alert('Please Enter PerWeekStbyCharge.');
                return;
            }
            if (currAsset.RedressCost+''== '' || currAsset.RedressCost == null) {
                alert('Please Enter RedressCost.');
                return;

            }
            if (currAsset.PurchaseCost+''== '' || currAsset.PurchaseCost == null) {
                alert('Please Enter PurchaseCost.');
                return;
            }
            if (currAsset.UnitPrice+''== '' || currAsset.UnitPrice == null) {
                alert('Please Enter UnitPrice.');
                return;
            } 
            if (currAsset.Description+''== '' || currAsset.Description == null) {
                alert('Please Enter Description.');
                return;
            }
            if (currAsset.DayRate+''== '' || currAsset.DayRate == null) {
                alert('Please Enter DayRate.');
                return;
            }
            if ($scope.iv == null ||$scope.iv== '') {
                alert('Please Select Inspection Vendor.');
                return;
            } 
            if ($scope.mv== '' || $scope.mv == null) {
                alert('Please Select Maintenance Vendor.');
                return;
            }
            if (currAsset.Condition== '' || currAsset.Condition == null) {
                alert('Please Select Condition.');
                return;
            }
        }

        var newAsset1 = {
            Id: currAsset.ID,
            Name: currAsset.Name,
            Description: currAsset.Description,
            Active: currAsset.Active,
            AsstMDLHierarID: currAsset.AsstMDLHierarID,
            AssetModelId: currAsset.AssetModelId,
            ParentID: currAsset.ParentID,
            RootAssetID: currAsset.RootAssetID,
            LocationId: ($scope.currAsset.CurrLocationid == null) ? null : $scope.currAsset.CurrLocationid.id,
            //CycleCountDate: currAsset.CycleCountDate,
            CycleCountDate: '',
            CurrLocation: ($scope.currAsset.CurrLocationid == null) ? null : $scope.currAsset.CurrLocationid.id,
            ManufactureId: ($scope.mm== null) ? null : $scope.mm.ID,
            JobId: currAsset.JobId,
            DatePurchased: currAsset.DatePurchased,
            UnitPrice: currAsset.UnitPrice,
            //JobRate: currAsset.JobRate,
            Rental: (currAsset.Rental == null || currAsset.Rental == '') ? 0 : currAsset.Rental,//     currAsset.Rental,
            AdditionalDayRate: currAsset.AdditionalDayRate,
            DayRate: currAsset.DayRate,
            PerWeekStbyCharge: currAsset.PerWeekStbyCharge,
            RedressCost: currAsset.RedressCost,
            DateSold: currAsset.DateSold,
            RentalDayRate: currAsset.RentalDayRate,
            LostDamaged: currAsset.LostDamaged,
            Price: '',// currAsset.Price,            
            InspectionVendorId: ($scope.iv == null) ? null : $scope.iv.Id,
            MaintenanceVendorId: ($scope.mv == null) ? null : $scope.mv.Id,
            StatusId: ($scope.st == null) ? null : $scope.st.Id,
            AssetTypeId: currAsset.AssetTypeId,
            Condition: currAsset.Condition,
            Material: ($scope.mtl == null) ? null : $scope.mtl.Id,
            PurchaseCost: currAsset.PurchaseCost,
            Customer: ($scope.jc == null) ? null : $scope.jc.Id,
            LostLIHDamaged: currAsset.Lost,
            LocationDate: currAsset.LocationDate,
            Notes: currAsset.Notes,
            changedById: $scope.userdetails.Id,
            insupddelflag: flag
        };



        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: newAsset1
        }
        $http(req).then(function (response) {

            alert("Updated successfully!");
            $('#Modal-header-primary').modal('hide');
            $scope.GetAssetsForModel();
            $scope.currAsset = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetAssetsForModel();
            $scope.currAsset = null;
        });

    }

    $scope.setLocation = function () {
        $scope.nl = $scope.l;
        if ($scope.s != null) {
            $scope.newAssetModel = $scope.s;
            // $scope.newAssetModel.newAssetType = $scope.s.AssetType
        }

        $scope.newAssetActive = 1;

    }
    $scope.DeleteAsset = function () {

    }

    $scope.stchange = function (a) {

        //id:$scope.a.Name;
        //Status: $scope.Status.Id;
        var Approve = {
            Name: a.Name,
            StatusId: a.assetStatusId.Id,
            change: 'U'

        };

        var req = {
            method: 'POST',
            url: '/api/Asset/UpdateStatus',
            data: Approve
        }
        $http(req).then(function (response) {
            $scope.st = response.data.Table;
            if ($scope.st[0].StatusId != '' || $scope.st[0].StatusId != null) {
                for (var manfCount = 0 ; manfCount < $scope.Typesdata.length; manfCount++) {
                    if ($scope.st[0].StatusId == $scope.Typesdata[manfCount].Id) {
                        a.assetStatusId = $scope.Typesdata[manfCount];
                        a.Locked = $scope.st[0].Locked;
                        break;
                    }
                }
            }


            alert("Status Updated Successfully");
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

    $scope.Logout = function () {
        $localStorage.uname = null;
        $localStorage.userdetails = null;
        $localStorage.isSuperUser = null;
        adalAuthenticationService.logOut();
    }

    $scope.GetCustomers = function () {
        $http.get('/api/Customers/getCustomers').then(function (res, data) {
            $scope.Customers = res.data;
        });
    }

    $scope.GetAssetsForModel = function (flag) {


        var selecting = ($scope.selectedvalue == null) ? 10 : $scope.selectedvalue;
        if (flag == '' || flag == null) {
            $scope.page = ($scope.selectgoto == null || $scope.selectgoto == '') ? 1 : $scope.selectgoto;
        }
        if (flag == 'N') {

            $scope.page++;
            curpage = $scope.page;
            $scope.firstvalue = $scope.secondvalue;
            $scope.secondvalue = curpage * selecting;
            $scope.selectgoto = curpage;
        } else if (flag == 'P') {
            $scope.page--
            curpage = $scope.page;
            $scope.secondvalue = $scope.firstvalue;
            $scope.firstvalue = ($scope.firstvalue - selecting);
            if ($scope.firstvalue == 0) {
                $scope.firstvalue = 1;
            }
            $scope.selectgoto = curpage;
        }
        else {
            $scope.page;
            curpage = $scope.page;
            if ($scope.selectgoto > 1) {

                $scope.secondvalue = curpage * selecting;
                $scope.firstvalue = ($scope.secondvalue - selecting);
            }
            else {
                $scope.selectgoto = 1;
                $scope.firstvalue = 1
                $scope.secondvalue = selecting;
            }
        }
        //var lid = ($scope.l == null) ? -1 : $scope.l.id;
        var lid = ($localStorage.llid == -1 || $localStorage.llid == null) ? (($scope.l == null) ? -1 : $scope.l.id) : (($scope.l != null) ? $scope.l.id : $localStorage.llid);
        var mid = ($localStorage.lmid == -1 || $localStorage.lmid == null) ? (($scope.s == null) ? -1 : $scope.s.id) : (($scope.s != null) ? $scope.s.id : $localStorage.lmid);
        var statusid = ($localStorage.lstatusid == -1 || $localStorage.lstatusid == null) ? (($scope.tty == null) ? -1 : $scope.tty.Id) : (($scope.tty != null) ? $scope.tty.Id : $localStorage.lstatusid);
        var lockid = ($localStorage.llockid == -1 || $localStorage.llockid == null) ? (($scope.ty == -1) ? -1 : $scope.ty) : (($scope.ty != -1) ? $scope.ty : $localStorage.llockid);
        //var lockid = ($scope.ty == null) ? -1 : $scope.ty;

        var tt = (mid != -1) ? ((tttt == -1) ? -1 : mid) : mid;
        var ts = (statusid != -1) ? ((ttt == -1) ? -1 : statusid) : statusid;
        var tloc = (lockid != -1) ? ((ttloc == -1) ? -1 : lockid) : lockid
        var lloc = (lid != -1) ? ((tlloc == -1) ? -1 : lid) : lid;
        $http.get('/api/Asset/GetAssetspaging?modelId=' + tt + '&locationId=' + lloc + '&curpage=' + curpage + '&maxrows=' + selecting + '&statusid=' + ts + '&locked=' + tloc).then(function (res, data) {
            $scope.assets = res.data.Table;
            $scope.paggin = res.data.Table1;
            $scope.assets2 = res.data.Table2;
            $localStorage.lmid = tt;
            $localStorage.lstatusid = ts;
            $localStorage.llockid = tloc + '';
            $scope.ty = $localStorage.llockid;
            $localStorage.llid = lloc;
            tttt = '';
            ttt = '';
            ttloc = '';
            tlloc = '';
            if ($localStorage.lmid != -1 && $scope.Models!== null) {
                for (var i = 0; i < $scope.Models.length; i++) {
                    if ($localStorage.lmid == $scope.Models[i].id) {
                        $scope.s = $scope.Models[i];
                    }
                }
            }

            if ($localStorage.lstatusid != -1 && $scope.Typesdata!= null) {
                for (var j = 0; j < $scope.Typesdata.length; j++) {
                    if ($localStorage.lstatusid == $scope.Typesdata[j].Id) {
                        $scope.tty = $scope.Typesdata[j];
                    }
                }
            }
            if ($localStorage.llid != -1 && $scope.Locations!= null) {
                for (var i = 0; i < $scope.Locations.length; i++) {
                    if ($localStorage.llid == $scope.Locations[i].id) {
                        $scope.l = $scope.Locations[i]
                    }
                }
            }
            if ($scope.assets.length < selecting) {
                $scope.secondvalue = $scope.secondvalue - (selecting - $scope.assets.length);

            }
            var result = [];
            for (var i = 1; i <= $scope.paggin[0].totalpages; i++) {
                result.push(i);
            }
            $scope.jumptotalpages = result;
            //if ($scope.assets.StatusId != '' || $scope.assets.StatusId != null) {
            //    for (var manfCount = 0 ; manfCount < $scope.Typesdata.length; manfCount++) {
            //        if ($scope.assets.StatusId == $scope.Typesdata[manfCount].Id) {
            //            $scope.sta = $scope.Typesdata[manfCount];
            //            break;
            //        }
            //    }
            //}
            //for (i = 0; i < $scope.Typesdata.length; i++) {
            //    if ($scope.Typesdata[i].Id == $scope.assets.StatusId) {
            //        $scope.assets.StatusId = $scope.Typesdata[i];
            //        break;
            //    }
            //}

            $("#assets-content").show();
            $rootScope.spinner.off();
        });

        //check if he is a location admin and accordingly enable assets and jobs creation for his location
        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanCreate = ($scope.isSuperUser == 1) ? 1 : 0;
        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            //$scope.CanCreate = 0;

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if (lid == $scope.roleLocations[cnt].LocationId) {
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
  
    //sart edit asset
    $scope.EditAsset = function (a) {
        $scope.currAsset = a;
        $scope.Active = a.Active + '';
        if ($scope.currAsset.ManufactureId != '' || $scope.currAsset.ManufactureId != null) {
            for (var manfCount = 0 ; manfCount < $scope.assets2.length; manfCount++) {
                if ($scope.currAsset.ManufactureId == $scope.assets2[manfCount].ID) {
                    $scope.mm = $scope.assets2[manfCount];
                    break;
                }
            }
        }

        if ($scope.currAsset.StatusId != '' || $scope.currAsset.StatusId != null) {
            for (var manfCount = 0 ; manfCount < $scope.Typesdata.length; manfCount++) {
                if ($scope.currAsset.StatusId == $scope.Typesdata[manfCount].Id) {
                    $scope.st = $scope.Typesdata[manfCount];
                    break;
                }
            }
        }
        //InspectionVendor
        if ($scope.currAsset.InspectionVendor != '' || $scope.currAsset.InspectionVendor != null) {
            for (var manfCount = 0 ; manfCount < $scope.Typeinit.length; manfCount++) {
                if ($scope.currAsset.InspectionVendor == $scope.Typeinit[manfCount].Id) {
                    $scope.iv = $scope.Typeinit[manfCount];
                    break;
                }
            }
        }
        //MaintenanceVendor
        if ($scope.currAsset.MaintenanceVendor != '' || $scope.currAsset.MaintenanceVendor != null) {
            for (var manfCount = 0 ; manfCount < $scope.Typemain.length; manfCount++) {
                if ($scope.currAsset.MaintenanceVendor == $scope.Typemain[manfCount].Id) {
                    $scope.mv = $scope.Typemain[manfCount];
                    break;
                }
            }
        }

        //material
        if ($scope.currAsset.Material != '' || $scope.currAsset.Material != null) {
            for (var inspCount = 0; inspCount < $scope.materiallist.length; inspCount++) {
                if ($scope.currAsset.Material == $scope.materiallist[inspCount].Id) {
                    $scope.currAsset.Material = $scope.materiallist[inspCount];
                    break;
                }
            }
        }

        //CurrLocation
        if ($scope.currAsset.CurrLocation != '' || $scope.currAsset.CurrLocation != null) {
            for (var manfCount = 0 ; manfCount < $scope.Locations1.length; manfCount++) {
                if ($scope.currAsset.CurrLocation == $scope.Locations1[manfCount].name) {
                    $scope.currAsset.CurrLocationid = $scope.Locations1[manfCount];
                    break;
                }
            }
        }
        if ($scope.currAsset.Condition != null) {
            $scope.currAsset.Condition = $scope.currAsset.Condition + "";

        }
        if ($scope.currAsset.Rental != null || $scope.currAsset.Rental != '') {
            $scope.currAsset.Rental = $scope.currAsset.Rental + "";
            $scope.Changerentall();

        }
        //$scope.CheckCanCreate(a.LocationId);
    }
    //end edit asset

    $scope.GotToAssetDetails = function (aid) {
        $localStorage.assetDetailsId = aid;
        window.location.href = "AssetDetails.html";
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

