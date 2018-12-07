// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);


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

var mycrtl1 = myapp1.controller('BasicController', function ($scope, $localStorage, $http, $location, $rootScope, $uibModal, $timeout, adalAuthenticationService) {

    $scope.assetsWithDocs = [];

    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    //app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    //    
    $location.path = function (path, reload) {
        var original = $location.path;
            if (reload === false) {
               
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                   // $route.current = lastRoute;
                    un();
                    return $location.path.apply($location, [path]);
                    
                });
            }
            
        };
    //}])

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


    $scope.GetAssetModels = function () {

        $scope.AssetModels = null;

        $scope.selectedModel = $localStorage.assetModelId;// parseLocation(window.location.search)['modelId'];
        $localStorage.assetModelId = null;
        $location.path(window.location.origin + window.location.pathname, false);

        $http.get('/api/AssetModel/GetAssetModels?locId=-1').then(function (res, data) {
            $scope.AssetModels = res.data;
            $rootScope.spinner.off();
            $("#assetmodeldetails-content").show();
            if ($scope.AssetModels.length > 0) {
                if ($scope.selectedModel != null) {
                    for (i = 0; i < $scope.AssetModels.length; i++) {
                        if ($scope.AssetModels[i].id == $scope.selectedModel) {
                            $scope.s = $scope.AssetModels[i];
                            break;
                        }
                    }
                }
                else {
                    $scope.s = $scope.AssetModels[0];
                    $scope.selectedModel = $scope.AssetModels[0].id;
                }

                $scope.getselectval($scope.selectedModel);
            }
           
        });
    }

    $scope.SetCurrNode = function (node) {
        $scope.ParentNode = node;
    }

    $scope.getselectval = function (s) {
        //window.location = window.location.search.substring(0).split("&");
        $http.get('/api/Asset/GetEquipmentComponents?assetmodelId=' + s).then(function (res, data) {
            $scope.assetsWithDocs = res.data;
            $rootScope.spinner.off();
            $("#assetmodeldetails-content").show();
        });

    }

    $scope.saveNewNode = function () {
        //@AssetModelID int,@ParentID int=null,@ObjTypeID int,@Change char(1),@ID int=null, @ParentObjTypeId int

        var newchildNode = {
            "Id": -1,
            "AssetModelId": $scope.assetsWithDocs[0].id,
            "ParentId": $scope.ParentNode.id,
            "ObjTypeId": $scope.objtype.id,
            "ParentObjTypeId": $scope.ParentNode.objtypeid,
            "insupddelflag": "I"
        };
      
        var req = {
            method: 'POST',
            url: '/api/AssetModel/SaveAssetModelHierarchy',
            data: newchildNode
        }

        $http(req).then(function (res) {
            $scope.objtype = "";
            $scope.ParentNode.objtypename = "";
           
            $timeout(function () {
                $scope.getselectval($scope.assetsWithDocs[0].id);
            });
           

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
    }
    
    $scope.deleteType = function (node) {
    
        var candelete = confirm('Do you really wish to delete the child equipment/Type and its hierarchy?');
        if (!candelete) {
            return;
        }

        var newchildNode = {
            "Id": node.id,
            "AssetModelId": node.AssetModelId,
            "ParentId": node.parentid,
            "ObjTypeId": node.objtypeid,
            "ParentObjTypeId": node.parentobjtypeid,
            "insupddelflag": "D"
        };
        
        var req = {
            method: 'POST',
            url: '/api/AssetModel/SaveAssetModelHierarchy',
            data: newchildNode
        }

        $http(req).then(function (response) {           
         
            //var index = $scope.assetsWithDocs.indexOf(node);
            //if (index >= 0)
            //    $scope.assetsWithDocs.splice(index, 1);

            $timeout(function () {
                $scope.getselectval($scope.s.id);
            });

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
        });
        $scope.objtype = null;
    }


    $scope.GetObjectTypes = function () {
        $http.get('/api/objecttypes/getobjecttypes').then(function (res, data) {
            $scope.ObjectTypes = res.data;
            $rootScope.spinner.off();
            $("#assetmodeldetails-content").show();
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

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        //alert("ng-repeat finished");
        $("#example-advanced").treetable({ initialState:'expanded',expandable: true }, true);
    });



}
);

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