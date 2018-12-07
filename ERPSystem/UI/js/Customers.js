// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap',  'treasure-overlay-spinner']);
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $rootScope) {
    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;

   $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;
                    
    $scope.CInit = function () {
        $scope.Customeract = 1;
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
    $scope.GetCustomers = function () {      
        $http.get('/api/Customers/getCustomers').then(function (res, data) {
            $scope.Customers = res.data;
            $rootScope.spinner.off();
            $("#customers-content").show();
        });

        $http.get('/api/Users/GetUsers?cmpId=1').then(function (res, data) {
            $scope.Users = res.data;
            $rootScope.spinner.off();
            $("#customers-content").show();
        });


    }

    $scope.save = function (customer) {

        if (customer == null) {
            alert('Please enter name.');
            return;
        }
      
        var phoneformat = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
        if (customer.PhoneNo != null && customer.PhoneNo != "") {
            if ((customer.PhoneNo).match(phoneformat)) {
                $scope.phonevalid = '';
            }
            else {
                if ((customer.PhoneNo).match(/^\d{10}$/)) {
                    $scope.phonevalid = '';
                }
                else {
                    alert('Phone number format is invalid.');
                    return;
                }
            }
        }

        

        if (customer.Client == null) {
            alert('Please enter client name.');
            return;
        }
        if (customer.Client == "") {
            alert('Please enter client name.');
            $scope.GetCustomers();
            return;
        }

        var SelCustomer = {
            Client: customer.Client,
            Contact: customer.Contact,
            Email: customer.Email,
            ContactRole: customer.ContactRole,
            PhoneNo: customer.PhoneNo,
            ServiceDesc: customer.ServiceDesc,
            PTSPOCId: ($scope.poc == null) ? null : $scope.poc.Id,
            Active: (customer.act == null) ? 0 : customer.act,
            Id: customer.Id,
            insupddelflag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/Customers/saveCustomers',
            //headers: {
            //    'Content-Type': undefined
            data: SelCustomer
        }
        $http(req).then(function (response) {
            //$scope.showDialog("Saved successfully!");
            $scope.GetCustomers();
            $scope.Customers1 = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $scope.GetCustomers();
            $scope.Customers1 = null;
        });


    };


    $scope.saveNew = function (customer) {

        if (customer == null) {
            alert('Please enter name.');
            return;
        }

        var phoneformat = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
        if (customer.PhoneNo != null && customer.PhoneNo != "") {
            if ((customer.PhoneNo).match(phoneformat)) {
                $scope.phonevalid = '';
            }
            else {
                if ((customer.PhoneNo).match(/^\d{10}$/)) {
                    $scope.phonevalid = '';
                }
                else {
                    alert('Phone number format is invalid.');
                    return;
                }
            }
        }
        if (customer.Client == null) {
            alert('Please enter client name.');
            return;
        }

        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

        if (customer.Email)
        {            
            if (reg.test(customer.Email) == false) {
                // alert('Please enter valid email address.');
                $scope.mssg = 'Enter Valid Email Id.';
                return false;
            }
        }

        var SelCustomer = {
            Client: customer.Client,
            Contact: customer.Contact,
            Email: customer.Email,
            ContactRole: customer.ContactRole,
            PhoneNo: customer.PhoneNo,
            ServiceDesc: customer.ServiceDesc,
            PTSPOCId: ($scope.ju == null)? null: $scope.ju.Id,
            Active: ($scope.Customeract == null) ? 0 : $scope.Customeract,
            Id: -1,
            insupddelflag: 'I'
        };       

        var req = {
            method: 'POST',
            url: '/api/Customers/saveCustomers',
            //headers: {
            //    'Content-Type': undefined
            data: SelCustomer
        }
        $http(req).then(function (response) {
            //$scope.showDialog("Saved successfully!");
            $scope.GetCustomers();
            $scope.Customer = null;
            $scope.ju = null;
            $scope.mssg = null;
            $('#Modal-header-new').modal('hide');
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            $('#Modal-header-new').modal('hide');
            $scope.GetCustomers();
            $scope.Customer = null;
            $scope.mssg = null;
        });

    };


    $scope.setCurrCustomer = function (grp) {
        $scope.Customers1 = grp;
        $scope.poc = null;
        for (cnt = 0; cnt < $scope.Users.length; cnt++) {
            if ($scope.Users[cnt].Id == $scope.Customers1.PTSPOCId) {               
                $scope.poc = $scope.Users[cnt];
                break;
            }
        }

    };

    $scope.clearGroup = function () {
        $scope.Customers1 = null;
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

myapp1.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});




