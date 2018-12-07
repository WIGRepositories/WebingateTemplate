/// <reference path="DataLoad.js" />
var app = angular.module('myApp', ['ngStorage', 'ngAnimate', 'treasure-overlay-spinner', 'ui.bootstrap'])

app.directive('fileReader', function () {
    return {
        scope: {
            fileReader: "="
        },
        link: function (scope, element) {
            $(element).on('change', function (changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function (e) {
                        var contents = e.target.result;
                        scope.$apply(function () {
                            scope.fileReader = contents;
                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
});

app.controller('myCtrl', function ($scope, $http, $rootScope, $localStorage, $uibModal) {

    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    }
    $scope.logStr = '';
    $scope.assetscol = ' Equipment Type,Object Type,Serial Number,Manufacture,Description,Date Purchased/Serialized,Unit Price,Job Rate,Rental ,Additional Day Rate,Day Rate ,Per Week Stby Charge ,Redress Cost ,Date Sold,Job #,Lost/LIH/Damaged,Location,Price,Cycle Count Date,Inspection Vendor,Maintenance Vendor,Status,Condition,Material,LostLIHDamaged,LocationDate,Notes'
    //$scope.assetscol = 'AssetModelId,ManufactureComp,Description,DatePurchase,Unitprice,Rental,Additionaldays,Standby,Dayrate,PerWeekStbyCharge,RedressCost,DateSold,JobID,Lost,LocationNamae,Price'
    $scope.assearr = [{ "Id": 1, "SerialNumber": "Name" },
                      { "Id": 2, "SerialNumber": "Name" }]

    $scope.assetmodel = 'Name,Description,object_name'
    $scope.assetys = [{ "Id": 1, "Name": "Description" },
                      { "Id": 2, "Name": "Description" }]

    $scope.objecttypes = 'Name,Descrption,ObjecTypeName'
    $scope.objettys = [{ "Descrption": 1, "AssetName": "Name" },
                      { "Descrption": 2, "AssetName": "Name" }]

    $scope.custcol = 'CustomerName,ServiceDescription'
    $scope.custrcol = [{ "Client": 1, "Contact": "Email" },
                      { "Client": 2, "Contact": "Email" }]


    $scope.manucol = 'Manufacture,Description'
    $scope.manurcol = [{ "Manufacture": 1, "Description": "Manufacture" },
                      { "Manufacture": 2, "Description": "Manufacture" }]

    $scope.locimport = 'Name,Descrption'
    $scope.locimportopt = [{ "Descrption": 1, "Name": "Active" },
                      { "Descrption": 2, "Name": "Active" }]

    $scope.MaintenanceVendorcol = 'Maintenance_Vendor_Name,Description'
    $scope.MaintenanceVendorcoll = [{
        "Maintenance_Vendor_Name": 1, "Description": "Maintenance_Vendor_Name"
    }, {
        "Manufacture": 2, "Description": "Manufacture"
    }]

    if ($localStorage.uname == null) {
        window.location.href = "login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    //$scope.Roleid = $scope.userdetails[0].roleid;

    $scope.dashboardDS = $localStorage.dashboardDS;

    //$scope.GetDataLoad = function () {

    //    $http.get('/api/DataLoad/GetDataLoad').then(function (response, req) {
    //        $scope.list = response.data;
    //    });
    //}
    $scope.csv_link = 'DataUploadTemplates/CompanyList.csv';// + $window.location.search;

    $scope.ShowFailedRecords = function (dataRows) {
        //$scope.logdata = '';
        //$scope.logdata += "Client, Contact, Email, PhoneNo, ContactRole, ServiceDescription,ImportStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logStr += dataRows[c].Client + ',';
            $scope.logStr += dataRows[c].ServiceDescription + ',';
            $scope.logStr += dataRows[c].Contact + ',';
            $scope.logStr += dataRows[c].Email + ',';
            $scope.logStr += dataRows[c].PhoneNo + ',';
            $scope.logStr += dataRows[c].ContactRole + ',';           
            $scope.logStr += dataRows[c].importStatus;
            $scope.logStr += "\n";
        }
    }

    $scope.showObjecttypes = function (dataRows) {
        $scope.logdata = '';
        $scope.logdata += "Name,Description,Objecttypename,ImportStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logdata += dataRows[c].Name + ',';
            $scope.logdata += dataRows[c].Description + ',';
            $scope.logdata += dataRows[c].typename + ',';
            $scope.logdata += dataRows[c].importStatus;
            $scope.logdata += "\n";
        }
    }

    $scope.showEquipmenttypes = function (dataRows) {
        $scope.logdata = '';
        $scope.logdata += "Name,Description,object_name,ImportStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logdata += dataRows[c].Name + ',';
            $scope.logdata += dataRows[c].Description + ',';
            $scope.logdata += dataRows[c].object_name + ',';
            $scope.logdata += dataRows[c].importStatus;
            $scope.logdata += "\n";
        }
    }

    $scope.showManufacturer = function (dataRows) {
        //$scope.logdata = '';
        //$scope.logdata += "Manufacture,Description,ImportStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logStr += dataRows[c].Manufacture + ',';
            $scope.logStr += dataRows[c].Description + ',';
            $scope.logStr += dataRows[c].importStatus;
            $scope.logStr += "\n";
        }
    }

    $scope.showMaintenanceVendor = function (dataRows) {
        //$scope.logdata = '';
        //$scope.logdata += "Manufacture,Description,ImportStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logStr += dataRows[c].Name + ',';
            $scope.logStr += dataRows[c].Description + ',';
            $scope.logStr += dataRows[c].importStatus;
            $scope.logStr += "\n";
        }
    }

    $scope.showlocimportdata = function (dataRows) {
        $scope.logdata = '';
        $scope.logdata += "Name,Description,ImportStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logdata += dataRows[c].Name + ',';
            $scope.logdata += dataRows[c].Description + ',';
            $scope.logdata += dataRows[c].importStatus;
            $scope.logdata += "\n";
        }
    }

    $scope.showlocimortassets = function (dataRows) {
        //$scope.logdata = '';
        //$scope.logdata += "SerialNumber,assetmodel_name,objecttype_name,Assetname,desc,Manufacturer,rootassetid,Measurement,DatePurchased,Unitprice,DayRate,PerWeekStandbyCharge,RedressCost,DateSol,Job,Customer,Lost,DamagedDate,location_name,LocationDate,Price,CycleCountDate,Notes,importStatus\n";;
        for (var c = 0; c < dataRows.length; c++) {
            $scope.logStr += dataRows[c].SerialNumber + ',';
            $scope.logStr += dataRows[c].assetmodel_name + ',';
            $scope.logStr += dataRows[c].objecttype_name + ',';
            $scope.logStr += dataRows[c].name + ',';
            $scope.logStr += dataRows[c].desc + ',';
            $scope.logStr += dataRows[c].Manufacturer + ',';
            $scope.logStr += dataRows[c].rootassetid + ',';
            $scope.logStr += dataRows[c].Measurement + ',';
            $scope.logStr += dataRows[c].DateofPurchase + ',';
            $scope.logStr += dataRows[c].Unitprice + ',';
            $scope.logStr += dataRows[c].DayRate + ',';
            $scope.logStr += dataRows[c].PerWeekStandbyCharge + ',';
            $scope.logStr += dataRows[c].RedressCost + ',';
            $scope.logStr += dataRows[c].DateofSold + ',';
            $scope.logStr += dataRows[c].Job + ',';
            $scope.logStr += dataRows[c].Lost + ',';
            $scope.logStr += dataRows[c].DamagedofDate + ',';
            $scope.logStr += dataRows[c].location_name + ',';
            $scope.logStr += dataRows[c].LocationDate + ',';
            $scope.logStr += dataRows[c].Price + ',';
            $scope.logStr += dataRows[c].CycleCountofdate + ',';
            $scope.logStr += dataRows[c].InspectionVendor + ',';
            $scope.logStr += dataRows[c].MaintenanceVendor + ',';
            $scope.logStr += dataRows[c].StatusId + ',';
            $scope.logStr += dataRows[c].Condition + ',';
            $scope.logStr += dataRows[c].Material + ',';
            $scope.logStr += dataRows[c].PurchaseCost + ',';
            $scope.logStr += dataRows[c].Customer + ',';
            $scope.logStr += dataRows[c].LostLIHDamaged + ',';
            $scope.logStr += dataRows[c].LocationDate + ',';
            $scope.logStr += dataRows[c].Notes + ',';
            $scope.logStr += dataRows[c].importStatus;
            $scope.logStr += "\n";
        }
    }
    $scope.clearer = function () {

        $scope.logdata = '';
    }
    $scope.SetOptionSettings = function () {
        $scope.clearer();
        switch ($scope.seloption) {

            case "1":

                $scope.mandatoryCols = $scope.assetmodel;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {
                    $scope.processData($scope.fileContent);
                }


                $scope.processData = function (allText) {
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        var data = allTextLines[i].split(',');
                        if (data == '' || data == null) continue;
                        lines.push(Getassettypes(data));

                        if (data.length == headers.length) {
                            var tarr = [];
                            for (var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            //lines.push(GetCompany(data));
                        }
                    }

                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/SaveAssetModel',
                        data: lines
                    }
                    $http(req).then(function (res) {
                        //$scope.initdata = res.data;
                        $scope.showEquipmenttypes(res.data);
                        //alert("Saved successfully");
                    });

                    //$scope.logdata = list;
                };


                function Getassettypes(data) {

                    var list = {
                        Name: data[0],
                        Description: data[1],
                        object_name: data[2],
                        flag: 'I'
                    }
                    return list;
                }

                $scope.save = function () {
                    //if (active == null) {
                    //    return;
                    //}
                    //if (Name == null) {
                    //    return;
                    //}
                    //if (Code == null) {
                    //    return;
                    //}
                    //if (Address == null) {
                    //    return;
                    //}
                    //if (EmailId == null) {
                    //    return;
                    //}
                    //if (ContactNo1 == null) {
                    //    return;
                    //}

                    $http(req).then(function (response) {

                        alert("Saved successfully!!");

                        $scope.data = null;
                        //$scope.GetCompanys();

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                        $scope.showDialog1(errmssg);
                        //alert(errmssg);
                    });

                    //var req = {
                    //    method: 'POST',
                    //    url: '/api/DataLoad/SaveUsersGroup1',
                    //    data: lines
                    //}
                    //$http(req).then(function (res) {
                    //    $scope.initdata = res.data;
                    //});

                    // $scope.logdata = lines;
                };
                break;


            case "2":

                $scope.mandatoryCols = $scope.custcol;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {
                    $scope.processData($scope.fileContent);
                }


                $scope.processData = function (allText) {
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    $scope.showheader = function () {
                        return $scope.logdata = "Client,ServiceDescription,Contact,Email,PhoneNo,ContactRole,Import Status\n";
                    }
                     for (var i = 1; i < allTextLines.length; i++) {
                    // split content based on comma
                        var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);  //allTextLines[i].split(',');
                        if (data == '' || data == null) continue;
                        var t = Getcustdata(data);
                        if (t == -1) {
                            $scope.logStr += allTextLines[i]+ ',failed due to insufficient data\n';

                            continue;
                }
                else {
                            lines.push(t);
                }
                        if (data.length == headers.length) {
                            var tarr =[];
                            for (var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            //lines.push(GetCompany(data));
                            }
                            }
                    if($scope.logStr == '') {
                        $scope.logdata = 'imported successfully';
                        $rootScope.spinner.off();
                }
            else {
                        //$scope.logStr += $scope.logheadershow;
                        $scope.logdata = $scope.showheader();
                        $scope.logdata += $scope.logStr;
                        $rootScope.spinner.off();
                        }
                   
                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/SaveCustomerimport',
                        data: lines
                    }
                    $rootScope.spinner.on();
                    $http(req).then(function (res) {
                        //$scope.initdata = res.data;
                        $scope.ShowFailedRecords(res.data);
                        //alert("Saved successfully");
                         $rootScope.spinner.off();
                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage: errdata.Message;
                        $scope.showDialog1(errmssg);
                        //alert(errmssg);
                        $rootScope.spinner.off();
                        });

                    //$scope.logdata = list;
                };


                function Getcustdata(data) {

                    if (data[0] =='' || data[0]== null) {
                      return -1;
                    }


                    var list = {
                        Client: (data[0].replace(/,/g, ',').replace(/\"/g, "")),
                        ServiceDescription: data[1],
                        Contact: data[2],
                        Email: data[3],
                        PhoneNo: data[4],
                        ContactRole: data[5],
                        flag: 'I'
                    }
                    return list;
                }

                $scope.save = function () {
                    //if (active == null) {
                    //    return;
                    //}
                    //if (Name == null) {
                    //    return;
                    //}
                    //if (Code == null) {
                    //    return;
                    //}
                    //if (Address == null) {
                    //    return;
                    //}
                    //if (EmailId == null) {
                    //    return;
                    //}
                    //if (ContactNo1 == null) {
                    //    return;
                    //}

                    $http(req).then(function (response) {

                        alert("Saved successfully!!");

                        $scope.data = null;
                        //$scope.GetCompanys();

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                        $scope.showDialog1(errmssg);
                        //alert(errmssg);
                    });

                    //var req = {
                    //    method: 'POST',
                    //    url: '/api/DataLoad/SaveUsersGroup1',
                    //    data: lines
                    //}
                    //$http(req).then(function (res) {
                    //    $scope.initdata = res.data;
                    //});

                    // $scope.logdata = lines;
                };
                break;

            case "4":

                $scope.mandatoryCols = $scope.manucol;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {
                    $scope.processData($scope.fileContent);
                }


                $scope.processData = function (allText) {
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    $scope.showheadermanu = function () {
                        return $scope.logdata = "Manufacture,Description,Import Status\n";
                        }
                     for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                            var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);  //allTextLines[i].split(',');
                            if (data == '' || data == null) continue;
                            var t = Getmanucol(data);
                            if (t == -1) {
                            $scope.logStr += allTextLines[i]+ ',failed due to insufficient data\n';

                            continue;
                            }
                             else {
                            lines.push(t);
                            }
                        if (data.length == headers.length) {
                            var tarr =[];
                            for(var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                        }
                    //lines.push(GetCompany(data));
            }
                            }
                    if($scope.logStr == '') {
                        $scope.logdata = 'imported successfully';
                        $rootScope.spinner.off();
                    }
                            else {
                //$scope.logStr += $scope.logheadershow;
                        $scope.logdata = $scope.showheadermanu();
                $scope.logdata += $scope.logStr;
                $rootScope.spinner.off();
                }

                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/Savemanufacuturer',
                        data: lines
                    }
                    $http(req).then(function (res) {
                        //$scope.initdata = res.data;
                        $scope.showManufacturer(res.data);
                        //alert("Saved successfully");
                    });

                    //$scope.logdata = list;
                };


                function Getmanucol(data) {

                    if (data[0] == '' || data[0] == null)
                        {

                            return -1;
                        }

                    var list = {
                            Manufacture: (data[0].replace(/,/g, ',').replace(/\"/g, "")),
                        Description: data[1],
                        flag: 'I'
                    }
                    return list;
                }

                $scope.save = function () {
                    //if (active == null) {
                    //    return;
                    //}
                    //if (Name == null) {
                    //    return;
                    //}
                    //if (Code == null) {
                    //    return;
                    //}
                    //if (Address == null) {
                    //    return;
                    //}
                    //if (EmailId == null) {
                    //    return;
                    //}
                    //if (ContactNo1 == null) {
                    //    return;
                    //}

                    $http(req).then(function (response) {

                        alert("Saved successfully!!");

                        $scope.data = null;
                        //$scope.GetCompanys();

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                       $scope.showDialog1(errmssg);
                        //alert(errmssg);
                    });

                    //var req = {
                    //    method: 'POST',
                    //    url: '/api/DataLoad/SaveUsersGroup1',
                    //    data: lines
                    //}
                    //$http(req).then(function (res) {
                    //    $scope.initdata = res.data;
                    //});

                    // $scope.logdata = lines;
                };
                break;

            case "7":

                $scope.mandatoryCols = $scope.MaintenanceVendorcol;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {
                    $scope.processData($scope.fileContent);
                }


                $scope.processData = function (allText) {
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    $scope.showheadermainte = function () {
                        return $scope.logdata = " Maintenance_Vendors_Name,Description,Import_Status\n";
                    }
                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);  //allTextLines[i].split(',');
                        if (data == '' || data == null) continue;
                        var t = Getmaaintenance(data);
                        if (t == -1) {
                            $scope.logStr += allTextLines[i] + ',failed due to insufficient data\n';

                            continue;
                        }
                        else {
                            lines.push(t);
                        }
                        if (data.length == headers.length) {
                            var tarr = [];
                            for (var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            //lines.push(GetCompany(data));
                        }
                    }
                    if ($scope.logStr == '') {
                        $scope.logdata = 'imported successfully';
                        $rootScope.spinner.off();
                    }
                    else {
                        //$scope.logStr += $scope.logheadershow;
                        $scope.logdata = $scope.showheadermainte();
                        $scope.logdata += $scope.logStr;
                        $rootScope.spinner.off();
                    }

                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/SaveMaintenanceVendor',
                        data: lines
                    }
                    $http(req).then(function (res) {
                        //$scope.initdata = res.data;
                        $scope.showMaintenanceVendor(res.data);
                        //alert("Saved successfully");
                    });

                    //$scope.logdata = list;
                };


                function Getmaaintenance(data) {

                    if (data[0] == '' || data[0] == null) {

                        return -1;
                    }

                    var list = {
                        Name: (data[0].replace(/,/g, ',').replace(/\"/g, "")),
                        Description: data[1],
                        flag: 'I'
                    }
                    return list;
                }

                break;


            case "3":

                $scope.mandatoryCols = $scope.objecttypes;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {
                    $scope.processData($scope.fileContent);
                }


                $scope.processData = function (allText) {
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        var data = allTextLines[i].split(',');
                        if (data == '' || data == null) continue;
                        lines.push(Getobjecttypes(data));

                        if (data.length == headers.length) {
                            var tarr = [];
                            for (var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            //lines.push(GetCompany(data));
                        }
                    }

                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/SaveobjetcTypesimport',
                        data: lines
                    }
                    $http(req).then(function (res) {
                        //$scope.initdata = res.data;
                        $scope.showObjecttypes(res.data);
                        //alert("Saved successfully");
                    });

                    //$scope.logdata = list;
                };


                function Getobjecttypes(data) {

                    var list = {
                        Name: data[0],
                        Description: data[1],
                        typename: data[2],
                        flag: 'I'
                    }
                    return list;
                }

                $scope.save = function () {
                    //if (active == null) {
                    //    return;
                    //}
                    //if (Name == null) {
                    //    return;
                    //}
                    //if (Code == null) {
                    //    return;
                    //}
                    //if (Address == null) {
                    //    return;
                    //}
                    //if (EmailId == null) {
                    //    return;
                    //}
                    //if (ContactNo1 == null) {
                    //    return;
                    //}

                    $http(req).then(function (response) {

                        alert("Saved successfully!!");

                        $scope.data = null;
                        //$scope.GetCompanys();

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                        $scope.showDialog1(errmssg);
                        //alert(errmssg);
                    });

                    //var req = {
                    //    method: 'POST',
                    //    url: '/api/DataLoad/SaveUsersGroup1',
                    //    data: lines
                    //}
                    //$http(req).then(function (res) {
                    //    $scope.initdata = res.data;
                    //});

                    // $scope.logdata = lines;
                };
                break;

            case "5":

                $scope.mandatoryCols = $scope.locimport;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {
                    $scope.processData($scope.fileContent);
                }


                $scope.processData = function (allText) {
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        var data = allTextLines[i].split(',');
                        if (data == '' || data == null) continue;
                        lines.push(Getlocdata(data));

                        if (data.length == headers.length) {
                            var tarr = [];
                            for (var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            //lines.push(GetCompany(data));
                        }
                    }

                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/SaveLocationsimport',
                        data: lines
                    }
                    $http(req).then(function (res) {
                        //$scope.initdata = res.data;
                        $scope.showlocimportdata(res.data);
                        //alert("Saved successfully");
                    });

                    //$scope.logdata = list;
                };


                function Getlocdata(data) {

                    var list = {
                        Name: data[0],
                        Description: data[1],
                        flag: 'I'
                    }
                    return list;
                }

                $scope.save = function () {
                    //if (active == null) {
                    //    return;
                    //}
                    //if (Name == null) {
                    //    return;
                    //}
                    //if (Code == null) {
                    //    return;
                    //}
                    //if (Address == null) {
                    //    return;
                    //}
                    //if (EmailId == null) {
                    //    return;
                    //}
                    //if (ContactNo1 == null) {
                    //    return;
                    //}

                    $http(req).then(function (response) {

                        alert("Saved successfully!!");

                        $scope.data = null;
                        //$scope.GetCompanys();

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                       $scope.showDialog1(errmssg);
                        //alert(errmssg);
                    });

                    //var req = {
                    //    method: 'POST',
                    //    url: '/api/DataLoad/SaveUsersGroup1',
                    //    data: lines
                    //}
                    //$http(req).then(function (res) {
                    //    $scope.initdata = res.data;
                    //});

                    // $scope.logdata = lines;
                };
                break;
            case "6":


                $scope.mandatoryCols = $scope.assetscol;
                //  $scope.optionsCols = 'Address,phone,emailid';

                $scope.importData = function () {

                    $scope.processData($scope.fileContent);

                }


                $scope.processData = function (allText) {
                    $scope.logStr = '';
                    $scope.clearer();
                    // $scope.logdata = '';
                    if (allText == null) {
                        alert('Please insert file.');
                        return;
                    }
                    // split content based on new line
                    var allTextLines = allText.split(/\r\n|\n/);

                    var headers = allTextLines[0].split(',');

                    //validate header

                    var header = [$scope.seloption];
                    var lines = [];

                    $scope.showheader = function () {
                        return $scope.logdata = "Equipment Type,Object Type,Serial Number,Manufacture,Description,Date Purchased/Serialized,Unit Price,Job Rate,Rental ,Additional Day Rate,Day Rate ,Per Week Stby Charge ,Redress Cost ,Date Sold,Job #,Lost/LIH/Damaged,Location,Price,Cycle Count Date,InspectionVendor,MaintenanceVendor,StatusId,Condition,Material,PurchaseCost,Customer,LostLIHDamaged,LocationDate,Notes,Import_Status\n";
                    }
                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);  //allTextLines[i].split(',');
                        if (data == '' || data == null) continue;
                        var t = GetAsset(data);
                        if (t == -1) {
                            $scope.logStr += allTextLines[i] + ',failed due to insufficient data\n';

                            continue;
                        }
                        else {
                            lines.push(t);
                        }
                        if (data.length == headers.length) {
                            var tarr = [];
                            for (var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            //lines.push(GetCompany(data));
                        }
                    }
                    if ($scope.logStr == '') {
                        $scope.logdata = 'imported successfully';
                        $rootScope.spinner.off();
                    }
                    else {
                        //$scope.logStr += $scope.logheadershow;
                        $scope.logdata = $scope.showheader();
                        $scope.logdata += $scope.logStr;
                        $rootScope.spinner.off();
                    }
                    //list
                    var req = {
                        method: 'POST',
                        url: '/api/DataLoad/SaveAssets',
                        data: lines

                    }
                    $rootScope.spinner.on();

                    $http(req).then(function (res) {
                        //alert("Saved successfully");
                        //$scope.logdata = res.data;
                        $scope.showlocimortassets(res.data);
                        $rootScope.spinner.off();

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                        $scope.showDialog1(errmssg);
                        //alert(errmssg);
                        $rootScope.spinner.off();
                    });

                    //$scope.logdata = list;
                };


                function GetAsset(data) {
                    if (data[0] == '' || data[1] == '' || data[2] == '' || data[0] == null || data[1] == null || data[2] == null) {
                        return -1;
                    }
                    var list = {

                        equipmenttype_name: (data[0].replace(/,/g, '-').replace(/\"/g, "")),
                        objecttype_name: (data[1].replace(/\s/g, '')),
                        SerialNumber: (data[2].replace(/\s/g, '')),
                        Manufacturer: (data[3].replace(/\s/g, '')),
                        desc: (data[4].replace(/^\"/g, '').replace(/"$/g, '').replace(/\s/g, '')),
                        DateofPurchased: (data[5].replace(/\s/g, '')),
                        Unitprice: (data[6].replace(/\s/g, '').replace(/\$/g, '')),
                        JobRate: (data[7].replace(/\s/g, '').replace(/\$/g, '')),
                        Rental: (data[8].replace(/\s/g, '').replace(/\$/g, '')),
                        AdditionalDayRate: (data[9].replace(/\s/g, '').replace(/\$/g, '')),
                        DayRate: (data[10].replace(/\s/g, '').replace(/\$/g, '')),
                        PerWeekStandbyCharge: (data[11].replace(/\s/g, '')),
                        RedressCost: (data[12].replace(/\s/g, '')),
                        DateofSold: (data[13].replace(/\s/g, '')),
                        Job: (data[14].replace(/\s/g, '')),
                        Lost: (data[15].replace(/\s/g, '')),
                        location_name: (data[16].replace(/\s/g, '')),
                        Price: (data[17].replace(/\s/g, '').replace(/\$/g, '')),
                        CycleCountofdate: (data[18].replace(/\s/g, '')),
                        InspectionVendor: (data[19].replace(/\s/g, '')),
                        MaintenanceVendor: (data[20].replace(/\s/g, '')),
                        StatusId: (data[21].replace(/\s/g, '')),
                        Condition: (data[22].replace(/\s/g, '')),
                        Material: (data[23].replace(/\s/g, '')),
                        PurchaseCost: (data[24].replace(/\s/g, '')),
                        Customer: (data[25].replace(/\s/g, '')),
                        LostLIHDamaged: (data[26].replace(/\s/g, '')),
                        LocationDate: (data[27].replace(/\s/g, '')),
                        Notes: (data[28].replace(/\s/g, '')),
                        Flag: 'I'
                    }
                    return list;
                }

                $scope.save = function () {
                    //if (active == null) {
                    //    return;
                    //}
                    //if (Name == null) {
                    //    return;
                    //}
                    //if (Code == null) {
                    //    return;
                    //}
                    //if (Address == null) {
                    //    return;
                    //}
                    //if (EmailId == null) {
                    //    return;
                    //}
                    //if (ContactNo1 == null) {
                    //    return;
                    //}

                    $http(req).then(function (response) {

                        //alert("Saved successfully!!");
                        //$scope.data = null;
                        //$scope.GetCompanys();
                        //$scope.showlocimortassets(response.data)

                    }, function (errres) {
                        var errdata = errres.data;
                        var errmssg = "Your details are incorrect";
                        errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
                       $scope.showDialog1(errmssg);
                        //alert(errmssg);
                    });

                    //var req = {
                    //    method: 'POST',
                    //    url: '/api/DataLoad/SaveUsersGroup1',
                    //    data: lines
                    //}
                    //$http(req).then(function (res) {
                    //    $scope.initdata = res.data;
                    //});

                    // $scope.logdata = lines;
                };
                break;
        }
    }
    $scope.downloadTemplate = function () {

        switch ($scope.seloption) {
            case "1":
                $scope.downloadFile('DataUploadTemplates/EquipementTypes.csv', 'EquipmentTypes.csv');
                break;

            case "2":
                $scope.downloadFile('DataUploadTemplates/Customer.csv', 'Customer.csv');
                break;

            case "3":
                $scope.downloadFile('DataUploadTemplates/ObjectTypes.csv', 'ObjectTypes.csv');
                break;

            case "4":
                $scope.downloadFile('DataUploadTemplates/Manufacturer.csv', 'Manufacturer.csv');
                break;

            case "5":
                $scope.downloadFile('DataUploadTemplates/Location.csv', 'Location.csv');
                break;
            case "6":
                $scope.downloadFile('DataUploadTemplates/Assets.csv', 'Equipments.csv');
                break;
            case "7":
                $scope.downloadFile('DataUploadTemplates/MaintenanceVendor.csv', 'MaintenanceVendor.csv');
                break;
        }
    }

    $scope.downloadFile = function (fileloc, filename) {
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', fileloc);
        downloadLink.attr('download', filename);
        downloadLink[0].click();
    }

    $scope.saveJSON = function () {

        switch ($scope.seloption) {
            case "1":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'EquipmentTypes_log.csv');
                downloadLink[0].click();
                break;

            case "2":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'Customer_log.csv');
                downloadLink[0].click();
                break;

            case "3":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'ObjectTypes_log.csv');
                downloadLink[0].click();
                break;

            case "4":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'Manufacturer_log.csv');
                downloadLink[0].click();
                break;

            case "5":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'Location_log.csv');
                downloadLink[0].click();
                $scope.downloadFile('Location.csv');
                break;
            case "6":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'Equipment_log.csv');
                downloadLink[0].click();
                break;

            case "7":
                var blob = new Blob([$scope.logdata], { type: "application/csv;charset=utf-8;" });
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'MaintenanceVendor_log.csv');
                downloadLink[0].click();

                break;
        }
    };


    //Recent Change
    //function GetUser(data) {

    //    var U = {
    //        Id: ((flag == 'I') ? User.Id : -1),
    //        FirstName: data[1],
    //        LastName: data[2],
    //        MiddleName: data[3],
    //        Email: data[4],
    //        ContactNo1: data[5],
    //        ContactNo2: data[6],
    //        Active: 1,
    //        insupdflag: flag
    //    }
    //    return U;
    //}

    //     $scope.save = function () {
    //         if (FirstName == null) {
    //             return;
    //         }
    //         if (LastName == null) {
    //             return;
    //         }
    //         if (MiddleName == null) {
    //             return;
    //         }
    //         if (Email == null) {
    //             return;
    //         }
    //         if (ContactNo1 == null) {
    //             return;   
    //         }
    //         if (ContactNo2 == null) {
    //             return;
    //         }
    //         if (Active == null) {
    //             return;
    //         }


    //         $http(req).then(function (response) {

    //            $scope.showDialog("Saved successfully!!");

    //             $scope.data = null;
    //             //$scope.GetCompanys();

    //         }, function (errres) {

    //         var errdata = errres.data;
    //         var errmssg = "Your details are incorrect";
    //         errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
    //         // $scope.showDialog(errmssg);

    //     });


    //     }
    //Recent Change
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



