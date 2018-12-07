// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'AdalAngular']);

myapp1.filter('FilteredJobs', function () {
    return function (items, locid, statusid, custid) {
        var filtered = [];

        for (var i = 0; i < items.length; i++) {
            if ((item[i].LocationID == locid || locid == null)
                && (item[i].CustomerID == custid || custid == null)
                && (item[i].StatusId == statusid || statusid == null)) {
                filtered.push(items[i]);
            }

        }
        return filtered;
    };
});

var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $filter, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.roleLocations = $localStorage.roleLocation;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    var tloc = '';
    var tjst = '';
    var tcst = '';
    $scope.init = function () {

        $http.get('/api/GetCustomers').then(function (res, data) {
            $scope.Customers = res.data;
            //$localStorage.customerdatajobs=$scope.Customers
        });

        $http.get('/api/Types/TypesByGroupId?groupid=3').then(function (res, data) {
            $scope.jobStatus = res.data;
            var st = [];
            if ($scope.jobStatus) {
                for (var i = 0; i < $scope.jobStatus.length; i++) {
                    if ($scope.jobStatus[i].Id != 32 && $scope.jobStatus[i].Id != 29) {
                        st.push($scope.jobStatus[i]);
                    }
                }
                $scope.jbstatus = st;
                //$localStorage.jobstatusdata = $scope.jbstatus;
            }
        });

        $http.get('/api/Types/TypesByGroupId?groupid=10').then(function (res, data) {
            $scope.jobtypes = res.data;
        });

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
            //$localStorage.locationdatajobs = $scope.Locations;
        });

        var locationId = ($scope.s == null) ? -1 : $scope.s.id;
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

        $scope.getJobsListByStatus();
    }
    $scope.filteroptionssel = function () {
        if ($scope.s == null) {
            tloc = -1
        }
        if ($scope.cc == null) {
            tjst = -1;
        }
        if ($scope.a == null) {
            tcst = -1;
        }
    }
    $scope.Changejobtype = function () {
        if ($scope.jbty.Id == 46 || $scope.jbty.Id == 47 || $scope.jbty.Id == 48) {
            $scope.ty = $scope.jbty.Id;
        }
    }

    //$rootScope.spinner = {
    //    active: false,
    //    on: function () {
    //        this.active = true;
    //    },
    //    off: function () {
    //        this.active = false;
    //    }
    //}
    $scope.GetCounty = function (code) {
        $scope.dd = code;
        $http.get('/api/Types/GetCounty?Id=' + $scope.dd.Id).then(function (res, data) {
            $scope.county = res.data;
        });
    }
    //$rootScope.spinner.on();


    $scope.getJobsListByStatus = function () {
        $scope.jobsList1 = null;

        var locId = ($localStorage.jlocid == -1 || $localStorage.jlocid == null) ? (($scope.s == null) ? -1 : $scope.s.id) : (($scope.s != null) ? $scope.s.id : $localStorage.jlocid);
        //var locId = ($scope.s == null || $scope.s.id == null) ? -1 : $scope.s.id;
        var custId = ($localStorage.jcustId == -1 || $localStorage.jcustId == null) ? (($scope.cc == null) ? -1 : $scope.cc.Id) : (($scope.cc != null) ? $scope.cc.Id : $localStorage.jcustId);
        //var custId = ($scope.cc == null || $scope.cc.Id == null) ? -1 : $scope.cc.Id;
        var stausId = ($localStorage.jstausId == -1 || $localStorage.jstausId == null) ? (($scope.a == null) ? -1 : $scope.a.Id) : (($scope.a != null) ? $scope.a.Id : $localStorage.jstausId);
       
        //var statusId = ($scope.a == null || $scope.a.Id == null) ? -1 : $scope.a.Id;

        var tt = (locId != -1) ? ((tloc == -1) ? -1 : locId) : locId;
        var tcus = (custId != -1) ? ((tjst == -1) ? -1 : custId) : custId;
        var ttcus = (stausId != -1) ? ((tcst == -1) ? -1 : stausId) : stausId;

        $http.get('/api/Jobs/GetJobsByStatus?statusId=' + ttcus + '&locationId=' + tt + '&customerId=' + tcus).then(function (res, data) {
            $scope.jobsList1 = res.data.Table;
            $scope.jobsList = res.data.Table1;
            $localStorage.jlocid = tt;
            $localStorage.jcustId = tcus;
            $localStorage.jstausId = ttcus;
            tloc = '';
            tjst = '';
            tcst = '';
           
            if ($localStorage.jlocid != -1 && $scope.Locations!=null) {
                for (var i = 0; i < $scope.Locations.length; i++) {
                    if ($localStorage.jlocid == $scope.Locations[i].id) {
                        $scope.s = $scope.Locations[i];
                    }
                }
            }

            if ($localStorage.jstausId != -1 && $scope.jbstatus!=null) {
                for (var j = 0; j < $scope.jbstatus.length; j++) {
                    if ($localStorage.jstausId == $scope.jbstatus[j].Id) {
                        $scope.a = $scope.jbstatus[j];
                    }
                }
            }

            if ($localStorage.jcustId != -1 && $scope.Customers!=null) {
                for (var i = 0; i < $scope.Customers.length; i++) {
                    if ($localStorage.jcustId == $scope.Customers[i].Id) {
                        $scope.cc = $scope.Customers[i];
                    }
                }
            }
            //$scope.DeliveryTicket = '';
            if ($scope.jobsList1 != null) {
                for (var i = 0; i < $scope.jobsList1.length; i++) {
                    $scope.jobsList1[i].DeliveryTicket = $filter('filter')($scope.jobsList, { ID: $scope.jobsList1[i].ID }, true)[0].DeliveryTicket;
                }
            }
            //$rootScope.spinner.off();
            $("#jobslist-content").show();
        });
        $scope.CheckCanCreate(locId);
    }

    $scope.GetNewJobData = function () {
        $http.get('/api/Types/getstates').then(function (res, data) {
            $scope.States = res.data;
        });
    }

    $scope.chekphoneno = function (src) {
        var currStr = ($scope.newJob == null) ? '' : $scope.newJob.PhoneNo;
        var phone = ($scope.newJob == null || $scope.newJob.PhoneNo == null) ? src.key : $scope.newJob.PhoneNo + src.key;
        var phoneNum = /^^\+[1-9]{1}[0-9]{7,11}$ /;
        if (phone.match(phoneNum)) {
            return true;
        }
        else {
            //document.getElementById("phone").className = document.getElementById("phone").className + " error";
            // $scope.newJob.PhoneNo = currStr;
            src.preventDefault();
            $event.cancel();
            return false;
        }
    }


    $scope.TypeGroupsData = function () {
        var vc = {
            includeState: '1',
        };

        var req = {
            method: 'POST',
            url: '/api/Types/TypeGroupsData',
            data: vc
        }

        $http(req).then(function (res) {
            $scope.Typesdata = res.data.Table;
        });
    }

    $scope.AddNewJob = function () {
        var newJob = $scope.newJob;

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

        if (newJob == null) {
            alert('Please enter Job name.');
            return;
        }
        ////job name
        //if (newJob.Name == null) {
        //    alert('Please enter job name.');
        //    return;
        //}
        //Job type
        if ($scope.jbty == null || $scope.jbty == '' || $scope.jbty.Id == null) {
            alert('Select Job Type.');
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
        //  //PhoneNo
        //if (newJob.PhoneNo == null) {
        //    alert('Please select PhoneNo.');
        //    return;
        //}
        //  PhoneNo
        //if (($scope.newJob.PhoneNo).length < 10 || ($scope.newJob.PhoneNo).length > 10) {
        //    alert('Phone Number should be 10 digits');
        //    return;
        //}
        //CustomerID
        if (newJob.CustomerId == null) {
            alert('Please select Customer.');
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
        //Rig
        //if (newJob.Rig == null) {
        //    alert('Please enter Rig.');
        //    return;
        //}
        //State
        if (($scope.jbty.Id == 48 && newJob.State == null) || ($scope.jbty.Id == 47 && newJob.State == null)) {
            alert('Please Select State.');
            return;
        }
        //county
        if (($scope.jbty.Id == 48 && newJob.County == null) || ($scope.jbty.Id == 47 && newJob.County == null)) {
            alert('Please Select county.');
            return;
        }
        //CoMan
        if (newJob.CoMan == null) {
            alert('Please enter CoMan.');
            return;
        }
        //Service Company
        if (newJob.servicecomp == null) {
            alert('Please enter Service Company.');
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
            Name: null,//newJob.Name,
            JobID: 1,//newJob.JobID,          
            AFE: newJob.AFE,
            LocationID: ($scope.newJob.LocationId == null) ? null : $scope.newJob.LocationId.id,
            CustomerID: newJob.CustomerId.Id,
            StatusId: 7,//newJob.StatusId,
            ProjDesc: newJob.ProjDesc,
            EstStartDt: newJob.EstStartDt,
            EstEndDt: newJob.EstEndDt,
            ActualStartDt: newJob.ActStartDt,
            ActualEndDt: newJob.ActEndDt,
            WellNo: newJob.Well,
            RIG: newJob.servicecomp,
            OCSG: newJob.OCSG,
            Supervisor: newJob.Supervisor,
            Lease: newJob.Lease,
            CoMan: newJob.CoMan,
            PhoneNo: newJob.PhoneNo,
            //RigName: newJob.RigName,
            //OrderBy: newJob.OrderBy,
            Field: newJob.Field,
            County: (newJob.County == null) ? null : newJob.County.Id,
            States: (newJob.State == null) ? null : newJob.State.Id,
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
            $scope.getJobsListByStatus();
            $scope.newJob = null;
            $scope.jbty = '';
            $('#Modal-header-new').modal('hide');
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $('#Modal-header-new').modal('hide');
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


