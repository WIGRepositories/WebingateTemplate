// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'angularFileUpload', 'AdalAngular'])


myapp1.directive('datepicker', function ($timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            onChange: '&'
        },
        link: function (scope, element, attrs) {
            //alert(attrs['startdate']);
            element.datepicker({
                dateFormat: "mm-dd-yyyy",
                multidate: true,
                startDate: attrs['startdate'],
                endDate: attrs['enddate']
                //all your options here
            }).on('changeDate', function (e) {

                $timeout(function () {
                    scope.onChange({ arg1: e.dates });
                }, 0);

                //scope.$apply(function (scope) {
                //    scope.onChange({arg1: e.dates });                    
                //});
            });
        }
    };
});

myapp1.filter('customSplitString', function () {
    return function (input) {
        if (input == null) return null;
        var arr = input.split(',');
        return arr;
    };
});

myapp1.filter('filterSequence', function () {
    return function (seqlistty, input) {
        if (input == null) return null;
        //if input = 1 then filter for equipment
        var addseq;
        var filteredSeq = [];
        for (i = 0; i < seqlistty; i++) {

            addseq = true;

            switch (input) {
                //filter for equipment
                case 1:

                    for (j = 0; j < $scope.jobusers.length; j++) {
                        if ($scope.jobusers[j].Sequence == i) {
                            addUser = false;
                        }
                    }

                    break;
                    //filter for users
                case 2:

                    for (j = 0; j < $scope.resources.length; j++) {
                        if ($scope.resources[j].Sequence == i && $scope.resources[j].IsVoid == 0) {
                            addUser = false;
                        }
                    }

                    break;
                    //filter for delivery tickets
                case 3:

                    for (j = 0; j < $scope.deldetails.length; j++) {
                        if ($scope.deldetails[j].Sequence == i) {
                            addUser = false;
                        }
                    }

                    break;
            }



            if (addUser) {
                filteredSeq.push(i);
            }
        }

        return filteredSeq;
    };
});

var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $filter, fileReader, adalAuthenticationService) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.roleLocations = $localStorage.roleLocation;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $scope.newCheckedArr = new Array();
    $scope.checkedArr = new Array();
    $scope.uncheckedArr = new Array();
    $scope.datecol = new Array();
    $scope.IsFileExtnInvalid = false;
    $scope.ReturnDtInvalid = false;

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

    $scope.GetJobConfig = function () {

        $scope.selJobId = $localStorage.nJobId;//$scope.parseLocation(window.location.search)['jobId'];
        $localStorage.nJobId = null;
        $http.get('/api/Types/getstates').then(function (res, data) {
            $scope.States = res.data;
        });

        $http.get('/api/GetCustomers').then(function (res, data) {
            $scope.Customers = res.data;
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
            }
        });

        $http.get('/api/Types/TypesByGroupId?groupid=5').then(function (res, data) {
            $scope.docTypes = res.data;
        });

        $http.get('/api/Users/GetUsers?cmpId=1').then(function (res, data) {
            $scope.User = res.data;
        });

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
        });
        $http.get('/api/Types/TypesByGroupId?groupid=10').then(function (res, data) {
            $scope.jobtypes = res.data;
        });
        $http.get('/api/Jobs/GetJobsList').then(function (res, data) {
            $scope.jobsList = res.data;
            $scope.jobsList1 = $scope.jobsList;

            //if no selected job, then populate first job by default
            if ($scope.selJobId == null) {
                if ($scope.jobsList.length > 0) {
                    $scope.getJobDetails($scope.jobsList[0].ID);
                    $scope.selJobId = $scope.jobsList[0].ID;
                    return;
                }
            }
            else {
                $scope.getJobDetails($scope.selJobId);
            }
        });
    }
    $scope.GetCounty = function (state) {
        //$scope.dd = code;

        $http.get('/api/Types/GetCounty?Id=' + state.Id).then(function (res, data) {
            $scope.county = res.data;

            if ($scope.currJob.County != '' || $scope.currJob.County != null) {
                for (var manfCount = 0 ; manfCount < $scope.county.length; manfCount++) {
                    if ($scope.currJob.County == $scope.county[manfCount].Id) {
                        $scope.County = $scope.county[manfCount];
                        break;

                    }
                }
            }
            $scope.Changejobtype();
        });

    }

    $scope.GetStatus = function () {
        $http.get('/api/Jobs/GetJobStatus').then(function (res, data) {
            $scope.jbstatus = res.data;
        });
    }
    $scope.Changejobtype = function () {
        if ($scope.jbty.Id == 46 || $scope.jbty.Id == 47 || $scope.jbty.Id == 48) {
            $scope.ty = $scope.jbty.Id;
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
    $scope.toggle = function (item) {

        var idx = $scope.newCheckedArr.indexOf(item);
        if (idx > -1) {
            $scope.newCheckedArr.splice(idx, 1);
        }
        else {
            $scope.newCheckedArr.push(item);
        }
        //alert($scope.newCheckedArr);

        //var idx = $scope.uncheckedArr.indexOf(item);
        //if (idx > -1) {
        //    $scope.uncheckedArr.splice(idx, 1);
        //}
        //else {
        //    $scope.uncheckedArr.push(item);
        //}
        //alert($scope.checkedArr.length + '' + $scope.uncheckedArr.length);
    };
    //$scope.exists = function (item, list) {
    //    if (list == null) return false;
    //    return list.indexOf(item) > -1;
    //};

    $scope.GetUsersForJobUss = function () {
        $http.get('/api/Jobs/GetJobDetailsJobUsers?jobId=' + $scope.j.ID).then(function (res, data) {
            $scope.jobusers = res.data;
        });
        $scope.FilterSequence(2);
    }

    $scope.getJobDetailsEquipment = function (dd) {
        $scope.ddd = dd;
        $http.get('/api/Jobs/GetJobDetailsEquipment?jobId=' + $scope.ddd).then(function (res, data) {
            $scope.resources = res.data;
            // $scope.checkedArr = $filter('filter')($scope.resources, { selected: "1" });
            //$scope.uncheckedArr = $filter('filter')($scope.resources, { selected: "0" });
        });
    }


    $scope.getJobsListByStatus = function () {

        $scope.jobsList1 = null;
    }

    $scope.getJobDetails = function (selJobId) {

        //$scope.currJob = null;
        $scope.jobusers = [];
        $scope.resources = [];
        $scope.tresources = [];
        $scope.jobdocs = [];
        $scope.CanEdit = ($scope.isSuperUser == 1) ? 1 : 0;
        if (selJobId == null) {
            return;
        }
        //    $rootScope.spinner.on();
        $http.get('/api/Jobs/GetJobDetails?jobId=' + selJobId).then(function (res, data) {
            $scope.currJob = res.data.Table[0];
            $scope.currJob.EstStartDt = getdateFormat($scope.currJob.EstStartDt);
            $scope.currJob.EstEndDt = getdateFormat($scope.currJob.EstEndDt);
            $scope.currJob.ActualEndDt = getdateFormat($scope.currJob.ActualEndDt);
            $scope.currJob.ActualStartDt = getdateFormat($scope.currJob.ActualStartDt);

            $scope.EEstStartDt = ($scope.currJob.ActualStartDt == null) ? $scope.currJob.EstStartDt : $scope.currJob.ActualStartDt;
            $scope.EEstEndDt = ($scope.currJob.ActualEndDt == null) ? $scope.currJob.EstEndDt : $scope.currJob.ActualEndDt;

            $scope.resources = res.data.Table1;
            $scope.jobusers = res.data.Table2;
            //$scope.tresources = res.data.Table3;
            $scope.jobdocs = res.data.Table4;
            $scope.assetHistory = res.data.Table5;

            $scope.delphone = $scope.currJob.PhoneNo;
            //$scope.delticketid = $scope.currJob.DeliveryTicket;

            var useequ = [];
            for (var a = 0; a < $scope.resources.length; a++) {
                useequ.push($scope.resources[a].Name)
            }

            $scope.dd = useequ;

            if ($scope.jobdocs) {
                if ($scope.jobdocs.length > 0) {
                    for (i = 0; i < $scope.jobdocs.length; i++) {
                        $scope.jobdocs[i].expiryDate = getdateFormat($scope.jobdocs[i].expiryDate);

                    }
                }
            }

            if ($scope.jobsList != null && $scope.jobsList.length > 0) {
                for (i = 0; i < $scope.jobsList.length; i++) {
                    if ($scope.jobsList[i].ID == $scope.currJob.ID) {
                        $scope.j = $scope.jobsList[i];
                        break;
                    }
                }
            }

            //set job status
            if ($scope.jbstatus) {
                if ($scope.jbstatus.length > 0) {
                    for (i = 0; i < $scope.jbstatus.length; i++) {
                        if ($scope.jbstatus[i].Id == $scope.currJob.StatusId) {
                            $scope.js = $scope.jbstatus[i];
                            $scope.a = $scope.jbstatus[i];
                            break;
                        }
                    }
                }
            }
            //set job types

            if ($scope.jobtypes.length > 0) {
                for (i = 0; i < $scope.jobtypes.length; i++) {
                    if ($scope.jobtypes[i].Id == $scope.currJob.JobTypeId) {
                        $scope.jt = $scope.jobtypes[i];
                        $scope.jbty = $scope.jobtypes[i];
                        break;
                    }
                }
            }

            //set customer
            if ($scope.Customers) {
                if ($scope.Customers.length > 0) {
                    for (i = 0; i < $scope.Customers.length; i++) {
                        if ($scope.Customers[i].Id == $scope.currJob.CustomerID) {
                            $scope.jc = $scope.Customers[i];
                            $scope.c = $scope.Customers[i];
                            $scope.cusdel = $scope.Customers[i].Client;
                            break;
                        }
                    }
                }
            }

            //set location
            if ($scope.Locations) {
                if ($scope.Locations.length > 0) {
                    for (i = 0; i < $scope.Locations.length; i++) {
                        if ($scope.Locations[i].id == $scope.currJob.LocationID) {
                            $scope.jl = $scope.Locations[i];
                            $scope.s = $scope.Locations[i];
                            break;
                        }
                    }
                }
            }

            //set state            
            if ($scope.currJob.State != '' || $scope.currJob.State != null) {
                for (var manfCount = 0 ; manfCount < $scope.States.length; manfCount++) {
                    if ($scope.currJob.State == $scope.States[manfCount].Id) {
                        $scope.State = $scope.States[manfCount];
                        $scope.GetCounty($scope.State);
                        break;
                    }
                }
            }

            ////set County            
            //if ($scope.currJob.County != '' || $scope.currJob.County != null) {
            //    for (var manfCount = 0 ; manfCount < $scope.county.length; manfCount++) {
            //        if ($scope.currJob.County == $scope.county[manfCount].Id) {
            //            $scope.County = $scope.county[manfCount];
            //            break;

            //        }
            //    }
            //}


            //check if he is a location admin and accordingly enable assets and jobs creation for his location
            //check the loction of the selected asset
            //if user is not super user then compare with the location of the user
            //if location is mismatching then disable the save button
            $scope.DeliveryTicketList($scope.currJob.ID);

            //if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            //    $scope.CanEdit = 0;

            //    for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
            //        if ($scope.jl.id == $scope.roleLocations[cnt].LocationId) {
            //            $scope.CanEdit = ($scope.roleLocations[cnt].roleid == 2) ? 1 : 0;
            //            break;
            //        }
            //    }
            //}

            //  $rootScope.spinner.off();
        }
        , function (errres) {
            //    $rootScope.spinner.off();
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
    }
    $scope.DeliveryTicketList = function (jobid) {
        $http.get('/api/Jobs/GetDeliveryDetails?jobId=' + jobid).then(function (res, data) {
            $scope.deldetails = res.data;
            //$scope.deldetails[0].DateUsed = getdateFormat($scope.deldetails[0].DateUsed);
            if ($scope.deldetails.length > 0) {
                $scope.deldetails[0].DeliveryDate = getdateFormat($scope.deldetails[0].DeliveryDate);
                $scope.deldetails[0].ReturnDate = getdateFormat($scope.deldetails[0].ReturnDate);


                for (var manfCount = 0 ; manfCount < $scope.deldetails.length; manfCount++) {
                    if ($scope.deldetails[manfCount].DTType == 2) {
                        //get all users
                        $scope.deldetails[manfCount].usersArr = new Array();
                        for (var uc = 0 ; uc < $scope.jobusers.length; uc++) {
                            $scope.deldetails[manfCount].usersArr.push($scope.jobusers[uc].Name);
                        }
                    }
                }
            }
        });
    }
    $scope.jobusers = [];
    $scope.resources = [];
    $scope.tresources = [];
    $scope.comments = [];
    $scope.pre = [];
    $scope.post = [];
    $scope.jobdocs = [];

    $scope.deletedDocs = [];
    $scope.addedUpdatedDocs = [];

    function getdateFormat(date) {
        var formateddate = date;

        if (date) {
            formateddate = $filter('date')(date, 'MM-dd-yyyy');
        }

        return formateddate;
    }

    $scope.Editresources = function (u) {
        $scope.currUser = u;

        $scope.currUser.FromDate = (u.FromDate == null) ? null : getdateFormat(u.FromDate);
        $scope.currUser.ToDate = (u.ToDate == null) ? null : getdateFormat(u.ToDate);
        $scope.FilterSequence(2);
    }

    $scope.AddUser = function (addUser, selU) {
        $scope.currUser = null;
        switch (addUser) {
            //insertion
            case 1:
                if ($scope.ju == null) {
                    alert('Please select a user to add.');
                    $event.stopPropagation();
                    $event.preventDefault();
                    return;
                }
                var idx = IsExists($scope.ju.Id, $scope.jobusers);
                if (idx == -1) {
                    var nuser = {
                        "Name": $scope.ju.Name
                        , "JobId": $scope.currJob.ID
                         , "UserId": $scope.ju.Id
                         , "CreatedById": ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                         , "UpdatedById": ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                         , "Sequence": $scope.jp
                         , "FromDate": ($scope.JobUsers == null) ? null : getdateFormat($scope.JobUsers.fromDt)
                         , "ToDate": ($scope.JobUsers == null) ? null : getdateFormat($scope.JobUsers.toDt)
                         , "insupddelflag": "I"
                    };
                    // $scope.jobusers.push(nuser);
                }
                $scope.currUser = nuser;
                break;
                //updation
            case 2:
                // selU.insupddelflag = 'U';
                var idx = IsExists(selU.UserId, $scope.jobusers);
                if (idx > -1) {
                    selU.CreatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.JobId = $scope.currJob.ID;
                    $scope.currUser = selU;
                    $scope.currUser.insupddelflag = 'U';
                }

                // $scope.currUser = null;

                break;
                //deletion
            case 0:
                var idx = IsExists(selU.UserId, $scope.jobusers);
                if (idx > -1) {
                    selU.CreatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.JobId = $scope.currJob.ID;
                    $scope.currUser = selU;
                    $scope.currUser.insupddelflag = 'D';
                }
                break;
        }

        if ($scope.currUser != null) {
            var req = {
                method: 'POST',
                url: '/api/Jobs/SaveJobUsers',
                data: $scope.currUser
            }
            $http(req).then(function (response) {
                $scope.GetUsersForJobUss();

                $scope.jobusers = response.data.Table;
                $scope.assetHistory = response.data.Table1;
                $scope.DeliveryTicketList($scope.currJob.ID);

                if ($scope.jobusers) {
                    if ($scope.jobusers.length > 0) {
                        for (i = 0; i < $scope.jobusers.length; i++) {
                            $scope.jobusers[i].expiryDate = getdateFormat($scope.jobusers[i].expiryDate);

                        }
                    }
                }

                $scope.currUser = null;
                $scope.jp = null;
                $scope.JobUsers.FromDate = '';
                $scope.JobUsers.ToDate = '';
            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.currUser = null;
                $scope.jp = null;
                $scope.showDialog1(errmssg);
            });
        }
    }

    $scope.EditJobEquipment = function (equip) {
        $scope.CurrJobResources = equip;

        $scope.CurrJobResources.FromDate = (equip.FromDate == null) ? null : getdateFormat(equip.FromDate);
        $scope.CurrJobResources.ToDate = (equip.ToDate == null) ? null : getdateFormat(equip.ToDate);
        $scope.FilterSequence(1);
    }
    $scope.Addresources = function (addres, selU) {

        var fromdate = null;
        var todate = null;
        if ($scope.JobResources && $scope.JobResources.fromDt) {
            fromdate = GetFormattedDate($scope.JobResources.fromDt);
        }

        if ($scope.JobResources && $scope.JobResources.toDt) {
            todate = GetFormattedDate($scope.JobResources.toDt);
        }

        var nuser = null;
        switch (addres) {
            //insertion
            case 1:
                var idx = IsExists($scope.jr.ID, $scope.resources);
                if (idx == -1) {
                    nuser = {
                        "Name": $scope.jr.Name
                        , "JobId": $scope.currJob.ID
                        , "AssetModel": $scope.amid.name
                        , "AssetId": $scope.jr.ID
                        , "CreatedById": ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                        , "UpdatedById": ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                        , "FromDate": fromdate
                        , "ToDate": todate
                        , "Sequence": $scope.Sequence
                        , "insupddelflag": "I"
                    };

                    $scope.JobResources = nuser;

                }
                //$scope.JobEquip = null;
                break;
                //updation
            case 2:
                selU.insupddelflag = 'U';
                var idx = IsAExists(selU.AssetId, $scope.resources);
                if (idx > -1) {
                    selU.CreatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    //selU.SequenceNo = $scope.Sequence;
                    selU.JobId = $scope.currJob.ID;
                    $scope.JobResources = selU;
                }

                //$scope.JobEquip = null;

                break;
                //deletion
            case 0:
                var idx = IsAExists(selU.AssetId, $scope.resources);
                if (idx > -1) {
                    selU.CreatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.JobId = $scope.currJob.ID;
                    $scope.JobResources = selU;
                    $scope.JobResources.insupddelflag = "D";
                }
                break;
        }

        if ($scope.JobResources != null) {
            var req = {
                method: 'POST',
                url: '/api/Jobs/SaveJobEquipment',
                data: $scope.JobResources
            }
            $http(req).then(function (response) {
                //$scope.GetDeliveryTicketEquipment();
                //$scope.showDialog("Saved successfully!");
                //$scope.getJobDetails($scope.modifiedJob.JobId);
                $scope.getJobDetailsEquipment($scope.currJob.ID);
                //$scope.resources = response.data.Table;
                $scope.assetHistory = response.data.Table1;

                if ($scope.resources) {
                    if ($scope.resources.length > 0) {
                        for (i = 0; i < $scope.resources.length; i++) {
                            $scope.resources[i].expiryDate = getdateFormat($scope.resources[i].expiryDate);

                        }
                    }
                }
                $scope.amid.id = '';
                $scope.Assets = [];
                $scope.JobResources = null;
                $scope.jr = null;
                $scope.Sequence = null;

            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.JobResources = null;
                $scope.jr = null;
                $scope.showDialog1(errmssg);
            });
        }
    }

    $scope.Delresources = function (addres, selU) {
        selU.insupddelflag = 'D';
        //var fromdate = null;
        //var todate = null;
        //if ($scope.JobResources.fromDt) {
        //    fromdate = getdateFormat($scope.JobResources.fromDt);
        //}

        //if ($scope.JobResources.toDt) {
        //    todate = getdateFormat($scope.JobResources.toDt);
        //}


        //var nuser = (addres == 0) ? selU : { "Name": $scope.jr.Name, "AssetModel": $scope.amid.name, "AssetId": $scope.jr.ID, "CreatedById": $scope.UserId, "UpdatedById": $scope.UserId, "FromDate": fromdate, "ToDate": todate, "insupddelflag": "I" };

        //var idx = IsAExists(nuser.AssetId, $scope.resources);

        //if (idx == -1) {
        //    if (addres == 1)
        //        $scope.resources.push(nuser);
        //}

        //if (addres == 0) {
        //    $scope.resources.splice(idx, 1);
        //}
    }
    
    $scope.EditTPresources = function (u) {
        $scope.currtpRes = u;
        $scope.currtpRes.FromDate = (u.FromDate == null) ? null : getdateFormat(u.FromDate);
        $scope.currtpRes.ToDate = (u.ToDate == null) ? null : getdateFormat(u.ToDate);
    }
    $scope.AddTresources = function (addTres, selU) {

        var fromdate = null;
        var todate = null;
        if ($scope.tpRes && $scope.tpRes.fromDt) {
            fromdate = GetFormattedDate($scope.tpRes.fromDt);
        }

        if ($scope.tpRes && $scope.tpRes.toDt) {
            todate = GetFormattedDate($scope.tpRes.toDt);
        }

        var nuser = null;
        switch (addTres) {
            //insertion
            case 1:

                if ($scope.tpRes.Name == null) {
                    alert('Please enter Third party resource name.');
                    return;
                }
                if ($scope.tpRes.VName == null) {
                    alert('Please enter Third party resource name.');
                    return;
                }

                var idx = IsTExists($scope.tpRes, $scope.tresources);
                if (idx == -1) {
                    nuser = {
                        "Name": $scope.tpRes.Name
                        , "VName": $scope.tpRes.VName
                         , "JobId": $scope.currJob.ID
                        , "TPResourceId": $scope.tpRes.Id
                        , "CreatedById": ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                        , "UpdatedById": ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                        , "FromDate": fromdate
                        , "ToDate": todate
                        , "insupddelflag": "I"
                    };
                    $scope.currtpRes = nuser;
                }

                break;
                //updation
            case 2:

                if (selU.Name == null) {
                    alert('Please enter Third party resource name.');
                    return;
                }
                if (selU.VName == null) {
                    alert('Please enter Third party resource name.');
                    return;
                }

                selU.insupddelflag = 'U';
                var idx = IsTExists(selU, $scope.tresources);
                if (idx > -1) {
                    selU.CreatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.JobId = $scope.currJob.ID;
                    $scope.JobResources = selU;
                }

                break;
                //deletion
            case 0:
                var idx = IsTExists(selU, $scope.tresources);
                if (idx > -1) {
                    selU.CreatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id
                    selU.JobId = $scope.currJob.ID;
                    $scope.currtpRes = selU;
                    $scope.currtpRes.insupddelflag = "D";
                }
                break;
        }

        if ($scope.currtpRes != null) {
            var req = {
                method: 'POST',
                url: '/api/Jobs/SaveJobTPResource',
                data: $scope.currtpRes
            }
            $http(req).then(function (response) {

                $scope.tresources = response.data.Table;
                $scope.assetHistory = response.data.Table1;

                if ($scope.tresources) {
                    if ($scope.tresources.length > 0) {
                        for (i = 0; i < $scope.tresources.length; i++) {
                            $scope.tresources[i].expiryDate = getdateFormat($scope.tresources[i].expiryDate);

                        }
                    }
                }

                $scope.currtpRes = null;
                $scope.tpRes = null;

            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.currtpRes = null;
                $scope.tpRes = null;
                $scope.showDialog1(errmssg);
            });
        }
    }

    function IsAExists(itemId, arr) {
        var idx = -1;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].AssetId == itemId) {
                idx = i;
                break
            }
        }
        return idx;
    }
    function IsTExists(itemId, arr) {
        var idx = -1;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].Name == itemId.Name && arr[i].VName == itemId.VName) {
                idx = i;
                break
            }
        }
        return idx;
    }

    function IsExists(itemId, arr) {
        var idx = -1;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].UserId == itemId) {
                idx = i;
                break
            }
        }
        return idx;
    }

    $scope.AddNewJob = function () {
        $scope.Jobs = null;
        $scope.jobname = null;
    }

    $scope.addComments = function () { $scope.comments.push({ "Name": $scope.comment }); }
    $scope.addPreComments = function () { $scope.pre.push({ "Name": $scope.prec }); }
    $scope.addPostComments = function () { $scope.post.push({ "Name": $scope.postc }); }

    $scope.DeliveryTicketdetails = function (ticket, flag) {

        if ($scope.delDeldate == null) {
            alert('Please select Delivery Ticket Date.');
            return;
        }
        if ($scope.delorderedby == null) {
            alert('Please select Orderedby.');
            return;
        }
        if ($scope.delShipVia == null) {
            alert('Please Enter Ship Via.');
            return;
        }
        if ($scope.delShipTo == null) {
            alert('Please Enter Ship To.');
            return;
        }
        if ($scope.del == null || $scope.del.Sequence == null || $scope.del.Sequence == 0) {
            alert('Please Select Sequence.');
            return;
        }
        if ($scope.selectedResources.length== 0) {
            $scope.dd = [];          
                var personal = {
                    Personnelid: $scope.delorderedby,
                    SequenceNo: $scope.del.Sequence,
                    JobID : $scope.currJob.ID,
                    insupddelflag : 'I'
                }
                $scope.dd.push(personal);
            
            
                var delt = {
                    Id:-1,
                SequenceNo: $scope.del.Sequence,
                JobID: $scope.currJob.ID,
                DeliveryTicketId:null,//$scope.DeliveryTicket,
                Orderedby: $scope.delorderedby,
                ShipVia: $scope.delShipVia,
                ShipTo: $scope.delShipTo,
                ReturnDate: $scope.delretdate,
                DeliveryDate: $scope.delDeldate,
                DTtype: 2,
                IsVoid: 0,
                changedById: $scope.userdetails.Id,
                DTItems: $scope.datecol,
                DTpersonnel: $scope.dd,
                insupddelflag: 'I',
                //Personnelid: $scope.selectedUsers[0].Id,

            }
            //      DIdetails.push(delt)

            // }
            var req = {
                method: 'POST',
                url: '/api/Jobs/SaveDeliveryTicket',
                //headers: { 'Content-Type': 'application/json' },
                data: delt

            }
            $http(req).then(function (response) {

                //  $scope.getJobDetails(newJob.ID);
                //$scope.showDialog("Saved successfully!");
                //
                alert('Saved successfully!');
                $('#Modal-header-new-createdel').modal('hide');

                $scope.getJobDetails($scope.selJobId);
                $scope.DeliveryTicketList($scope.currJob.ID);
                $scope.datecol = [];

            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.showDialog1(errmssg);
            });
        }
        else {
            // var dtitemsArray = [];
            for (i = 0; i < $scope.selectedResources.length; i++) {
                //if dates is not empty then populate the array
                if ($scope.selectedResources[i].datesArr == null) continue;
                if ($scope.selectedResources[i].datesArr.length > 0) {
                    for (j = 0; j < $scope.selectedResources[i].datesArr.length; j++) {
                        var dtitem = {
                            AssetId: $scope.selectedResources[i].AssetId,
                            usageDate: getdateFormat($scope.selectedResources[i].datesArr[j]),
                            changedById: $scope.userdetails.Id,
                            insupddelflag: 'I'
                        }
                        $scope.datecol.push(dtitem);

                    }
                }
            }

            //  var DIdetails = [];
            // for (var cnt = 0; cnt <$scope.newCheckedArr.length; cnt++) {
            var delt = {
                Id: -1,
                SequenceNo: $scope.del.Sequence,
                JobID: $scope.currJob.ID,
                DeliveryTicketId: null,//$scope.DeliveryTicket,
                Orderedby: $scope.delorderedby,
                ShipVia: $scope.delShipVia,
                ShipTo: $scope.delShipTo,
                ReturnDate: $scope.delretdate,
                DeliveryDate: $scope.delDeldate,
                DTtype: ($scope.selectedUsers == 0) ? 1 : 2,
                // Dates: $scope.newCheckedArr[cnt].dates,
                //AssetId: $scope.newCheckedArr[cnt].AssetId,
                IsVoid: 0,
                changedById: $scope.userdetails.Id,
                DTItems: $scope.datecol,
                DTpersonnel: $scope.dd,
                insupddelflag: flag
            }
            //      DIdetails.push(delt)

            // }
            var req = {
                method: 'POST',
                url: '/api/Jobs/SaveDeliveryTicket',
                //headers: { 'Content-Type': 'application/json' },
                data: delt

            }
            $http(req).then(function (response) {

                //  $scope.getJobDetails(newJob.ID);
                //$scope.showDialog("Saved successfully!");
                //
                alert('Saved successfully!');
                $('#Modal-header-new-createdel').modal('hide');
                $scope.getJobDetails($scope.selJobId);
                $scope.DeliveryTicketList($scope.currJob.ID);
                $scope.datecol = [];

            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.showDialog1(errmssg);
            });
            $scope.currGroup = null;
        }
    }

    $scope.DeliveryTdetails = function (ticket, flag) {
        //if (ticket.DeliveryDate == null) {
        //    alert('Please select Delivery Ticket Date.');
        //    return;
        //}
        if ($scope.dDeliveryDate == null || $scope.dDeliveryDate == '') {
            alert('Please select a DeliveryDate');
            return;
        }
        //if ($scope.dReturnDate == null || $scope.dReturnDate == '') {
        //    alert('Please select a ReturnDate');
        //    return;
        //}
        if ($scope.del.ShipVia == null || $scope.del.ShipVia == '') {
            alert('Please select a ShipVia');
            return;
        }
        if ($scope.del.ShipTo == null || $scope.del.ShipTo == '') {
            alert('Please select a ShipTo');
            return;
        }
        if ($scope.del.orderedby == null) {
            alert('Please select Ordered by.');
            return;
        }
        var newVoidStatus = (ticket[0].isVoid == null || ticket[0].isVoid == 0) ? 1 : 0;

        //check if there are any unvoided tickets for the same given sequence
        if (newVoidStatus == 0) {
            var dtCount = $filter('filter')($scope.deldetails, { Sequence: $scope.del.Sequence, isVoid: 0 });
            if (dtCount.length > 0) {
                $scope.showDialog1('Already active delivery tickets exists for the given sequence');
                return;
            }

        }

        if ($scope.del1.length > 0) {
            for (var manfCount = 0 ; manfCount < $scope.del1.length; manfCount++) {
                //get all dates for the given equipment and fille the datesarr
                //along with that fille the changed and not changed flag
                var currDatesArr = $scope.del1[manfCount].datesArr;

                var datesList = $filter('filter')($scope.del2, { DTItemsId: $scope.del1[manfCount].id });
                if (datesList) {
                    for (var lc = 0; lc < datesList.length; lc++) {

                        var isfound = false;

                        for (var jc = 0; jc < currDatesArr.length; jc++) {

                            //if (currDatesArr[jc].getTime() == new Date(datesList[lc].DateUsed).getTime())
                            if (getdateFormat(currDatesArr[jc]) == getdateFormat(datesList[lc].DateUsed)) {
                                isfound = true;
                                break;
                            }
                        }
                        if (isfound == false) {
                            var dtitem = {
                                AssetId: $scope.del1[manfCount].AssetId,
                                usageDate: getdateFormat(datesList[lc].DateUsed),
                                changedById: $scope.userdetails.Id,
                                insupddelflag: 'D'
                            }
                            $scope.datecol.push(dtitem);
                        }
                    }
                }

                for (var jc = 0; jc < currDatesArr.length; jc++) {
                    var isfound = false;
                    for (var lc = 0; lc < datesList.length; lc++) {
                        //  if (currDatesArr[jc].getTime() == new Date(datesList[lc].DateUsed).getTime()) {
                        if (getdateFormat(currDatesArr[jc]) == getdateFormat(datesList[lc].DateUsed)) {
                            isfound = true;
                            break;
                        }
                    }

                    if (isfound == false) {
                        var dtitem = {
                            AssetId: $scope.del1[manfCount].AssetId,
                            usageDate: getdateFormat(currDatesArr[jc]),
                            changedById: $scope.userdetails.Id,
                            insupddelflag: 'I'
                        }
                        $scope.datecol.push(dtitem);
                    }
                }

            }
        }
        $scope.ddd = [];
        if ($scope.del1.length == 0) {
            var personal = {
                Personnelid: $scope.del1.Id,
                SequenceNo: $scope.del.Sequence,
                JobID: $scope.currJob.ID,
                insupddelflag: 'U'
            }
            $scope.ddd.push(personal);
        }
        var j = {
            Id: ticket[0].Id,
            SequenceNo: $scope.del.Sequence,
            JobID: $scope.currJob.ID,
            DeliveryTicketId: $scope.del.DeliveryTicketId,
            Orderedby: $scope.del.orderedby,
            ShipVia: ticket.ShipVia,
            ShipTo: ticket.ShipTo,
            ReturnDate: ($scope.dReturnDate && $scope.dReturnDate != '') ? getdateFormat($scope.dReturnDate) : '',
            DeliveryDate: getdateFormat($scope.dDeliveryDate),
            IsVoid: $scope.del.isVoid,
            DTItems: $scope.datecol,
            DTpersonnel: $scope.ddd,
            changedById: $scope.userdetails.Id,
            insupddelflag: 'U'
        }
        var req = {
            method: 'POST',
            url: '/api/Jobs/SaveDeliveryTicket',
            headers: { 'Content-Type': 'application/json' },
            data: j
        }
        $http(req).then(function (response) {
            //  $scope.getJobDetails(newJob.ID);
            //$scope.showDialog("Saved successfully!");
            //
            alert('Saved successfully!');
            $('#Modal-header-new-Editdel').modal('hide');
            $scope.getJobDetails($scope.selJobId);
            $scope.datecol = [];

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
        $scope.currGroup = null;
    }


    $scope.GetPrintTicket = function (print) {
        $http.get('/api/Jobs/GetDeliveryTicketPrintByid?Id=' + print.Id + '&Dttype=' + print.DTType).then(function (res, data) {
            //$scope.printticket = res.data;
            openPDF(res.data, print.DeliveryTicketId.replace(/-/g, '#') + '-' + $scope.currJob.JobID.replace(/-/g, '') + '-' + print.titledel + '.pdf');

        });
    }
    $scope.GetPrintchecklist = function (jobid) {
        $http.get('/api/Jobs/GetDeliveryTCheckin?Id=' + jobid).then(function (res, data) {
            //$scope.printticket = res.data;
            openPDF(res.data, 'Checkin-' + $scope.currJob.JobID.replace(/-/g, '') + '.pdf');

        });
    }
    $scope.saveJobDetails = function () {
        var newJob = $scope.currJob;
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
        ////job#
        //if (newJob.JobID == null) {
        //    alert('Please enter Job Id.');
        //    return;
        //}
        //Job type
        if ($scope.jbty == null || $scope.jbty.Id == null || $scope.jbty=='') {
            alert('Select Job Type.');
            return;
        }
        ////Service Company
        //if (newJob.RIG == null) {
        //    alert('Please enter Service Company.');
        //    return;
        //}
        //StatusId
        if ($scope.js == null || $scope.js.Id == null || $scope.js=='') {
            alert('Please select status.');
            return;
        }
        //Field
        if (newJob.Field == null || newJob.Field=='') {
            alert('Please enter Field.');
            return;
        }
        //job name
        //if (newJob.Name == null) {
        //    alert('Please enter job name.');
        //    return;
        //}
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

        //  PhoneNo
        //if (newJob.PhoneNo == null || newJob.PhoneNo == '') {
        //    alert('Please select PhoneNo.');
        //    return;
        //}
        //Well#
        if (newJob.WellNo == null || newJob.WellNo=='') {
            alert('Please enter Well number.');
            return;
        }
        //State
        if (($scope.jbty.Id == 48 && $scope.State == null) || ($scope.jbty.Id == 47 &&  $scope.State == null)) {
            alert('Please Select State.');
            return;
        }
        //county
        if (($scope.jbty.Id == 48 && $scope.County == null) || ($scope.jbty.Id == 47 && $scope.County == null)) {
            alert('Please Select county.');
            return;
        }
        //CoMan
        if (newJob.CoMan == null || newJob.CoMan=='') {
            alert('Please enter CoMan.');
            return;
        }
        //  CustomerID
        if ($scope.jc == null || $scope.jc.Id == null || $scope.jc=='') {
            alert('Please select Customer.');
            return;
        }
        //Lease
        if ($scope.jbty.Id == 47 && (newJob.Lease == null || newJob.Lease == '')) {
            alert('Please Enter Lease.');
            return;
        }
        //OCSG
        if ($scope.jbty.Id == 46 && (newJob.OCSG == null || newJob.OCSG == '')) {
            alert('Please Select OCSG.');
            return;
        }
        // AFE
        if (newJob.AFE == null || newJob.AFE=='') {
            alert('Please select AFE.');
            return;
        }

        var job = {
            Id: newJob.ID,
            Name: newJob.Name,
            JobID: newJob.JobID,
            AFE: newJob.AFE,
            //LocationID: $scope.jl.id,
            CustomerID: $scope.jc.Id,
            StatusId: $scope.js.Id,
            ProjDesc: newJob.ProjDesc,
            EstStartDt: getdateFormat(newJob.EstStartDt),
            EstEndDt: getdateFormat(newJob.EstEndDt),
            ActualStartDt: getdateFormat(newJob.ActualStartDt),
            ActualEndDt: getdateFormat(newJob.ActualEndDt),
            WellNo: newJob.WellNo,
            RIG: newJob.RIG,
            OCSG: newJob.OCSG,
            Supervisor: newJob.Supervisor,
            CoMan: newJob.CoMan,
            //OrderBy: newJob.OrderBy,
            OCSG: newJob.OCSG,
            PhoneNo: newJob.PhoneNo,
            County: ($scope.County == null) ? null : $scope.County.Id,
            States: ($scope.State == null) ? null : $scope.State.Id,
            JobTypeId: ($scope.jbty.Id == null || $scope.jbty.Id == '') ? 0 : $scope.jbty.Id,

            Lease: newJob.Lease,
            //ShipVia: $scope.currJob.ShipVia,
            //ShipTo: $scope.currJob.ShipTo,
            //RigName: newJob.RigName,
            Field: newJob.Field,
            changedById: $scope.userdetails.Id,
            //DeliveryTicket: $scope.currJob.DeliveryTicket,
            //DeliveryDate: $scope.currJob.Deldate,
            insupddelflag: 'U'

            // JobUsers: $scope.jobusers,
            //  JobResouces: $scope.resources,
            //  JobTPResources: $scope.tresources,
            //  JobDocuments:$scope.jobdocs
        }

        var req = {
            method: 'POST',
            url: '/api/Jobs/SaveJobDetails',
            data: job
        }
        $http(req).then(function (response) {
            $http.get('/api/Jobs/GetJobsList').then(function (res, data) {
                $scope.jobsList = res.data;
                $scope.jobsList1 = $scope.jobsList;
                $scope.getJobDetails(newJob.ID);
            });

            $scope.showDialog("Saved successfully!");

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

    $scope.GetUsersForJob = function () {
        $http.get('/api/Jobs/GetUsersForJob?jobId=' + $scope.j.ID).then(function (res, data) {
            $scope.Users = res.data;
        });
        $scope.FilterSequence(2);
    }

    $scope.GetAssetsModels = function () {
        $http.get('/api/AssetModel/GetAssetModels?locId=-1').then(function (res, data) {
            $scope.Models = res.data;
        });
        $scope.FilterSequence(1);
    }

    $scope.GetAssets = function () {
        var locId = ($scope.currJob.LocationID == null) ? -1 : $scope.currJob.LocationID;
        $http.get('/api/Jobs/GetEquipmentForJob?modelId=' + $scope.amid.id + '&locationId=' + locId + '&jobId=' + $scope.currJob.ID).then(function (res, data) {
            $scope.Assets = res.data;
        });
    }

    $scope.validateFile = function ($event) {
    }

    $scope.onFileSelect = function (files, $event) {
        $scope.modifiedJob = null;
        var found = false;
        //check if job already exists 
        for (cnt = 0; cnt < $scope.jobdocs.length; cnt++) {
            if ($scope.jobdocs[cnt].DocName == files[0].name) {
                found = true;
            }
        }

        if (found) {
            alert('Cannot add duplicte documents. Document with the same name already exists.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        var fext = files[0].name.split('.').pop();
        var ext = fext.toLowerCase();
        $scope.IsFileExtnInvalid = (ext != 'pdf' && ext != 'jpg' && ext != 'png' && ext != 'gif');

        fileReader.readAsDataUrl(files[0], $scope, (ext == 'csv') ? 1 : 4).then(function (result) {

            //if (result.length > 2097152)
            //{
            //        alert('Cannot upload file greater than 2 MB.');
            //        $event.stopPropagation();
            //        $event.preventDefault();
            //        return;
            //}

            var doc =
                {
                    Id: ($scope.jobDoc == null) ? -1 : $scope.jobDoc.Id,
                    JobId: $scope.currJob.ID,
                    createdById: ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id,
                    UpdatedById: ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id,
                    FromDate: null,
                    ToDate: null,
                    //  docCatId: $scope.currobj.Id,
                    docTypeId: ($scope.jobDoc == null || $scope.jobDoc.docType == null) ? null : $scope.jobDoc.docType.Id,
                    DocType: ($scope.jobDoc == null || $scope.jobDoc.docType == null) ? null : $scope.jobDoc.docType.Name,//
                    DocName: files[0].name,
                    docContent: result,

                    ExpiryDate: ($scope.jobDoc == null || $scope.jobDoc.ExpiryDate == null) ? null : GetFormattedDate($scope.jobDoc.ExpiryDate),
                    DueDate: ($scope.jobDoc == null || $scope.jobDoc.DueDate == null) ? null : GetFormattedDate($scope.jobDoc.DueDate),

                    insupddelflag: 'I'
                }
            $scope.modifiedJob = doc;

        });
    };

    $scope.EditJobDoc = function (f) {

        for (cnt = 0; cnt < $scope.jobdocs.length; cnt++) {
            if ($scope.jobdocs[cnt].DocName == f.DocName) {
                $scope.assetDoc = $scope.jobdocs[cnt];
                $scope.assetDoc.ExpiryDate = getdateFormat(f.ExpiryDate);
                for (dcnt = 0; dcnt < $scope.docTypes.length; dcnt++) {
                    if ($scope.docTypes[dcnt].Id == f.DocTypeId) {
                        {
                            $scope.assetDoc.dt = $scope.docTypes[dcnt];
                        }
                    }
                }
                break;
            }
        }
    }

    $scope.cancelNewDoc = function () {
        $scope.jobDoc = null;
    }

    $scope.updateDoc = function () {
        if ($scope.assetDoc.dt != null) {
            $scope.assetDoc.docTypeId = $scope.assetDoc.dt.Id;
            $scope.assetDoc.DocType = $scope.assetDoc.dt.Name;
        }
        $scope.assetDoc.insupddelflag = ($scope.assetDoc.Id == -1) ? 'I' : 'U';
        $scope.modifiedJob = $scope.assetDoc;
        $scope.SaveJobDoc();
    }

    $scope.DeleteDoc = function (d) {

        if (d == -1) {
            $scope.assetDoc.slice(d);
        }
        else {
            d.insupddelflag = "D";
            $scope.modifiedJob = d;
            $scope.SaveJobDoc();
        }


    }
    $scope.updateDocType = function () {
        if ($scope.jobDoc != null) {
            $scope.jobDoc.docTypeId = $scope.jobDoc.docType.Id;
            $scope.jobDoc.DocType = $scope.jobDoc.docType.Name;

            $scope.modifiedJob.docTypeId = $scope.jobDoc.docType.Id;
            $scope.modifiedJob.DocType = $scope.jobDoc.docType.Name;
        }
    }
    $scope.updateDocExpDate = function () {

        if ($scope.jobDoc != null) {
            $scope.jobDoc.ExpiryDate = getdateFormat($scope.jobDoc.ExpiryDate);
            $scope.modifiedJob.ExpiryDate = getdateFormat($scope.jobDoc.ExpiryDate);
        }
    }

    $scope.GetFileContent = function (f) {
        // var data = $scope.currobj.files1[0];  
        if (f.DocContent != null) {
            openPDF(f.DocContent, f.DocName);
            return;
        }
        else {
            //get the file content from db
            $http.get('/api/Jobs/GetJobFileContent?docId=' + f.Id).then(function (res, data) {
                $scope.docDetails = res.data[0];
                openPDF($scope.docDetails.DocContent, res.data[0].DocName);
            });
        }
    }

    function openPDF(resData, fileName) {

        var blob = null;
        var ext = fileName.split('.').pop();
        if (ext == 'csv') {
            blob = new Blob([resData], { type: "text/csv" });
            saveAs(blob, fileName);
        }
        else {

            var ieEDGE = navigator.userAgent.match(/Edge/g);
            var ie = navigator.userAgent.match(/.NET/g); // IE 11+
            var oldIE = navigator.userAgent.match(/MSIE/g);

            if (ie || oldIE || ieEDGE) {
                blob = b64toBlob(resData, (ext == 'csv') ? 'text/csv' : 'application/pdf');
                // window.open(blob, '_blank');
                //  window.navigator.msSaveBlob(blob, fileName);
                saveAs(blob, fileName);
                //openReportWindow('test', resData, 1000, 700);
                //window.open(resData, '_blank');
                //  var a = document.createElement("a");
                //  document.body.appendChild(a);
                //  a.style = "display: none";
                //  a.href = resData;
                //  a.download = fileName;
                ////  a.onclick = "window.open(" + fileURL + ", 'mywin','left=200,top=20,width=1000,height=800,toolbar=1,resizable=0')";
                //  a.click(); 

            }
            else {

                if (ext == 'csv' || ext == 'pdf') {
                    blob = b64toBlob(resData, (ext == 'csv') ? 'text/csv' : 'application/pdf');
                    saveAs(blob, fileName);
                }
                else {
                    openReportWindow(fileName, resData, 1000, 700);
                }
                // newWindow =   window.open(resData, 'newwin', 'left=200,top=20,width=1000,height=700,toolbar=1,resizable=0');
                //   timerObj = window.setInterval("ResetTitle('"+fileName+"')", 10);
            }
        }
    }

    var winLookup;
    var showToolbar = false;
    function openReportWindow(m_title, m_url, m_width, m_height) {
        var strURL;
        var intLeft, intTop;

        strURL = m_url;

        // Check if we've got an open window.
        if ((winLookup) && (!winLookup.closed))
            winLookup.close();

        // Set up the window so that it's centered.
        intLeft = (screen.width) ? ((screen.width - m_width) / 2) : 0;
        intTop = 20;//(screen.height) ? ((screen.height - m_height) / 2) : 0;

        // Open the window.
        winLookup = window.open('', 'winLookup', 'scrollbars=no,resizable=yes,toolbar=' + (showToolbar ? 'yes' : 'no') + ',height=' + m_height + ',width=' + m_width + ',top=' + intTop + ',left=' + intLeft);
        checkPopup(m_url, m_title);

        // Set the window opener.
        if ((document.window != null) && (!winLookup.opener))
            winLookup.opener = document.window;

        // Set the focus.
        if (winLookup.focus)
            winLookup.focus();
    }

    function checkPopup(m_url, m_title) {
        if (winLookup.document) {
            //identify the file type and display accordingly
            var ext = m_title.split('.').pop();
            switch (ext) {
                case 'pdf':
                    winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><embed type="application/pdf" src="' + m_url + '" height="100%" width="100%" /></body></html>');
                    break;
                default:
                    winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><img src="' + m_url + '" height="100%" width="100%" /></body></html>');
                    break;
            }

        } else {
            // if not loaded yet
            setTimeout(checkPopup(m_url, m_title), 10); // check in another 10ms
        }
    }

    function b64toBlob(b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function GetFormattedDate(date) {
        if (date == null) return '';
        var todayTime = new Date(date);
        var day = todayTime.getDate();
        var month = todayTime.getMonth() + 1;
        var year = todayTime.getFullYear();
        return new Date(month + "/" + day + "/" + year);
    }

    function GetFormattedDate1(date) {
        if (date == null) return '';
        var todayTime = date.split('/');
        var day = todayTime[0];// todayTime.getDate();
        var month = todayTime[1];//todayTime.getMonth() + 1;
        var year = todayTime[2];//todayTime.getFullYear();
        var dt = new Date(month + "-" + day + "-" + year);
        return $filter('date')(dt, 'MM-dd-yyyy');
    }

    function getdateFormat(date) {
        var formateddate = date;

        if (date) {
            formateddate = $filter('date')(date, 'MM-dd-yyyy');
        }

        return formateddate;
    }

    $scope.GetDetailsEditHistory = function (hist) {
        $http.get('/api/Jobs/GetJobHistoryDetails?ehId=' + hist.Id).then(function (res, data) {
            $scope.detailedhist = res.data;
        });
    }

    $scope.GetDTDetails = function (t) {

        //$scope.del = t;
        $http.get('/api/Jobs/GetDeliveryTDetails?Id=' + t.Id + '&Dttype=' + t.DTType).then(function (res, data) {
            $scope.del = res.data.Table;
            $scope.del1 = res.data.Table1;
            $scope.del2 = res.data.Table2;

            $scope.del.DeliveryTicketId = $scope.del[0].DeliveryTicketId;
            $scope.dDeliveryDate = GetFormattedDate1($scope.del[0].DeliveryDate);
            $scope.dReturnDate = ($scope.del[0].ReturnDate) ? GetFormattedDate1($scope.del[0].ReturnDate) : '';
            $scope.del.ShipVia = $scope.del[0].ShipVia;
            $scope.del.ShipTo = $scope.del[0].ShipTo;
            $scope.del.Sequence = $scope.del[0].Sequence;
            $scope.del.DTType = $scope.del[0].DTType;
            $scope.del.orderedby = $scope.del[0].OrderedBy;
            

            //if ($scope.del[0].OrderedBy != '' || $scope.del[0].OrderedBy != null) {
            //    for (var manfCount = 0 ; manfCount < $scope.User.length; manfCount++) {
            //        if ($scope.del[0].OrderedBy == $scope.User[manfCount].Id) {
            //            $scope.del.orderedby = $scope.User[manfCount];
            //            break;
            //        }
            //    }
            //}

            if ($scope.del1.length > 0) {
                if ($scope.del.DTType == 1) {
                    for (var manfCount = 0 ; manfCount < $scope.del1.length; manfCount++) {
                        //get all dates for the given equipment and fille the datesarr
                        //along with that fille the changed and not changed flag
                        $scope.del1[manfCount].datesArr = new Array();
                        var datesList = $filter('filter')($scope.del2, { DTItemsId: $scope.del1[manfCount].id });
                        if (datesList) {
                            for (var lc = 0; lc < datesList.length; lc++) {
                                $scope.del1[manfCount].datesArr.push(new Date(datesList[lc].DateUsed));
                            }
                        }

                    }
                }
            }
        });
    }

    /*save job documents */
    $scope.GetJobDetailsJobDocs = function (joddocget) {
        $http.get('/api/Jobs/GetJobDetailsJobDocuments?jobId=' + joddocget).then(function (res, data) {
            $scope.jobdocs = res.data;
            if ($scope.jobdocs) {
                if ($scope.jobdocs.length > 0) {
                    for (i = 0; i < $scope.jobdocs.length; i++) {
                        $scope.jobdocs[i].expiryDate = getdateFormat($scope.jobdocs[i].expiryDate);

                    }
                }
            }
        });
    }
    /*save job documents */
    $scope.SaveJobDoc = function (jdoc) {

        if ($scope.modifiedJob == null) {

            alert('Please select a document to upload.');
            return;
        }

        // $scope.modifiedJob.createdById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id;
        $scope.modifiedJob.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id;

        var req = {
            method: 'POST',
            url: '/api/Jobs/SaveJobDocs',
            data: $scope.modifiedJob
        }
        $http(req).then(function (response) {

            //$scope.showDialog("Saved successfully!");
            // $scope.getJobDetails($scope.modifiedJob.JobId);
            $scope.GetJobDetailsJobDocs($scope.currJob.ID)
            //$scope.jobdocs = response.data.Table;
            //$scope.jobdocs = null;
            $scope.assetHistory = response.data.Table1;

            $scope.jobDoc.docType.Id = '';
            $scope.jobDoc.ExpiryDate = null;
            $scope.jobDoc.doc = angular.forEach(
                         angular.element("input[type='file']"),
                                function (inputElem) {
                                    angular.element(inputElem).val(null);
                                });
            $scope.modifiedJob = null;
            $scope.assetDoc = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.modifiedJob = null;
            $scope.assetDoc = null;
            $scope.showDialog1(errmssg);
        });
    }

    $scope.test = function () {
        alert($scope.dDeliveryDate);
    }

    $scope.headers = new Array();
    $scope.test1 = function (item) {
        alert('test1');

        var idx = $scope.datecol.indexOf(item);
        $scope.datecol.push(item.dates);
        if ($scope.datecol.length != 0) {
            //for (var acount = 0; acount < $scope.datecol.length; acount++) {
            //    $scope.headers =$scope.datecol[acount].dates;
            //}
        }

    }
    $scope.FillDatesForAsset = function (did) {

        $scope.selArr = new Array();
        if (did.datesArr.length > 0) {
            for (dt = 0; dt < did.datesArr.length; dt++) {
                $scope.selArr.push(new Date(did.datesArr[dt]));
            }

            $('#dtCal1_' + did.id).datepicker('setDates', $scope.selArr);
        }

        // $('#dtCal1_' + did.id).dates = $scope.selArr;

        //document.getElementById('dtCal_' + did.id).dates = $scope.selArr;
        //$('#dtCal_' + did.id).datepicker('setDates', $scope.selArr);

        //var ele = angular.element($document[0].querySelector('#dtCal1_' + did.id));
        //    ele.datepicker('setDates', $scope.selArr);
    }
    $scope.changedate = function (dt1, d) {

        d.datesArr = $filter('date')(dt1, "MM-dd-yyyy");

    };
    $scope.GetFormattedDateFilter = function (date) {
        if (date == null) return '';
        var todayTime = date;
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        var dt = new Date(month + "/" + day + "/" + year);
        return $filter('date')(dt, "MM-dd-yyyy");
    }
    $scope.FilterEquipmentsUsers = function () {
        //get the sequence and filter accordingly
        $scope.selectedResources = [];
        $scope.selectedUsers = [];
        $scope.selectedResources = $filter('filter')($scope.resources, { Sequence: $scope.del.Sequence });
        $scope.selectedUsers = $filter('filter')($scope.jobusers, { Sequence: $scope.del.Sequence });
    }

    $scope.CheckDatesForDT = function () {
        if ($scope.EEstStartDt == null
            || $scope.EEstEndDt == null
            || $scope.EEstStartDt == ''
            || $scope.EEstEndDt == ''
            ) {
            $scope.showDialog('Delivery Ticket creation requires Estimated Start and End Date for the current Job. Please add this data before creating a Delivery Ticket');
        }
        else {
            $scope.del = null;
            $scope.selectedResources = [];
            $scope.FilterSequence(3);

            //if ($scope.currJob.EstStartDt > $scope.currJob.ActualStartDt) {
            //    $scope.EEstStartDt = getdateFormat($scope.currJob.ActualStartDt);

            //} else {
            //    $scope.EEstStartDt = $scope.currJob.ActualStartDt;
            //}

            //if ($scope.currJob.EstEndDt < $scope.currJob.ActualEndDt) {
            //    $scope.EEstEndDt = getdateFormat($scope.currJob.ActualEndDt);
            //}
            //else {
            //    $scope.EEstEndDt = $scope.currJob.EstEndDt;
            //}

            if ($scope.deldetails.length != 0) {
                //if ($scope.deldetails[0].OrderedBy != null || $scope.deldetails[0].OrderedBy != '') {
                //    for (i = 0; i < $scope.User.length; i++) {
                //        if ($scope.deldetails[0].OrderedBy == $scope.User[i].Id) {
                //            $scope.delorderedby = $scope.User[i];
                //            break;
                //        }
                //    }
                //}
            $scope.delorderedby = $scope.deldetails[0].OrderedBy;
            $scope.delDeldate = $scope.deldetails[0].DeliveryDate;
            $scope.delretdate = $scope.deldetails[0].ReturnDate;
            $scope.delShipVia = $scope.deldetails[0].ShipVia;
            $scope.delShipTo = $scope.deldetails[0].ShipTo;

                $scope.ReturnDtInvalid = ($scope.delDeldate > $scope.delretdate);
            }

            //if deldetails.length > 0
            $('#Modal-header-new-createdel').modal('show');

        }


    }

    $scope.FilterSequence = function (type) {

        var seqlistt = [];
        var addseq = true;

        switch (type) {
            //filter for equipment
            case 1:
                for (var i = 1; i <= 10; i++) {
                    addseq = true;
                    for (j = 0; j < $scope.jobusers.length; j++) {
                        if ($scope.jobusers[j].Sequence == i) {
                            addseq = false;
                        }
                    }
                    if (addseq)
                        seqlistt.push(i);
                }

                $scope.seqlistty = seqlistt;

                break;
                //filter for users
            case 2:

                for (var i = 1; i <= 10; i++) {
                    addseq = true;
                    for (j = 0; j < $scope.resources.length; j++) {
                        if ($scope.resources[j].Sequence == i) {
                            addseq = false;
                        }
                    }
                    if (addseq)
                        seqlistt.push(i);
                }


                $scope.seqlistty1 = seqlistt;


                break;
                //filter for delivery tickets
            case 3:
                for (var i = 1; i <= 10; i++) {
                    addseq = true;
                    for (j = 0; j < $scope.deldetails.length; j++) {
                        if ($scope.deldetails[j].Sequence == i && $scope.deldetails[j].isVoid == 0) {
                            addseq = false;
                        }
                    }
                    if (addseq)
                        seqlistt.push(i);
                }
                $scope.seqlistty2 = seqlistt;
                break;
        }
    }


    $scope.UpdateDTVoid = function (t) {

        var newVoidStatus = (t.isVoid == null || t.isVoid == 0) ? 1 : 0;

        //check if there are any unvoided tickets for the same given sequence
        if (newVoidStatus == 0) {
            var dtCount = $filter('filter')($scope.deldetails, { Sequence: t.Sequence, isVoid: 0 });
            if (dtCount.length > 0) {
                $scope.showDialog1('Already active delivery tickets exists for the given sequence');
                return;
            }

        }
        var dtvoid = {
            Id: t.Id,
            DTtype: t.DTType,
            IsVoid: (t.isVoid == null || t.isVoid == 0) ? 1 : 0,
            JobID: t.JobId,
            changedById: $scope.userdetails.Id,
        }
        var req = {
            method: 'POST',
            url: '/api/Jobs/DeliveryTVoid',
            data: dtvoid
        }
        $http(req).then(function (res) {
            // $scope.getJobDetails(selJobId);
            $scope.deldetails = res.data;
            $scope.deldetails[0].DateUsed = getdateFormat($scope.deldetails[0].DateUsed);
            $scope.deldetails[0].DeliveryDate = getdateFormat($scope.deldetails[0].DeliveryDate);
            $scope.deldetails[0].ReturnDate = getdateFormat($scope.deldetails[0].ReturnDate);

            alert("Saved Successfully");
            $scope.GetJobEditHistory(t.JobId);
        });
    }

    $scope.GetJobEditHistory = function (jobId) {
        $http.get('/api/Jobs/GetJobDetailsJobHistory?jobId=' + jobId).then(function (res, data) {
            $scope.assetHistory = res.data;
        });
    }
    $scope.GotToAssetDetails = function (aid) {
        $localStorage.assetDetailsId = aid;
        window.location.href = "AssetDetails.html";
    }

    $scope.GoToUserDetails = function (userID) {
        $localStorage.navUserId = userID;
        window.location.href = "Userdetails.html";
    }

    $scope.ValidateDTDates = function (opflag) {

        var dtDate = (opflag == 'N') ? $scope.delDeldate: $scope.dDeliveryDate;
        var retDate = (opflag == 'N') ? $scope.delretdate : $scope.dReturnDate;

      //  $scope.DeliveryDtInvalid = ();
        //  $scope.ReturnDtInvalid = (dtDate < retDate);
        if ($scope.delretdate != "" && $scope.delretdate != null && $scope.delretdate != '') {
            $scope.ReturnDtInvalid = (dtDate > retDate);
        }
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