var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);

var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $rootScope, adalAuthenticationService) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    //$scope.itemsperpage = 0;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
    $scope.GetModels = function (flag) {
        var curpage = $scope.page;
        
        if (flag == 'n') {
            $scope.page++;
            curpage = $scope.page;
            $scope.itemsperpage = curpage * 10;

            //if ($scope.Models.length < 10) {
            //    $scope.itemsperpage += 0;
            //} else if ($scope.itemsperpage > $scope.Paging.recordcount) {
            //    $scope.itemsperpage = $scope.itemsperpage;
            //} else {
            //    $scope.itemsperpage += $scope.Models.length;
            //}
        } else if (flag == 'p') {
            $scope.page--
            curpage = $scope.page;
            $scope.itemsperpage = $scope.itemsperpage-10
            //if ($scope.itemsperpage > $scope.Paging.recordcount) {
            //    $scope.itemsperpage = $scope.itemsperpage;
            //}
            //$scope.itemsperpage -= $scope.Models.length;
        }
        else {
            $scope.page = 1;
            curpage = $scope.page;
            //$scope.itemsperpage = 10;
        }
        $http.get('/api/AssetModel/GetAssetModelspaging?locId=-1 &curpage=' + curpage + '&maxrows=' +10).then(function (res, data) {
            $scope.Models = res.data.Table;
            $scope.Paging = res.data.Table1;
            //$scope.itemsperpage += $scope.Models.length;
            //$scope.previous = $scope.itemsperpage;
            if ($scope.Models.length < 10)
            {
                $scope.p= $scope.itemsperpage-(10 - $scope.Models.length);
            }
            $rootScope.spinner.off();
            $("#assetmodel-content").show();
        });

        $http.get('/api/objecttypes/getobjecttypes').then(function (res, data) {
            $scope.AssetType = res.data;
            $rootScope.spinner.off();
            $("#assetmodel-content").show();
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
    $scope.saveNewAssetModel = function (newModel) {

        if (newModel == null) {
            alert('Please enter name.');
            return;
        }

        if (newModel.Name == null) {
            alert('Please enter name.');
            return;
        }

        if($scope.s ==null){
            alert('Please select asset type.');
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

            $scope.GetModels();
            $scope.newModel = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetModels();
            $scope.newModel = null;
        });

    }

    $scope.saveAssetModel = function (currModel, flag) {

        if (currModel == null) {
            alert('Please enter name.');
            return;
        }

        if (currModel.name == null) {
            alert('Please enter name.');
            return;
        }

        if ($scope.ns == null && currModel.AssetTypeId == null) {
            alert('Please select asset type.');
            return;
        }

        var SelTypeGroup = {
            Name: currModel.name,
            Description: currModel.description,
            AssetTypeId: ($scope.ns == null)? currModel.AssetTypeId : $scope.ns.id,
            Id: currModel.id,
            insupddelflag: flag
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

            $scope.GetModels();
            $scope.currModel = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetModels();
            $scope.currModel = null;
        });

    }

    $scope.setCurrAssetModel = function (a) {        
        $scope.currModel = a;       
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
 $scope.GotToAssetModelDetails = function (aid) {
     $localStorage.assetModelId = aid;
     window.location.href = "AssetModelDetails.html";
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
});