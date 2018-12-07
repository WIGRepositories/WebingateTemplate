// JavaScript source code
//var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'angularFileUpload',  'treasure-overlay-spinner']);
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'angularFileUpload', 'AdalAngular']);

myapp1.directive("ngFileSelect", function () {

    return {
        scope: {
            objDetails: "="
        },
        link: function ($scope, el) {
            el.on('click', function () {
                this.value = '';
            });

            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                // $scope.objDetails.files.push($scope.file);
            });
        }
    };

});


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

myapp1.controller('BasicController', function ($scope, $localStorage, fileReader, $upload, $http, $uibModal, $sce, $filter, $timeout, $rootScope) {
    $scope.CanEdit = 0;
    $scope.CanUploadDoc = 0;
    $scope.HasExipiredDoc = 0;
    $scope.DueDtDoc = 0;
    $scope.tt = '';

    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.CanCreate = 0;

    $scope.roleLocations = $localStorage.roleLocation;

    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    $scope.roleLocations = $localStorage.roleLocation;
    $scope.IsFileExtnInvalid = false;

    $scope.deletedDocs = [];
    $scope.addedUpdatedDocs = [];

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


    $scope.Changerental = function () {

        if ($scope.AssetHierarchy[0].Rental == '1') {
            $scope.tt = $scope.AssetHierarchy[0].Rental;
        }
        else if ($scope.AssetHierarchy[0].Rental == '0' || $scope.AssetHierarchy[0].Rental == null || $scope.AssetHierarchy[0].Rental == '') {
            $scope.tt = $scope.AssetHierarchy[0].Rental;
        }
    }
    var parseLocation = function (location) {
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

    $scope.GetAssetConfig = function () {

        $scope.TypeGroupsData();

        $http.get('/api/Asset/GetWorkOrderStatus?groupid=3').then(function (res, data) {
            $scope.workOrderStatus = res.data.Table;
        });
        $http.get('/api/Asset/GetWorkOrderTypes').then(function (res, data) {
            $scope.workOrderTypes = res.data.Table;
        });

        $http.get('/api/Asset/GetAssetModels').then(function (res, data) {
            $scope.equipmentTypes = res.data.Table;
        });

        $http.get('/api/Asset/GetCompanies').then(function (res, data) {
            $scope.companies = res.data.Table;
        });

        $http.get('/api/Asset/GetAssetConfig').then(function (res, data) {
            $scope.AssetConfig = res.data;


            var InitParams = parseLocation(window.location.search)['assetId'];//var InitParams = $localStorage.assetDetailsId;
            $localStorage.assetDetailsId = null;
            if (InitParams == null) {
                if ($scope.AssetConfig.Table2.length > 0) {
                    $scope.a = $scope.AssetConfig.Table2[0];
                }
            }
            else {
                if ($scope.AssetConfig.Table2.length > 0) {
                    for (i = 0; i < $scope.AssetConfig.Table2.length; i++) {
                        if ($scope.AssetConfig.Table2[i].Id == InitParams) {
                            $scope.a = $scope.AssetConfig.Table2[i];
                            break;
                        }
                    }
                }

            }
            if ($scope.a != null) {
                //set location
                //set asset model
                //set asset
                //populate the asset details

                if ($scope.AssetConfig.Table.length > 0) {
                    for (i = 0; i < $scope.AssetConfig.Table.length; i++) {
                        if ($scope.AssetConfig.Table[i].Id == $scope.a.LocationId) {
                            $scope.l = $scope.AssetConfig.Table[i];
                            break;
                        }
                    }
                }

                if ($scope.AssetConfig.Table1.length > 0) {
                    for (i = 0; i < $scope.AssetConfig.Table1.length; i++) {
                        if ($scope.AssetConfig.Table1[i].Id == $scope.a.AssetModelId) {
                            $scope.s = $scope.AssetConfig.Table1[i];
                            break;
                        }
                    }
                }
                $scope.currobj = null;



                $scope.getassetDetails($scope.a.Id);
                var assetID = $scope.a.Id;//parseLocation(window.location.search)['assetId'];
                $http.get('/api/Asset/GetWorkOrderDetails?assetId=' + assetID).then(function (res, data) {
                    $scope.workOrders = res.data.Table;
                    for (i = 0; i < $scope.workOrders.length; i++) {
                        if ($scope.workOrders[i].Status == 8) {
                            $scope.IsWorkOrderActive = true;
                            break;
                        } else {
                            $scope.IsWorkOrderActive = false;
                        }
                    }
                });

                $http.get('/api/Asset/GetAllJobs?assetId=' + $scope.a.Id).then(function (res, data) {
                    $scope.jobs = res.data;
                });
            }

            $rootScope.spinner.off();
            $("#assetdetails-content").show();
        });



        //if ($scope.isSuperUser == 0) {
        //    var roleid = $scope.roleLocations[0].roleid;
        //    var userlocationid = $scope.roleLocations[0].LocationId;
        //    if (roleid == 2) {
        //        $scope.CanEdit = (userlocationid == ) ? : 1;
        //        $scope.CanUploadDoc = 1;
        //    }

        //    $scope.CanUploadDoc = (roleid == 2 || roleid == 3) ? 1 : 0;

        //}
        //else {
        //    $scope.CanEdit = $scope.isSuperUser;
        //    $scope.CanUploadDoc = 1;
        //}

    }

    $scope.PrintWorkOrders = function (workOrder) {

        $http.get('/api/Asset/GetWorkOrdersByVendor?vendorID=' + workOrder.Vendor + '&jobID=' + workOrder.JobID).then(function (res, data) {
            openPDF(res.data, workOrder.WorkOrderID + '-' + workOrder['P.O.'] + '-' + workOrder.VendorName + '.pdf');
        });
    }

    $scope.GetworkorderUsers = function () {
        $http.get('/api/Users/GetworkorderUsers').then(function (res, data) {
            $scope.WUser = res.data;           
        });
    }

    $scope.Getlocations = function () {
        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
            $scope.Locations1 = res.data;
        });
    }

    $scope.TypeGroupsData = function () {
        var vc = {
            includeStatus: '1',
            includeInspectionVendors: '1',
            includeMaintenanceVendors: '1',
            includeDocTypes: '1',
            includeMaterial: '1'
        };

        var req = {
            method: 'POST',
            url: '/api/Types/TypeGroupsData',
            data: vc
        }

        $http(req).then(function (res) {

            $scope.Status = res.data.Table;
            $scope.InspectionVendors = res.data.Table2;
            $scope.mainVendors = res.data.Table3;
            $scope.docTypes = res.data.Table1;
            $scope.materiallist = res.data.Table4;
            $scope.Getlocations();
            var st = [];
            if ($scope.Status) {
                for (var i = 0; i < $scope.Status.length; i++) {
                    if ($scope.Status[i].Id != 9) {
                        st.push($scope.Status[i]);
                    }
                }
                $scope.astatus = st;
            }
            $rootScope.spinner.off();

            $("#assetdetails-content").show();
        });

    }
    $scope.getassetDetails = function (s) {

        $scope.currobj = null;
        $scope.CurrDocdocCatId = null;
        $http.get('/api/Asset/GetAssetHierarchy?assetId=' + s).then(function (res, data) {
            $scope.AssetHierarchy = res.data.Table;

            $scope.AssetHierarchy[0].LocationDate = getdateFormat($scope.AssetHierarchy[0].LocationDate);
            $scope.AssetHierarchy[0].DatePurchased = getdateFormat($scope.AssetHierarchy[0].DatePurchased);
            $scope.AssetHierarchy[0].CycleCountDate = getdateFormat($scope.AssetHierarchy[0].CycleCountDate);
            $scope.AssetHierarchy[0].DateSold = getdateFormat($scope.AssetHierarchy[0].DateSold);
            $scope.AssetHierarchy[0].LostDamaged = getdateFormat($scope.AssetHierarchy[0].LostDamaged);
            if ($scope.AssetHierarchy[0].AssetType != null) {
                $scope.pet = $scope.AssetHierarchy[0].AssetType;
            }
            // if 
            $scope.IsLocked = ($scope.AssetHierarchy[0].StatusId == 32);
            $scope.assetHistory = res.data.Table1;
            $scope.Assetde = res.data.Table2;
            $scope.loc = res.data.Table3;
            //manufacturers
            if ($scope.AssetHierarchy[0].ManufactureId != '' || $scope.AssetHierarchy[0].ManufactureId != null) {
                for (var manfCount = 0 ; manfCount < $scope.Assetde.length; manfCount++) {
                    if ($scope.AssetHierarchy[0].ManufactureId == $scope.Assetde[manfCount].Id) {
                        $scope.dd = $scope.Assetde[manfCount];
                        break;
                    }
                }
            }
            //material
            if ($scope.AssetHierarchy[0].Material != '' || $scope.AssetHierarchy[0].Material != null) {
                for (var inspCount = 0; inspCount < $scope.materiallist.length; inspCount++) {
                    if ($scope.AssetHierarchy[0].Material == $scope.materiallist[inspCount].Id) {
                        $scope.mtl = $scope.materiallist[inspCount];
                        break;
                    }
                }
            }
            //inspection vendors
            if ($scope.AssetHierarchy[0].InspectionVendor != '' || $scope.AssetHierarchy[0].InspectionVendor != null) {
                for (var inspCount = 0 ; inspCount < $scope.InspectionVendors.length; inspCount++) {
                    if ($scope.AssetHierarchy[0].InspectionVendor == $scope.InspectionVendors[inspCount].Id) {
                        $scope.iv = $scope.InspectionVendors[inspCount];
                        break;
                    }
                }
            }
            //maintainence vendors
            if ($scope.AssetHierarchy[0].MaintenanceVendor != '' || $scope.AssetHierarchy[0].MaintenanceVendor != null) {
                for (var manCount = 0 ; manCount < $scope.mainVendors.length; manCount++) {
                    if ($scope.AssetHierarchy[0].MaintenanceVendor == $scope.mainVendors[manCount].Id) {
                        $scope.mv = $scope.mainVendors[manCount];
                        break;
                    }
                }
            }
            //location 
            if ($scope.AssetHierarchy[0].LocationId != '' || $scope.AssetHierarchy[0].LocationId != null) {
                for (var manfCount = 0 ; manfCount < $scope.AssetConfig.Table.length; manfCount++) {
                    if ($scope.AssetHierarchy[0].LocationId == $scope.AssetConfig.Table[manfCount].Id) {
                        $scope.loc = $scope.AssetConfig.Table[manfCount];
                        break;
                    }
                }
            }
            //CurrLocation
            if ($scope.AssetHierarchy[0].CurrLocation != '' || $scope.AssetHierarchy[0].CurrLocation != null) {
                for (var manfCount = 0 ; manfCount < $scope.Locations1.length; manfCount++) {
                    if ($scope.AssetHierarchy[0].CurrLocation == $scope.Locations1[manfCount].name) {
                        $scope.CurrLocation = $scope.Locations1[manfCount];
                        break;
                    }
                }
            }

            //status
            if ($scope.AssetHierarchy[0].StatusId != '' || $scope.AssetHierarchy[0].StatusId != null) {
                for (var manfCount = 0 ; manfCount < $scope.Status.length; manfCount++) {
                    if ($scope.AssetHierarchy[0].StatusId == $scope.Status[manfCount].Id) {
                        $scope.aStatus = $scope.Status[manfCount];
                        break;
                    }
                }
            }
            if ($scope.AssetHierarchy[0].Customer != '' || $scope.AssetHierarchy[0].Customer != null) {
                for (var manfCount = 0 ; manfCount < $scope.AssetConfig.Table4.length; manfCount++) {
                    $scope.jc = $scope.AssetConfig.Table4[manfCount];
                    break;
                }
            }

            $rootScope.spinner.off();
            $("#assetdetails-content").show();

            // sort
            $scope.sortReverse = false;
            $scope.sortType = 'Comment';

            //populate status
            for (cnt = 0; cnt < $scope.Status.length; cnt++) {
                if ($scope.AssetHierarchy[0].StatusId == $scope.Status[cnt].Id) {
                    $scope.CurrStatus = $scope.Status[cnt];
                    break;
                }
            }
            //populate inspection vendors
            for (cnt = 0; cnt < $scope.InspectionVendors.length; cnt++) {
                if ($scope.AssetHierarchy[0].InspectionvendorId == $scope.InspectionVendors[cnt].Id) {
                    $scope.iv = $scope.InspectionVendors[cnt];
                    break;
                }
            }
            //populate maintainence vendors
            for (cnt = 0; cnt < $scope.mainVendors.length; cnt++) {
                if ($scope.AssetHierarchy[0].MaintenancevendorId == $scope.mainVendors[cnt].Id) {
                    $scope.mv = $scope.mainVendors[cnt];
                    break;
                }
            }
            //if ($scope.AssetHierarchy[0].Rental != null) {
            //    $scope.AssetHierarchy[0].Rental = $scope.AssetHierarchy[0].Rental + "";

            //}
            if ($scope.AssetHierarchy[0].Locked != null) {
                $scope.AssetHierarchy[0].Locked = $scope.AssetHierarchy[0].Locked + "";

            }
            if ($scope.AssetHierarchy[0].Rental != null) {
                if ($scope.AssetHierarchy[0].Rental == 0) {
                    $scope.AssetHierarchy[0].Rental = "";
                }
                else
                    $scope.AssetHierarchy[0].Rental = $scope.AssetHierarchy[0].Rental + "";
                $scope.Changerental();
            }
        });

        $http.get('/api/Asset/GetAllJobs?assetId=' + s).then(function (res, data) {
            $scope.jobs = res.data;
        });

        $http.get('/api/Asset/GetWorkOrderDetails?assetId=' + s).then(function (res, data) {
            $scope.workOrders = res.data.Table;
            for (i = 0; i < $scope.workOrders.length; i++) {
                if ($scope.workOrders[i].Status == 8) {
                    $scope.IsWorkOrderActive = true;
                    break;
                }
            }
            for (i = 0; i < $scope.workOrders.length; i++) {
                if ($scope.workOrders[i].WorkOrderType == 1) {
                    $scope.IsInsWorkOrderActive = true;
                    break;
                } else {
                    $scope.IsInsWorkOrderActive = false;
                }
            }
            if ($scope.IsInsWorkOrderActive && $scope.workOrderTypes.length > 1)
                $scope.workOrderTypes = $scope.workOrderTypes.slice(1, 2);
            else if (!$scope.IsInsWorkOrderActive) {
                $http.get('/api/Asset/GetWorkOrderTypes').then(function (res, data) {
                    $scope.workOrderTypes = res.data.Table;
                });
            }
        });

        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanEdit = ($scope.isSuperUser == 1) ? 1 : 0;
        $scope.CanUploadDoc = ($scope.isSuperUser == 1) ? 1 : 0;
        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            $scope.CanEdit = 0;
            $scope.CanUploadDoc = 0;

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if ($scope.a.LocationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanEdit = ($scope.roleLocations[cnt].roleid == 2) ? 1 : 0;
                    break;
                }
            }

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if ($scope.a.LocationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanUploadDoc = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
                    break;
                }
            }
        }
    }


    var tree;
    $scope.tree_data = {};
    $scope.my_tree = tree = {};

    $scope.newNode = null;
    $scope.objDetails = null;
    $scope.docOrderNo = null;

    function getdateFormat(date) {
        var formateddate = date;

        if (date) {
            formateddate = $filter('date')(date, 'yyyy-MM-dd');
        }

        return formateddate;
    }

    function getdate(date) {
        var formateddate = date;

        if (date) {
            formateddate = $filter('date')(date, 'yyyy-MM-dd');
        }

        return formateddate;
    }
    $scope.changerental = function () {
        if ($scope.currobj.Rental == '1') {
            $scope.tt = $scope.currobj.Rental;
        }
        else if ($scope.currobj.Rental == '' || $scope.currobj.Rental == null) {
            $scope.tt = $scope.currobj.Rental;

        }
    }

    $scope.ViewDetails = function (node) {
        $scope.currobj = node;
        if ($scope.currobj.Condition != null) {
            $scope.currobj.Condition = $scope.currobj.Condition + "";

        }
        $scope.objDetails = node;

        $scope.currobj.files1 = [];
        $scope.HasExipiredDoc = 0;
        $scope.DueDtDoc = 0;
        // $scope.my_tree.selected_node = node;

        $http.get('/api/Asset/GetAssetDetails?assetId=' + node.ID).then(function (res, data) {
            $scope.currAsset = node;
            $scope.DocAssetsList = res.data.DocAssetsList;
            $scope.FieldAssetsList = res.data.FieldAssetsList;
            $scope.DocFiles = res.data.AssetDocuments;

            //   $scope.assetHistory = res.data.AssetHistory;

            if ($scope.DocFiles) {
                if ($scope.DocFiles.length > 0) {
                    for (i = 0; i < $scope.DocFiles.length; i++) {
                        $scope.DocFiles[i].expiryDate = getdate($scope.DocFiles[i].expiryDate);
                        $scope.DocFiles[i].dueDate = getdate($scope.DocFiles[i].dueDate);
                        $scope.currobj.files1.push($scope.DocFiles[i]);
                    }
                }
            }
            if ($scope.FieldAssetsList) {
                if ($scope.FieldAssetsList.length > 0) {
                    for (i = 0; i < $scope.FieldAssetsList.length; i++) {
                        if ($scope.FieldAssetsList[i].DataTypeId == 12 && $scope.FieldAssetsList[i].FieldValue) {
                            $scope.FieldAssetsList[i].FieldValue = new Date($scope.FieldAssetsList[i].FieldValue);
                        }
                    }
                }
            }
            $rootScope.spinner.off();
            $("#assetdetails-content").show();

        });

        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanEdit = ($scope.isSuperUser == 1) ? 1 : 0;
        $scope.CanUploadDoc = ($scope.isSuperUser == 1) ? 1 : 0;

        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            $scope.CanEdit = 0;
            $scope.CanUploadDoc = 0;

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if ($scope.a.LocationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanEdit = ($scope.roleLocations[cnt].roleid == 2) ? 1 : 0;
                    break;
                }
            }

            for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                if ($scope.a.LocationId == $scope.roleLocations[cnt].LocationId) {
                    $scope.CanUploadDoc = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
                    break;
                }
            }
        }
    }

    $scope.validateFile = function ($event) {
        //if ($scope.assetDoc.docType == null) {
        //    alert('Please select docType');
        //    $event.stopPropagation();
        //    $event.preventDefault();
        //    return;
        //}
    }

    $scope.remove_node = function (node) {
        var candelete = confirm('Do you really wish to delete the child assets and its hierarchy?');
        if (!candelete) {
            return;
        }

        var newAsset1 = {
            Id: node.ID,
            Name: node.Name,
            Description: node.Description,
            Active: 1,//selectedRole.Active, 
            AsstMDLHierarID: node.AsstMDLHierarID,
            ParentID: node.ParentID,
            RootAssetID: node.RootAssetID,
            LocationId: node.LocationId,
            AssetTypeId: node.AssetTypeId,
            AssetModelId: node.AssetModelId,
            changedById: $scope.userdetails.Id,
            insupddelflag: 'D'

        };

        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: newAsset1
        }
        $http(req).then(function (response) {

            //$scope.showDialog("Saved successfully!");
            $timeout(function () {
                $scope.getassetDetails(node.RootAssetID);
            }, 500);

            $scope.newAsset = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.getassetDetails(node.RootAssetID);
        });



    }

    $scope.AddChildAsset = function (node) {

        $http.get('/api/Asset/GetAllowedChildAssetTypes?assetId=' + node.ID).then(function (res, data) {
            $scope.currAsset = node;
            //$scope.DocAssetsList = res.data.DocAssetsList;
            //$scope.FieldAssetsList = res.data.FieldAssetsList;
            $scope.AllowedChildAssetTypes = res.data.AllowedChildAssetTypes;
        });
    }

    $scope.saveNewWorkOrder = function (newWorkOrder, vendor, currobj) {
        if (newWorkOrder == null) {
            alert('Please select Job name.');
            return;
        }
        if (newWorkOrder.WorkOrderID == null) {
            alert('Please enter work order #.');
            return;
        }
        if (newWorkOrder.WorkOrderType.ID == 1 && newWorkOrder.Job == null) {
            alert('Please select Job name.');
            return;
        }
        if (newWorkOrder.Status == null) {
            alert('Please select status');
            return;
        }
        if (newWorkOrder.WorkOrderType == null) {
            alert('Please select work order type.');
            return;
        }
        if (newWorkOrder.EquipmentType == null) {
            alert('Please select equipment type');
            return;
        }
        if (newWorkOrder.ObjectType == null) {
            alert('Please select object type.');
            return;
        }

        if (newWorkOrder.Date == null) {
            alert('Please enter date.');
            return;
        }
        if (newWorkOrder.PO == null) {
            alert('Please enter PO');
            return;
        }
        if (newWorkOrder.WorkOrderType.ID == 1 && newWorkOrder.DT == null) {
            alert('Please select DT.');
            return;
        }
        if ($scope.jc.Client == null) {
            alert('Please select company.');
            return;
        }
       
        if (newWorkOrder.WorkOrderType.ID == 1 && newWorkOrder.OrderedBy == null) {
            alert('Please select ordered by.');
            return;
        }
        if (newWorkOrder.WorkInstructions == null) {
            alert('Please enter work instructions.');
            return;
        }
        
        if (newWorkOrder.Comments == null) {
            alert('Please enter comments.');
            return;
        }

        var newWorkOrderData = {

            ID: (newWorkOrder.ID && newWorkOrder.ID != "") ? newWorkOrder.ID : -1,
            JobID: (newWorkOrder.Job) ? newWorkOrder.Job.ID : null,
            WorkOrderID: newWorkOrder.WorkOrderID,
            Asset: currobj.ID,
            Status: newWorkOrder.Status.Id,
            Vendor: newWorkOrder.vendor.Id,
            EquipmentType: newWorkOrder.EquipmentType,
            ObjectType: newWorkOrder.ObjectType,
            Date: newWorkOrder.Date,
            PO: newWorkOrder.PO,
            DT: (newWorkOrder.DT) ? newWorkOrder.DT : null,
            Company: $scope.jc.Id,
            OrderedBy: (newWorkOrder.OrderedBy) ? newWorkOrder.OrderedBy.UserName : '',
            WorkOrderType: newWorkOrder.WorkOrderType.ID,
            SN: currobj.Name,
            ToolDescription: currobj.Description,
            WorkInstructions: newWorkOrder.WorkInstructions,
            Cost: (newWorkOrder.Cost) ? newWorkOrder.Cost : '',
            Comments: newWorkOrder.Comments,
            changedById: $scope.userdetails.Id,
            insupddelflag: (newWorkOrder.ID && newWorkOrder.ID != "") ? 'U' : 'I'
        }

        var req = {
            method: 'POST',
            url: '/api/asset/SaveWorkOrder',
            data: newWorkOrderData
        }
        $http(req).then(function (response) {

            //$scope.getJobsListByStatus();
            //$scope.newJob = null;
            $('#Modal-workorder-new').modal('hide');
            if (response.config.data.Status == 8) {
                $scope.IsWorkOrderActive = true;
                $scope.IsLocked = true;
            }
            else {
                $scope.IsWorkOrderActive = false;
                $scope.IsLocked = false;
            }
            var assetID = $scope.a.Id;//parseLocation(window.location.search)['assetId'];
            $http.get('/api/Asset/GetWorkOrderDetails?assetId=' + assetID).then(function (res, data) {
                $scope.workOrders = res.data.Table;
                for (i = 0; i < $scope.workOrders.length; i++) {
                    if ($scope.workOrders[i].WorkOrderType == 1) {
                        $scope.IsInsWorkOrderActive = true;
                        $scope.IsLocked = true;
                        break;
                    }
                    else {
                        $scope.IsInsWorkOrderActive = false;
                        $scope.IsLocked = false;
                    }
                }
                if ($scope.IsInsWorkOrderActive && $scope.workOrderTypes.length > 1)
                    $scope.workOrderTypes = $scope.workOrderTypes.slice(1, 2);
                else if (!$scope.IsInsWorkOrderActive) {
                    $http.get('/api/Asset/GetWorkOrderTypes').then(function (res, data) {
                        $scope.workOrderTypes = res.data.Table;
                    });
                }
            });
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
        $scope.currGroup = null;

    }

    $scope.DeleteWorkOrder = function (newWorkOrder, vendor, currobj) {

        if (confirm("Are you sure you want to delete this work order?")) {
            var newWorkOrderData = {
                ID: (newWorkOrder.ID && newWorkOrder.ID != "") ? newWorkOrder.ID : -1,
                JobID: null,
                Asset: newWorkOrder.Asset,
                Status: null,
                Vendor: '',
                EquipmentType: null,
                ObjectType: null,
                Date: null,
                PO: '',
                DT: '',
                Company: null,              
                OrderedBy: '',
                WorkOrderType: null,
                SN: '',
                ToolDescription: '',
                WorkInstructions: '',
                Cost: '',
                Comments: '',
                changedById: $scope.userdetails.Id,
                insupddelflag: 'D'
            }

            var req = {
                method: 'POST',
                url: '/api/asset/SaveWorkOrder',
                data: newWorkOrderData
            }
            $http(req).then(function (response) {
                alert('Work order deleted successfully!');
                var assetID = $scope.a.Id;//parseLocation(window.location.search)['assetId'];
                $http.get('/api/Asset/GetWorkOrderDetails?assetId=' + assetID).then(function (res, data) {
                    $scope.workOrders = res.data.Table;

                    for (i = 0; i < $scope.workOrders.length; i++) {
                        if ($scope.workOrders[i].Status == 8) {
                            $scope.IsWorkOrderActive = true;
                            $scope.IsLocked = true;
                            break;
                        } else {
                            $scope.IsWorkOrderActive = false;
                            $scope.IsLocked = false;
                        }
                    }

                    for (i = 0; i < $scope.workOrders.length; i++) {
                        if ($scope.workOrders[i].WorkOrderType == 1) {
                            $scope.IsInsWorkOrderActive = true;
                            $scope.IsLocked = true;
                            break;
                        } else {
                            $scope.IsInsWorkOrderActive = false;
                            $scope.IsLocked = false;
                        }
                    }
                    if ($scope.IsInsWorkOrderActive && $scope.workOrderTypes.length > 1)
                        $scope.workOrderTypes = $scope.workOrderTypes.slice(1, 2);
                    else if (!$scope.IsInsWorkOrderActive) {
                        $http.get('/api/Asset/GetWorkOrderTypes').then(function (res, data) {
                            $scope.workOrderTypes = res.data.Table;
                        });
                    }
                    if ($scope.workOrders.length == 0) {
                        $scope.IsInsWorkOrderActive = false;
                        $scope.IsLocked = false;
                    }
                });
            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.showDialog1(errmssg);
            });
        }
    }

    $scope.saveNewChildAsset = function (newAsset) {

        if (newAsset == null) {
            alert('Please enter equipment name');
            return;
        }
        if (newAsset.Name == null) {
            alert('Please enter equipment name');
            return;
        }
        if (newAsset.ObjTypeId == null) {
            alert('Please select a equipment type');
            return;
        }


        var newAsset1 = {
            Id: -1,
            Name: newAsset.Name,
            Description: newAsset.Description,
            Active: 1,//selectedRole.Active, 
            AsstMDLHierarID: newAsset.ObjTypeId.Id,
            ParentID: $scope.currAsset.ID,
            RootAssetID: $scope.currAsset.RootAssetID,
            LocationId: $scope.currAsset.LocationId,
            AssetTypeId: newAsset.ObjTypeId.ObjTypeId,
            AssetModelId: $scope.currAsset.AssetModelId,
            changedById: $scope.userdetails.Id,
            insupddelflag: 'I'

        };

        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: newAsset1
        }
        $http(req).then(function (response) {

            //$scope.showDialog("Saved successfully!");
            $timeout(function () {
                $scope.getassetDetails($scope.currAsset.RootAssetID);
            }, 500);

            $scope.newAsset = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.getassetDetails($scope.currAsset.RootAssetID);
        });

    }

    $scope.onFileSelect = function (files, $event) {
        $scope.modifiedDoc = null;
        var found = false;
        //check if job already exists 
        for (cnt = 0; cnt < $scope.currobj.files1.length; cnt++) {
            if ($scope.currobj.files1[cnt].docName == files[0].name) {
                found = true;
            }
        }

        if (found) {
            alert('Cannot add duplicte documents. Document with the same name already exists.');
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }

        var ext = files[0].name.split('.').pop();
        $scope.IsFileExtnInvalid = (ext != 'pdf' && ext != 'jpg' && ext != 'png' && ext != 'gif');

        fileReader.readAsDataUrl(files[0], $scope, (ext == 'csv') ? 1 : 4).then(function (result) {
            //if (result.length > 2097152) {
            //    alert('Cannot upload file greater than 2 MB.');
            //    $event.stopPropagation();
            //    $event.preventDefault();
            //    return;
            //}

            var doc =
                {
                    Id: ($scope.assetDoc == null) ? -1 : $scope.assetDoc.Id,
                    AssetId: $scope.currobj.ID,
                    createdById: ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id,
                    UpdatedById: ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id,
                    FromDate: null,
                    ToDate: null,
                    docCatId: $scope.CurrDocdocCatId,

                    docTypeId: ($scope.assetDoc == null) ? null : $scope.assetDoc.docType.Id,
                    docType: ($scope.assetDoc == null) ? null : $scope.assetDoc.docType.Name,//
                    docName: files[0].name,
                    docContent: result,

                    expiryDate: ($scope.assetDoc == null || $scope.assetDoc.expiryDate == null) ? null : getdate($scope.assetDoc.expiryDate),
                    dueDate: ($scope.assetDoc == null || $scope.assetDoc.dueDate == null) ? null : getdate($scope.assetDoc.dueDate),
                    OrderNo: ($scope.docOrderNo == null) ? 0 : $scope.docOrderNo,
                    insupddelflag: 'I'
                }

            $scope.modifiedDoc = doc;
            ////check if already the file exists                       
            //for (cnt = 0; cnt < $scope.currobj.files1.length; cnt++) {
            //    if ($scope.currobj.files1[cnt].docName == files[0].name) {
            //        $scope.currobj.files1.splice(cnt, 1);
            //    }
            //}

            //$scope.currobj.files1.push(doc);
            //if ($scope.DocFiles)
            //{
            //    $scope.DocFiles.push(doc);
            //}

        });
    };

    $scope.EditAssetDoc = function (f) {
        // $scope.assetDoc = f;
        //$scope.assetDoc.insupddelflag = 'U';

        for (cnt = 0; cnt < $scope.currobj.files1.length; cnt++) {
            if ($scope.currobj.files1[cnt].docName == f.docName) {
                $scope.assetDoc = $scope.currobj.files1[cnt];

                for (dcnt = 0; dcnt < $scope.docTypes.length; dcnt++) {
                    if ($scope.docTypes[dcnt].Id == f.docTypeId) {
                        {
                            $scope.assetDoc.dt = $scope.docTypes[dcnt];
                        }
                    }
                }

                break;
            }
        }

    }
    $scope.updateDoc = function () {
        if ($scope.assetDoc.dt != null) {
            $scope.assetDoc.docTypeId = $scope.assetDoc.dt.Id;
            $scope.assetDoc.docType = $scope.assetDoc.dt.Name;
        }
        $scope.assetDoc.insupddelflag = ($scope.assetDoc.Id == -1) ? 'I' : 'U';

        $scope.modifiedDoc = $scope.assetDoc;
        $scope.SaveAssetDoc();
    }
    $scope.DeleteDoc = function (d) {

        if (d == -1) {
            $scope.currobj.files1.slice(d);
        }
        else {
            d.insupddelflag = "D";
            $scope.modifiedDoc = d;
            $scope.SaveAssetDoc();
        }


        //for (cnt = 0; cnt < $scope.currobj.files1.length; cnt++) {
        //    if ($scope.currobj.files1[cnt].docName == d.docName) {
        //         $scope.assetDoc = $scope.currobj.files1[cnt];
        //        $scope.currobj.files1[cnt].insupddelflag = 'D';
        //        break;
        //    }
        //}
    }

    $scope.cancelNewDoc = function () {
        $scope.modifiedDoc = null;
    }

    $scope.updateDocType = function () {
        if ($scope.assetDoc != null) {
            $scope.assetDoc.docTypeId = $scope.assetDoc.docType.Id;
            $scope.assetDoc.DocType = $scope.assetDoc.docType.Name;

            $scope.modifiedDoc.docTypeId = $scope.assetDoc.docType.Id;
            $scope.modifiedDoc.DocType = $scope.assetDoc.docType.Name;
        }
    }
    $scope.updateDocExpDate = function () {

        if ($scope.assetDoc != null) {
            $scope.assetDoc.expiryDate = getdateFormat($scope.assetDoc.expiryDate);
            $scope.modifiedDoc.ExpiryDate = getdateFormat($scope.assetDoc.expiryDate);
        }
    }

    $scope.SetParentDoc = function (a) {
        $scope.docOrderNo = a.OrderNo;
        $scope.CurrDocdocCatId = a.docCatId;
    }

    /*save job documents */
    $scope.SaveAssetDoc = function () {

        if ($scope.modifiedDoc == null) {

            alert('Select an asset document to modify.');
            return;
        }
        $scope.modifiedDoc.UpdatedById = ($scope.userdetails.Id == null) ? 1 : $scope.userdetails.Id;
        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAssetDoc',
            data: $scope.modifiedDoc
        }
        $http(req).then(function (response) {
            //  $scope.DocFiles = response.data.Table;
            $scope.DocFiles = response.data.Table;
            $scope.assetHistory = response.data.Table1;

            if ($scope.DocFiles) {
                if ($scope.DocFiles.length > 0) {
                    $scope.currobj.files1 = [];
                    for (i = 0; i < $scope.DocFiles.length; i++) {
                        $scope.DocFiles[i].expiryDate = getdate($scope.DocFiles[i].expiryDate);
                        $scope.DocFiles[i].dueDate = getdate($scope.DocFiles[i].dueDate);
                        $scope.currobj.files1.push($scope.DocFiles[i]);
                    }
                }
            }

            $scope.modifiedDoc = null;
            $scope.assetDoc = null;
            $scope.docOrderNo = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.modifiedDoc = null;
            $scope.assetDoc = null;
            $scope.docOrderNo = null;
            $scope.showDialog1(errmssg);
        });
    }

    $scope.GetFileContent = function (f) {
        if (f.Id == -1) {
            //this is newly added document, hence show without going to db
            for (cnt = 0; cnt < $scope.currobj.files1.length; cnt++) {
                if ($scope.currobj.files1[cnt].docName == f.docName) {
                    openPDF(f.docContent, f.docName);
                }
            }

        }
        else {
            // var data = $scope.currobj.files1[0];  

            //get the file content from db
            $http.get('/api/Asset/GetAssetFileContent?docId=' + f.Id).then(function (res, data) {
                $scope.docDetails = res.data[0];
                openPDF($scope.docDetails.FileContent, res.data[0].FileName);
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
            // winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><embed src="' + m_url + '" height="100%" width="100%" /></body></html>');

            var ext = m_title.split('.').pop();
            switch (ext) {
                case 'pdf':

                    var objbuilder = '';
                    objbuilder += ('<object width="100%" height="100%"      data="');
                    objbuilder += (m_url);
                    objbuilder += ('" type="application/pdf" class="internal">');
                    objbuilder += ('<embed src="');
                    objbuilder += (m_url);
                    objbuilder += ('" type="application/pdf" />');
                    objbuilder += ('</object>');

                    // winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><object  data="' + m_url + '" height="100%" width="100%" ></object></body></html>');
                    winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%">' + objbuilder + '</body></html>');
                    //winLookup.document.href = m_url;
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



    $scope.saveAssetDetails = function () {

        if ($scope.currobj == null) {
            alert('Please enter equipment name');
            return;
        }
        //Serial Number
        if ($scope.currobj.Name == null || $scope.currobj.Name.trim() == "") {
            alert('Please enter equipment name');
            return;
        }
        // Description
        if ($scope.currobj.Description == null || $scope.currobj.Description.trim() == "") {
            alert('Please enter Description');
            return;
        }
        //Sequence
        //if ($scope.sequence == null)
        //{
        //    alert('Plase select Sequence');
        //}

        if ($scope.currobj.RedressCost == null ||$scope.currobj.RedressCost+''=="") {
            alert('Please enter RedressCost.');
            return;
        }
        //if ($scope.dd == null || $scope.dd.Id == null) {
        //    alert('Please enter Manufacturer');
        //    return;
        //}
        //if ($scope.currobj.DatePurchased == null) {
        //    alert('Please enter Date Purchased');
        //    return;
        //}
        //if ($scope.loc == null || $scope.loc.Id == null) {
        //    alert('Please enter Location');
        //    return;
        //}
        //if ($scope.CurrLocation == null || $scope.CurrLocation.id == null) {
        //    alert('Please Enter Location');
        //    return;
        //}
        if ($scope.currobj.PerWeekStbyCharge == null || $scope.currobj.PerWeekStbyCharge+''=='') {
            alert('Please enter PerWeekStbyCharge');
            return;
        }
        if ($scope.currobj.UnitPrice == null || $scope.currobj.UnitPrice+''=='') {
            alert('Please enter Unit Price');
            return;
        }
        if ($scope.currobj.AdditionalDayRate == null || $scope.currobj.AdditionalDayRate+''=='') {
            alert('Please enter Additional Day Rate');
            return;
        }
        if ($scope.currobj.PurchaseCost == null || $scope.currobj.PurchaseCost+''=='') {
            alert('Please enter PurchaseCost.');
            return;
        }
        //if ($scope.currobj.Rental == null) {
        //    alert('Please enter Rental');
        //    return;
        //}
        if ($scope.currobj.PerWeekStbyCharge == null || $scope.currobj.PerWeekStbyCharge+''=='') {
            alert('Please enter Per Week Stand by Charge');
            return;
        }
        //if ($scope.currobj.RedressCost == null || ($scope.currobj.RedressCost+'' == "")) {
        //    alert('Please enter Redress Cost');
        //    return;
        //}
        //if ($scope.currobj.DateSold == null) {
        //    alert('Please enter Date Sold');
        //    return;
        //}   
        //unit price
        if ($scope.currobj.UnitPrice == null || $scope.currobj.UnitPrice+''=='') {
            alert('Please enter Price');
            return;
        }
        //if ($scope.currobj.DayRate == null) {
        //    alert('Please enter Day Rate');
        //    return;
        //}
        //if ($scope.CurrLocation == null) {
        //    alert('Please select Location.');
        //    return;
        //}
        //if ($scope.iv == null || $scope.iv.Id == null) {
        //    alert('Please enter Inspection Vendor');
        //    return;
        //}
        //if ($scope.mv == null || $scope.mv.Id == null) {
        //    alert('Please enter Maintenance Vendor');
        //    return;
        //}
        //if ($scope.mtl == null || $scope.mtl.Id== null) {
        //    alert('Please enter Material');
        //    return;
        //}
        if ($scope.currobj.Condition == null || $scope.currobj.Condition=='') {
            alert('Please enter Condition');
            return;
        }
        //if ($scope.currobj.Material == null || $scope.currobj.Material == '') {
        //    alert('Please enter Material');
        //    return;
        //}
        if ($scope.currobj.AssetType == 'Mills' || $scope.currobj.AssetType == 'Shoes') {
            if ($scope.currobj.Rental == null || $scope.currobj.Rental == '') {
                alert('Please Select Rental.');
                return;
            }
        }
        if ((
            ($scope.currobj.AssetType == 'Mills' && $scope.mtl == null ||
            $scope.currobj.AssetType == 'Shoes' && $scope.mtl == null)) ||
            $scope.currobj.Rental == '1' && $scope.mtl == null) {
            alert('Please select Material.');
            return;
        }

        if ($scope.currobj.Rental == '1' && ($scope.currobj.RentalDayRate == null || $scope.currobj.RentalDayRate+''== '')) {
            alert('Please Enter Rental Day Rate.');
            return;
        }
        //if ($scope.currobj.Material == null || $scope.currobj.Material == '') {
        //    alert('Please enter Material');
        //    return;
        //}
        if ($scope.currobj.PurchaseCost == null || $scope.currobj.PurchaseCost+''=='') {
            alert('Please enter PurchaseCost');
            return;
        }
        //if ($scope.jc == null || $scope.jc.Id == null) {
        //    alert('Please enter Customer');
        //    return;
        //}
        if ($scope.currobj.AdditionalDayRate == null || $scope.currobj.AdditionalDayRate+''=='') {
            alert('Please enter AdditionalDayRate.');
            return;
        }
        //if ($scope.currobj.LocationDate == null || $scope.currobj.LocationDate == '') {
        //    alert('Please enter Location Date');
        //    return;
        //}
        //if ($scope.currobj.Notes == null || $scope.currobj.Notes == '') {
        //    alert('Please enter Notes');
        //    return;
        //}
        var a = {
            Id: $scope.currobj.ID,
            Name: $scope.currobj.Name,
            Description: $scope.currobj.Description,
            Active: $scope.currobj.Active,
            AsstMDLHierarID: $scope.currobj.AsstMDLHierarID,
            AssetModelId: $scope.currobj.AssetModelId,
            ParentID: $scope.currobj.ParentID,
            RootAssetID: $scope.currobj.RootAssetID,
            //LocationId: $scope.LocationId.Id,
            AssetTypeId: $scope.currobj.AssetTypeId,
            changedById: $scope.userdetails.Id,
            CurrLocation: ($scope.CurrLocation == null) ? null : $scope.CurrLocation.id,
            LocationId: ($scope.CurrLocation == null) ? null : $scope.CurrLocation.id,
            //JobId:$scope.currobj.JobId,
            ManufactureId: ($scope.dd == null) ? null :  $scope.dd.Id,
            DatePurchased: $scope.currobj.DatePurchased,
            UnitPrice: $scope.currobj.UnitPrice,
            JobRate: '', //$scope.currobj.JobRate,
            Rental: ($scope.currobj.Rental == null || $scope.currobj.Rental == '') ? 0 : $scope.currobj.Rental,
            RentalDayRate: $scope.currobj.RentalDayRate,
            AdditionalDayRate: $scope.currobj.AdditionalDayRate,
            DayRate: null,//$scope.currobj.DayRate,
            PerWeekStbyCharge: $scope.currobj.PerWeekStbyCharge,
            RedressCost: $scope.currobj.RedressCost,
            DateSold: $scope.currobj.DateSold,
            LostDamaged: $scope.currobj.LostDamaged,
            Price: $scope.currobj.Price,
            CycleCountDate: $scope.currobj.CycleCountDate,
            StatusId: ($scope.aStatus == null) ? null : $scope.aStatus.Id,
            InspectionVendorId: ($scope.iv == null) ? null : $scope.iv.Id,
            MaintenanceVendorId: ($scope.mv == null) ? null : $scope.mv.Id,
            Condition: $scope.currobj.Condition,
            Material: ($scope.mtl == null) ? null : $scope.mtl.Id,
            PurchaseCost: $scope.currobj.PurchaseCost,
            Customer: ($scope.jc == null) ? null : $scope.jc.Id,
            LostLIHDamaged: $scope.currobj.LostLIHDamaged,
            LocationDate: $scope.currobj.LocationDate,
            Notes: $scope.currobj.Notes,
            Locked: $scope.currobj.Locked,
            insupddelflag: 'U',
        };


        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: a
        }
        $http(req).then(function (response) {
            $scope.currAsset = null;
            alert("Saved successfully!");

            $scope.getassetDetails($scope.currobj.RootAssetID);
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.currAsset = null;
        });

        var adetails = a;

        adetails.ChangedById = $scope.userdetails.Id;
        adetails.FieldAssetsList = $scope.FieldAssetsList;
        //adetails.AssetDocuments = $filter('filter')($scope.currobj.files1, { insupddelflag: '' });

        if ($scope.FieldAssetsList.length > 0) {
            var req1 = {
                method: 'POST',
                url: '/api/Asset/SaveAssetDetails',
                //headers: {
                //    'Content-Type': 'application/json'
                //},
                data: adetails
            }
            $http(req1).then(function (response) {
                ///$scope.showDialog("Saved successfully!");

                $timeout(function () {
                    $scope.getassetDetails($scope.a.Id);
                }, 500);

            }, function (errres) {
                var errdata = errres.data;
                var errmssg = "";
                errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                $scope.showDialog1(errmssg);
            });
        }
    }

    $scope.t = function (divId) {

        var p = document.getElementById('DIV_' + divId);
        p.style.display = (p.style.display == 'none') ? "inline" : 'none';

        var ielem = document.getElementById('I_' + divId);
        if ($(ielem).hasClass('fa-chevron-up')) {
            $(">.portlet-body", this).slideUp('fast');
            $(ielem).removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
        else if ($(ielem).hasClass('fa-chevron-down')) {
            $(">.portlet-body", this).slideDown('fast');
            $(ielem).removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }

    }

    $scope.SetDocdocCatId = function (docCatId) {
        $scope.assetDoc = null;

        document.getElementById('fileInput').value = null;

        $scope.CurrDocdocCatId = docCatId;
    }

    $scope.GetDetailsEditHistory = function (hist) {
        $http.get('/api/Asset/GetAssetHistoryDetails?ehId=' + hist.Id).then(function (res, data) {
            $scope.detailedhist = res.data;
        });
    }

    $scope.getVendorWorkOrder = function () {
        $http.get('/api/Asset/GetWorkOrdersByVendorID?vendorID=' + $scope.newWorkOrder.vendor.Id + '&jobId=' + $scope.newWorkOrder.Job.ID).then(function (res, data) {
            $scope.newWorkOrder.Date = res.data.Table[0].Date;
            $scope.newWorkOrder.PO = res.data.Table[0]["P.O."];
           // $scope.newWorkOrder.DateNeeded = res.data.Table[0].DateNeeded;
            $scope.newWorkOrder.Comments = res.data.Table[0].Comments;
            //$scope.newWorkOrder.WorkOrderID = res.data.Table[0].WorkOrderID;
            $scope.newWorkOrder.lockVendorDetails = true;
        });
    }

    $scope.getVendorName = function (workOrderTypeId, assetId) {
        $http.get('/api/Asset/GetVendorDetails?workOrderTypeId=' + workOrderTypeId + '&assetId=' + assetId).then(function (res, data) {
            //$scope.vendor = res.data.Table;
            //$scope.newWorkOrder.vendor = res.data.Table;


            if (workOrderTypeId == "1") {

                $scope.IsJobReadOnly = true;
                if ($scope.jobs && $scope.jobs.length > 0) {
                    $scope.newWorkOrder.Job = $scope.jobs[0];
                    $scope.newWorkOrder.JobId = $scope.jobs[0].JobID;

                    $http.get('/api/Jobs/GetUsersForJob?jobId=' + $scope.newWorkOrder.Job.ID).then(function (res, data) {
                        $scope.Users = res.data;
                    });
                    var sequence = ($scope.newWorkOrder.Job.Sequence) ? $scope.newWorkOrder.Job.Sequence : 0;
                    $http.get('/api/Asset/GetDeliveryTicketId?jId=' + $scope.newWorkOrder.Job.ID + '&sequence=' + sequence).then(function (res, data) {
                        $scope.newWorkOrder.DT = res.data.Table[0].DeliveryTicketId;
                    });


                }
            }
            else {
                $scope.IsJobReadOnly = false;
            }
        });
    }

    $scope.getObjectTypes = function (assetModelId) {
        $http.get('/api/Asset/GetObjectTypes?assetModelId=' + assetModelId).then(function (res, data) {
            $scope.objectTypes = res.data.Table;
        });
    }


    $scope.getJobHistory = function (selJobId) {

        var selectedJob = $scope.jobs.filter(function (el) {
            return el.JobID == selJobId;
        });
        if (selectedJob && selectedJob.length > 0) {
            $scope.newWorkOrder.Job = selectedJob[0];
            $http.get('/api/Jobs/GetUsersForJob?jobId=' + $scope.newWorkOrder.Job.ID).then(function (res, data) {
                $scope.Users = res.data;
            });

            var sequence = ($scope.newWorkOrder.Job.Sequence) ? $scope.newWorkOrder.Job.Sequence : 0;
            $http.get('/api/Asset/GetDeliveryTicketId?jId=' + $scope.newWorkOrder.Job.ID + '&sequence=' + sequence).then(function (res, data) {
                $scope.newWorkOrder.DT = res.data.Table[0].DeliveryTicketId;
            });
        }
    }

    $scope.EditWorkOrder = function (workOrderDetail) {
        $scope.IsJobReadOnly = true;
        $('#modal-workorder-primary-label').text('Update work order');
        $scope.newWorkOrder = workOrderDetail;

        $http.get('/api/Asset/GetAllJobs?assetId=' + $scope.a.Id).then(function (res, data) {
            $scope.jobs = res.data;
            //set job
            if ($scope.jobs) {
                if ($scope.jobs.length > 0) {
                    for (i = 0; i < $scope.jobs.length; i++) {
                        if ($scope.jobs[i].ID == $scope.newWorkOrder.JobID) {
                            $scope.newWorkOrder.JobId = $scope.jobs[i].JobID;
                            $scope.newWorkOrder.Job = $scope.jobs[i];
                            var selJobId = $scope.jobs[i].ID;
                            var sequence = ($scope.newWorkOrder.Job.Sequence) ? $scope.newWorkOrder.Job.Sequence : 0;
                            $http.get('/api/Asset/GetDeliveryTicketId?jId=' + $scope.newWorkOrder.Job.ID + '&sequence=' + sequence).then(function (res, data) {
                                $scope.newWorkOrder.DT = res.data.Table[0].DeliveryTicketId;
                            });

                            $http.get('/api/Users/GetworkorderUsers').then(function (res, data) {
                                $scope.Users = res.data;
                                for (i = 0; i < $scope.Users.length; i++) {
                                    if ($scope.Users[i].UserName == $scope.newWorkOrder.OrderedBy || $scope.Users[i].UserName == $scope.newWorkOrder.OrderedBy.UserName) {
                                        $scope.newWorkOrder.OrderedBy = $scope.Users[i];
                                        break;
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
        //set status
        if ($scope.workOrderStatus) {
            if ($scope.workOrderStatus.length > 0) {
                for (i = 0; i < $scope.workOrderStatus.length; i++) {
                    if ($scope.workOrderStatus[i].Id == $scope.newWorkOrder.Status) {
                        $scope.newWorkOrder.Status = $scope.workOrderStatus[i];
                        break;
                    }
                }
            }
        }


        //set work order type
        $http.get('/api/Asset/GetWorkOrderTypes').then(function (res, data) {
            $scope.workOrderTypes = res.data.Table;

            if ($scope.workOrderTypes) {
                if ($scope.workOrderTypes.length > 0) {
                    for (i = 0; i < $scope.workOrderTypes.length; i++) {
                        if ($scope.workOrderTypes[i].ID == $scope.newWorkOrder.WorkOrderType || $scope.workOrderTypes[i].ID == $scope.newWorkOrder.WorkOrderType.ID) {
                            $scope.newWorkOrder.WorkOrderType = $scope.workOrderTypes[i];
                            break;
                        }
                    }
                }
            }
        });
        if ($scope.newWorkOrder.WorkOrderType == 2 || $scope.newWorkOrder.WorkOrderType.ID == 2) {
            $scope.IsJobReadOnly = false;
        }

        //set work order type
        if ($scope.InspectionVendors && $scope.IsJobReadOnly) {
            if ($scope.InspectionVendors.length > 0) {
                for (i = 0; i < $scope.InspectionVendors.length; i++) {
                    if ($scope.InspectionVendors[i].Id == $scope.newWorkOrder.Vendor) {
                        $scope.newWorkOrder.vendor = $scope.InspectionVendors[i];
                        break;
                    }
                }
            }
        }

        //set work order type
        if ($scope.mainVendors && !$scope.IsJobReadOnly) {
            if ($scope.mainVendors.length > 0) {
                for (i = 0; i < $scope.mainVendors.length; i++) {
                    if ($scope.mainVendors[i].Id == $scope.newWorkOrder.Vendor) {
                        $scope.newWorkOrder.vendor = $scope.mainVendors[i];
                        break;
                    }
                }
            }
        }

        //Set vendor name
        //var vendor = {
        //    Id: $scope.newWorkOrder.Vendor,
        //    Name: ($scope.newWorkOrder.WorkOrderType.ID == 1) ? $scope.newWorkOrder.VendorName : $scope.newWorkOrder.MaintenanceVendor
        //}
        //$scope.newWorkOrder.vendor = [];
        //$scope.newWorkOrder.vendor.push(vendor);
        $scope.newWorkOrder.PO = $scope.newWorkOrder["P.O."]

        //set equipment type



    }



    $scope.GetAllJobs = function () {
        $scope.newWorkOrder = [];
        $scope.IsJobReadOnly = true;

        $http.get('/api/Asset/GetNewWorkOrderID').then(function (res, data) {
            $scope.newWorkOrder.WorkOrderID = res.data.Table[0].WorkOrderID;
        });

        $http.get('/api/Asset/GetAllJobs?assetId=' + $scope.a.Id).then(function (res, data) {
            $scope.jobs = res.data;
        });

        $scope.newWorkOrder.EquipmentType = $scope.currobj.AssetModelId;
        $scope.newWorkOrder.ObjectType = $scope.currobj.AssetTypeId;

        var assetID = $scope.a.Id;//parseLocation(window.location.search)['assetId'];
        $http.get('/api/Asset/GetWorkOrderDetails?assetId=' + assetID).then(function (res, data) {
            $scope.workOrders = res.data.Table;
            for (i = 0; i < $scope.workOrders.length; i++) {
                if ($scope.workOrders[i].WorkOrderType == 1) {
                    $scope.IsInsWorkOrderActive = true;
                    break;
                } else {
                    $scope.IsInsWorkOrderActive = false;
                }
            }
            if ($scope.IsInsWorkOrderActive && $scope.workOrderTypes.length > 1)
                $scope.workOrderTypes = $scope.workOrderTypes.slice(1, 2);
            else if (!$scope.IsInsWorkOrderActive) {
                $http.get('/api/Asset/GetWorkOrderTypes').then(function (res, data) {
                    $scope.workOrderTypes = res.data.Table;
                });
            }
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


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        //alert("ng-repeat finished");
        //  $("#example-advanced").treetable({ initialState: ($scope.move == 0) ? 'collapsed' : 'expanded', expandable: true }, true);
        $("#example-advanced").treetable({ initialState: 'collapsed', expandable: true }, true);
        $("#example-advanced tbody tr:first").toggleClass("selected");

        if ($scope.AssetHierarchy && $scope.AssetHierarchy.length > 0) {
            $scope.ViewDetails($scope.AssetHierarchy[0]);
            $("#example-advanced").treetable("reveal", $scope.AssetHierarchy[0].ID);
        }

    });

    $scope.CheckCanCreate = function (t) {
        $scope.CanUploadDoc = 1;
        return;
        //if (t == null) {
        //    $scope.s = null;
        //    $scope.a = null;
        //}
        //// alert(t);
        //var locationId = t;//($scope.l == null) ? -1 : $scope.l.id;

        ////check if he is a location admin and accordingly enable assets and jobs creation for his location
        ////check the loction of the selected asset
        ////if user is not super user then compare with the location of the user
        ////if location is mismatching then disable the save button
        //$scope.CanUploadDoc = ($scope.isSuperUser == 1) ? 1 : 0;
        //if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

        //    for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
        //        if (locationId == $scope.roleLocations[cnt].LocationId) {
        //            $scope.CanUploadDoc = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
        //            break;
        //        }
        //    }
        //}
    }

    $scope.MoveDoc = function (doc, down) {
        $scope.modifiedDoc = doc;
        $scope.modifiedDoc.IncPosition = down;
        $scope.modifiedDoc.insupddelflag = 'R';
        $scope.docOrderNo = null;
        $scope.SaveAssetDoc();
    }

    $scope.MoveAsset = function (asset, down, index) {

        asset.IncPosition = down;
        asset.insupddelflag = 'R';
        var req = {
            method: 'POST',
            url: '/api/Asset/SaveAsset',
            data: asset
        }
        $http(req).then(function (response) {
            $scope.getassetDetails(asset.RootAssetID);
            //  window.location.search = '';

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.asset = null;
        });
    }

    $scope.ResetAssetDetails = function () {
        $scope.currobj = null;
        $scope.CurrDocdocCatId = null;
        $scope.pet = null;
        $scope.IsWorkOrderActive = false;
        $scope.IsInsWorkOrderActive = false;
        $scope.dd = null;
        $scope.mtl = null;
        $scope.iv = null;
        $scope.mv = null;
        $scope.loc = null;
        $scope.CurrLocation = null;
        $scope.aStatus = null;
        $scope.jc = null;
        $scope.CurrStatus = null;
        $scope.a = null;
    }

    $scope.GoToJobDetails = function (aid) {
        $localStorage.nJobId = aid;
        window.location.href = "JobDetails.html";
    }
});

function GetFormattedDate() {
    var todayTime = new Date();
    var month = format(todayTime.getMonth() + 1);
    var day = format(todayTime.getDate());
    var year = format(todayTime.getFullYear());
    return month + "/" + day + "/" + year;
}

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