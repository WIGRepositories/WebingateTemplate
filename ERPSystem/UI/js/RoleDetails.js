// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage', 'ui.bootstrap', 'ntt.TreeDnD', 'angularjs-dropdown-multiselect'])

myapp1.controller(
       'BasicController', [
           '$scope', '$TreeDnDControl','$http', '$localStorage','$localStorage', function ($scope, $TreeDnDControl,$http, $localStorage,$localStorage) {

               $scope.GetRoles = function () {
                   $http.get('/api/Roles/GetRoles?allroles=-1').then(function (response, data) {
                       $scope.Roles = response.data;
                   });

                   $localStorage.ViewOnlyRoleDetails = ($localStorage.ViewOnlyRoleDetails == null) ? GetViewOnlyRoleDetails() : $localStorage.ViewOnlyRoleDetails;
                   $localStorage.SuperUserRoleDetails = ($localStorage.SuperUserRoleDetails == null) ? GetSuperUserRoleDetails() : $localStorage.SuperUserRoleDetails;
                   $localStorage.LocAdminRoleDetails = ($localStorage.LocAdminRoleDetails == null) ? GetLocAdminRoleDetails() : $localStorage.LocAdminRoleDetails;
                   $localStorage.SupervisorRoleDetails = ($localStorage.SupervisorRoleDetails == null) ? GetSupervisorRoleDetails() : $localStorage.SupervisorRoleDetails;

               }

               //Super User:
               //All permissions
 
               //Location Admin:
               //Upload certs, edit assets, manage jobs, manage resources, etc. BY LOCATION ONLY
               //View all other locations assets, view certs, view jobs, no manipulations.
 
               //    Supervisor:
               //Upload certs, manage jobs. BY LOCATION ONLY
               //View all other locations assets, view certs, view jobs, no manipulations.
 
               //View Only:
               //View certs, view assets. NO JOB MANAGEMENT. BY LOCATION ONLY.
 

               var tree;
               $scope.tree_data = {};
               $scope.my_tree = tree = {};

               $scope.newNode = null;

               $scope.ViewDetails = function (node) {
                   $scope.objDetails = node;
               }
               
               $scope.expanding_property = {
                   /*template: "<td>OK All</td>",*/
                   field: 'Name',
                   //titleClass: 'text-center',
                   cellClass: 'v-middle',
                   displayName: 'Name'
               };
                            

               $scope.col_defs = [
                   {
                       field: 'DataType',
                       displayName: 'Data Type',
                   },
                   {
                       displayName: 'Accesses',
                       field: 'Accesses'
                   },
                   {
                       displayName: 'Edit Accesses',
                       cellTemplate: '<button ng-click="ViewDetails(node)" data-target="#Modal-header-primary" data-toggle="modal" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Details</button>'
                   },
                    {
                        displayName: 'Edit Accesses',
                        cellTemplate: '<div ng-dropdown-multiselect="" options="example13data" selected-model="example13model" extra-settings="example13settings"></div>'
                    }
               ];

               $scope.example13model = [];
               $scope.example13data = [
                   { id: 1, label: "View" },
                   { id: 2, label: "Edit" },
                   { id: 3, label: "Delete" },
                   { id: 4, label: "Add" },
                   { id: 5, label: "Create" }, { id: 6, label: "Login" }];

               $scope.example13settings = {
                   smartButtonMaxItems: 3,                   
                   closeOnBlur:true
               };

               $scope.SaveAccesses = function () {
                 //  $scope.objDetails.Accesses = "V,D";//$scope.example13model;
               }
              
               $scope.getRoleDetails = function (s) {
                   $scope.objDetails = null;

                   switch (s.Id) {
                       //view only user
                       case 1:
                           $scope.tree_data = $localStorage.ViewOnlyRoleDetails;// $scope.tree_data1;
                           break;
                       case 2:                           
                           //$localStorage.SuperUserRoleDetails = GetViewOnlyRoleDetails();                           
                           $scope.tree_data = $localStorage.SuperUserRoleDetails;
                           break;
                       case 3:
                           //$localStorage.LocAdminRoleDetails = GetViewOnlyRoleDetails();
                           $scope.tree_data = $localStorage.LocAdminRoleDetails;
                           break;
                       case 4:
                           //$localStorage.SupervisorRoleDetails = GetViewOnlyRoleDetails();
                           $scope.tree_data = $localStorage.SupervisorRoleDetails;
                           break;
                       default:
                           alert('s');
                           break;
                   }
               }

               function GetViewOnlyRoleDetails() {

                   // $scope.tree_data = 
                   var data = [
                                {
                                   "DemographicId": 1,"ParentId": null,"Name": "EMP Portal","DataType": "Application","Accesses": "Login",
                                   "__children__":
                                       [
                                             {"DemographicId": 2,"ParentId": 1,"Name": "Asset Model","DataType": "Screen","Accesses": "View"},
                                             {"DemographicId": 3,"ParentId": 1,"Name": "Asset Model Details","DataType": "Screen","Accesses": "View"},
                                             { "DemographicId": 34, "ParentId": 1, "Name": "Job", "DataType": "Screen", "Accesses": "View" },
                                              {
                                                  "DemographicId": 35, "ParentId": 1, "Name": "Job Details", "DataType": "Screen", "Accesses": "View",
                                                  "__children__": [
                                                                  { "DemographicId": 36, "ParentId": 35, "Name": "JobResources", "DataType": "Text", "Accesses": "View" },
                                                                  { "DemographicId": 37, "ParentId": 35, "Name": "3rdPartyResources", "DataType": "Documents", "Accesses": "View" },
                                                                  { "DemographicId": 38, "ParentId": 35, "Name": "JobPersonel", "DataType": "Documents", "Accesses": "View" },
                                                  { "DemographicId": 39, "ParentId": 35, "Name": "JobComments", "DataType": "Documents", "Accesses": "View" }
                                                  ]
                                              },
                                             { "DemographicId": 4, "ParentId": 1, "Name": "Separator", "DataType": "Container", "Accesses": "View",
                                                  "__children__": [
                                                       {"DemographicId": 5,"ParentId": 4,"Name": "Maintainance Records","DataType": "Documents", "Accesses": "View"},
                                                        {"DemographicId": 6,"ParentId": 4,"Name": "Pre job records","DataType": "Documents", "Accesses": "View"},
                                                        {"DemographicId": 7,"ParentId": 4,"Name": "Post job records","DataType": "Documents", "Accesses": "View"},
                                                        {"DemographicId": 8,"ParentId": 4,"Name": "Manifold","DataType": "Container", "Accesses": "View",                                                       "__children__": [
                                                                {"DemographicId": 9,"ParentId": 8,"Name": "P&ID","DataType": "Text", "Accesses": "View"},
                                                                {"DemographicId": 10,"ParentId": 8,"Name": "Pressure Test","DataType": "Documents", "Accesses": "View"},
                                                                {"DemographicId": 11, "ParentId": 8, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View"}
                                                            ]
                                                        },
                                                        {"DemographicId": 12, "ParentId": 4, "Name": "Ball valve", "DataType": "Container", "Accesses": "View",
                                                            "__children__": [
                                                                {"DemographicId": 13,"ParentId": 12,"Name": "P&ID","DataType": "Text", "Accesses": "View"},
                                                                {"DemographicId": 14,"ParentId": 12,"Name": "Pressure Test","DataType": "Documents", "Accesses": "View"},
                                                                {"DemographicId": 15,"ParentId": 12,"Name": "Maintainance records","DataType": "Documents", "Accesses": "View"}]
                                                        },
                                                        {
                                                            "DemographicId": 16, "ParentId": 4, "Name": "PSVs", "DataType": "Container", "Accesses": "View",
                                                            "__children__": [
                                                               {"DemographicId": 17,"ParentId": 18,"Name": "P&ID","DataType": "Text", "Accesses": "View"},
                                                               {"DemographicId": 20,"ParentId": 18,"Name": "Pressure Test","DataType": "Documents", "Accesses": "View"},
                                                              { "DemographicId": 21, "ParentId": 18, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View" }
                                                            ]
                                                        },
                                                       {
                                                        "DemographicId": 24, "ParentId": 4, "Name": "Slign cert", "DataType": "Container", "Accesses": "View",
                                                        "__children__": [
                                                            {
                                                                "DemographicId": 25, "ParentId": 24, "Name": "Certificates", "DataType": "Container", "Accesses": "View",
                                                                "__children__": [
                                                                    {"DemographicId": 26,"ParentId": 24,"Name": "Certificate","DataType": "Document", "Accesses": "View"},
                                                                    {"DemographicId": 27,"ParentId": 24,"Name": "Inspection Date","DataType": "date", "Accesses": "View"},
                                                                    { "DemographicId": 28, "ParentId": 24, "Name": "Expiry Date", "DataType": "date", "Accesses": "View" }
                                                                ]
                                                          }]
                                                        },
                                                        {
                                                            "DemographicId": 29, "ParentId": 4, "Name": "NDT", "DataType": "Container", "Accesses": "View",
                                                            "__children__": [
                                                                {"DemographicId": 30,"ParentId": 29,"Name": "Certificates","DataType": "Container", "Accesses": "View",
                                                                    "__children__": [
                                                                      {"DemographicId": 31,"ParentId": 30,"Name": "Certificate","DataType": "Document", "Accesses": "View"},
                                                                      {"DemographicId": 32,"ParentId": 30,"Name": "Inspection Date","DataType": "date", "Accesses": "View"},
                                                                      { "DemographicId": 33, "ParentId": 30, "Name": "Expiry Date", "DataType": "date", "Accesses": "View" }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                       ]
                                }
                            ]
                        return data;
               }

               function GetSuperUserRoleDetails() {

                   // $scope.tree_data = 
                   var data = [
                                {
                                    "DemographicId": 1, "ParentId": null, "Name": "EMP Portal", "DataType": "Application", "Accesses": "Login",
                                    "__children__":
                                        [
                                              { "DemographicId": 2, "ParentId": 1, "Name": "Asset Model", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                              { "DemographicId": 3, "ParentId": 1, "Name": "Asset Model Details", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                               { "DemographicId": 34, "ParentId": 1, "Name": "Job", "DataType": "Screen", "Accesses": "View" },
                                              {
                                                  "DemographicId": 35, "ParentId": 1, "Name": "Job Details", "DataType": "Screen", "Accesses": "View",
                                                  "__children__": [
                                                                  { "DemographicId": 36, "ParentId": 35, "Name": "JobResources", "DataType": "Text", "Accesses": "View" },
                                                                  { "DemographicId": 37, "ParentId": 35, "Name": "3rdPartyResources", "DataType": "Documents", "Accesses": "View" },
                                                                  { "DemographicId": 38, "ParentId": 35, "Name": "JobPersonel", "DataType": "Documents", "Accesses": "View" },
                                                  { "DemographicId": 39, "ParentId": 35, "Name": "JobComments", "DataType": "Documents", "Accesses": "View" }
                                                  ]
                                              },
                                              {
                                                  "DemographicId": 4, "ParentId": 1, "Name": "Separator", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                  "__children__": [
                                                       { "DemographicId": 5, "ParentId": 4, "Name": "Maintainance Records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        { "DemographicId": 6, "ParentId": 4, "Name": "Pre job records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        { "DemographicId": 7, "ParentId": 4, "Name": "Post job records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        {
                                                            "DemographicId": 8, "ParentId": 4, "Name": "Manifold", "DataType": "Container", "Accesses": "View,Edit,Delete,Create", "__children__": [
                                                                   { "DemographicId": 9, "ParentId": 8, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                   { "DemographicId": 10, "ParentId": 8, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                   { "DemographicId": 11, "ParentId": 8, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                            ]
                                                        },
                                                        {
                                                            "DemographicId": 12, "ParentId": 4, "Name": "Ball valve", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                                { "DemographicId": 13, "ParentId": 12, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                { "DemographicId": 14, "ParentId": 12, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                { "DemographicId": 15, "ParentId": 12, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }]
                                                        },
                                                        {
                                                            "DemographicId": 16, "ParentId": 4, "Name": "PSVs", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                               { "DemographicId": 17, "ParentId": 18, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                               { "DemographicId": 20, "ParentId": 18, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                              { "DemographicId": 21, "ParentId": 18, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                            ]
                                                        },
                                                       {
                                                           "DemographicId": 24, "ParentId": 4, "Name": "Slign cert", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                           "__children__": [
                                                               {
                                                                   "DemographicId": 25, "ParentId": 24, "Name": "Certificates", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                                   "__children__": [
                                                                       { "DemographicId": 26, "ParentId": 24, "Name": "Certificate", "DataType": "Document", "Accesses": "View,Edit,Delete,Create" },
                                                                       { "DemographicId": 27, "ParentId": 24, "Name": "Inspection Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" },
                                                                       { "DemographicId": 28, "ParentId": 24, "Name": "Expiry Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" }
                                                                   ]
                                                               }]
                                                       },
                                                        {
                                                            "DemographicId": 29, "ParentId": 4, "Name": "NDT", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                                {
                                                                    "DemographicId": 30, "ParentId": 29, "Name": "Certificates", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                                    "__children__": [
                                                                      { "DemographicId": 31, "ParentId": 30, "Name": "Certificate", "DataType": "Document", "Accesses": "View,Edit,Delete,Create" },
                                                                      { "DemographicId": 32, "ParentId": 30, "Name": "Inspection Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" },
                                                                      { "DemographicId": 33, "ParentId": 30, "Name": "Expiry Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                  ]
                                              }
                                        ]
                                }
                   ]
                   return data;
               }

               function GetSupervisorRoleDetails() {

                   // $scope.tree_data = 
                   var data = [
                                {
                                    "DemographicId": 1, "ParentId": null, "Name": "EMP Portal", "DataType": "Application", "Accesses": "Login",
                                    "__children__":
                                        [
                                              { "DemographicId": 2, "ParentId": 1, "Name": "Asset Model", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                              { "DemographicId": 3, "ParentId": 1, "Name": "Asset Model Details", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                               { "DemographicId": 34, "ParentId": 1, "Name": "Job", "DataType": "Screen", "Accesses": "View" },
                                              {
                                                  "DemographicId": 35, "ParentId": 1, "Name": "Job Details", "DataType": "Screen", "Accesses": "View",
                                                  "__children__": [
                                                                  { "DemographicId": 36, "ParentId": 35, "Name": "JobResources", "DataType": "Text", "Accesses": "View" },
                                                                  { "DemographicId": 37, "ParentId": 35, "Name": "3rdPartyResources", "DataType": "Documents", "Accesses": "View" },
                                                                  { "DemographicId": 38, "ParentId": 35, "Name": "JobPersonel", "DataType": "Documents", "Accesses": "View" },
                                                  { "DemographicId": 39, "ParentId": 35, "Name": "JobComments", "DataType": "Documents", "Accesses": "View" }
                                                  ]
                                              },
                                              {
                                                  "DemographicId": 4, "ParentId": 1, "Name": "Separator", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                  "__children__": [
                                                       { "DemographicId": 5, "ParentId": 4, "Name": "Maintainance Records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        { "DemographicId": 6, "ParentId": 4, "Name": "Pre job records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        { "DemographicId": 7, "ParentId": 4, "Name": "Post job records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        {
                                                            "DemographicId": 8, "ParentId": 4, "Name": "Manifold", "DataType": "Container", "Accesses": "View,Edit,Delete,Create", "__children__": [
                                                                   { "DemographicId": 9, "ParentId": 8, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                   { "DemographicId": 10, "ParentId": 8, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                   { "DemographicId": 11, "ParentId": 8, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                            ]
                                                        },
                                                        {
                                                            "DemographicId": 12, "ParentId": 4, "Name": "Ball valve", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                                { "DemographicId": 13, "ParentId": 12, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                { "DemographicId": 14, "ParentId": 12, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                { "DemographicId": 15, "ParentId": 12, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }]
                                                        },
                                                        {
                                                            "DemographicId": 16, "ParentId": 4, "Name": "PSVs", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                               { "DemographicId": 17, "ParentId": 18, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                               { "DemographicId": 20, "ParentId": 18, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                              { "DemographicId": 21, "ParentId": 18, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                            ]
                                                        },
                                                       {
                                                           "DemographicId": 24, "ParentId": 4, "Name": "Slign cert", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                           "__children__": [
                                                               {
                                                                   "DemographicId": 25, "ParentId": 24, "Name": "Certificates", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                                   "__children__": [
                                                                       { "DemographicId": 26, "ParentId": 24, "Name": "Certificate", "DataType": "Document", "Accesses": "View,Edit,Delete,Create" },
                                                                       { "DemographicId": 27, "ParentId": 24, "Name": "Inspection Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" },
                                                                       { "DemographicId": 28, "ParentId": 24, "Name": "Expiry Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" }
                                                                   ]
                                                               }]
                                                       },
                                                        {
                                                            "DemographicId": 29, "ParentId": 4, "Name": "NDT", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                                {
                                                                    "DemographicId": 30, "ParentId": 29, "Name": "Certificates", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                                    "__children__": [
                                                                      { "DemographicId": 31, "ParentId": 30, "Name": "Certificate", "DataType": "Document", "Accesses": "View,Edit,Delete,Create" },
                                                                      { "DemographicId": 32, "ParentId": 30, "Name": "Inspection Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" },
                                                                      { "DemographicId": 33, "ParentId": 30, "Name": "Expiry Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                  ]
                                              }
                                        ]
                                }
                   ]
                   return data;
               }


               function GetLocAdminRoleDetails() {

                   // $scope.tree_data = 
                   var data = [
                                {
                                    "DemographicId": 1, "ParentId": null, "Name": "EMP Portal", "DataType": "Application", "Accesses": "Login",
                                    "__children__":
                                        [
                                              { "DemographicId": 2, "ParentId": 1, "Name": "Asset Model", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                              { "DemographicId": 3, "ParentId": 1, "Name": "Asset Model Details", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                               { "DemographicId": 34, "ParentId": 1, "Name": "Job", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create" },
                                              {
                                                  "DemographicId": 35, "ParentId": 1, "Name": "Job Details", "DataType": "Screen", "Accesses": "View,Edit,Delete,Create",
                                                  "__children__": [
                                                                  { "DemographicId": 36, "ParentId": 35, "Name": "JobResources", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                  { "DemographicId": 37, "ParentId": 35, "Name": "3rdPartyResources", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                  { "DemographicId": 38, "ParentId": 35, "Name": "JobPersonel", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                  { "DemographicId": 39, "ParentId": 35, "Name": "JobComments", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                  ]
                                              },
                                              {
                                                  "DemographicId": 4, "ParentId": 1, "Name": "Separator", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                  "__children__": [
                                                       { "DemographicId": 5, "ParentId": 4, "Name": "Maintainance Records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        { "DemographicId": 6, "ParentId": 4, "Name": "Pre job records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        { "DemographicId": 7, "ParentId": 4, "Name": "Post job records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                        {
                                                            "DemographicId": 8, "ParentId": 4, "Name": "Manifold", "DataType": "Container", "Accesses": "View,Edit,Delete,Create", "__children__": [
                                                                   { "DemographicId": 9, "ParentId": 8, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                   { "DemographicId": 10, "ParentId": 8, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                   { "DemographicId": 11, "ParentId": 8, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                            ]
                                                        },
                                                        {
                                                            "DemographicId": 12, "ParentId": 4, "Name": "Ball valve", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                                { "DemographicId": 13, "ParentId": 12, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                                { "DemographicId": 14, "ParentId": 12, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                                { "DemographicId": 15, "ParentId": 12, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }]
                                                        },
                                                        {
                                                            "DemographicId": 16, "ParentId": 4, "Name": "PSVs", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                               { "DemographicId": 17, "ParentId": 18, "Name": "P&ID", "DataType": "Text", "Accesses": "View,Edit,Delete,Create" },
                                                               { "DemographicId": 20, "ParentId": 18, "Name": "Pressure Test", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" },
                                                              { "DemographicId": 21, "ParentId": 18, "Name": "Maintainance records", "DataType": "Documents", "Accesses": "View,Edit,Delete,Create" }
                                                            ]
                                                        },
                                                       {
                                                           "DemographicId": 24, "ParentId": 4, "Name": "Slign cert", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                           "__children__": [
                                                               {
                                                                   "DemographicId": 25, "ParentId": 24, "Name": "Certificates", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                                   "__children__": [
                                                                       { "DemographicId": 26, "ParentId": 24, "Name": "Certificate", "DataType": "Document", "Accesses": "View,Edit,Delete,Create" },
                                                                       { "DemographicId": 27, "ParentId": 24, "Name": "Inspection Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" },
                                                                       { "DemographicId": 28, "ParentId": 24, "Name": "Expiry Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" }
                                                                   ]
                                                               }]
                                                       },
                                                        {
                                                            "DemographicId": 29, "ParentId": 4, "Name": "NDT", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                            "__children__": [
                                                                {
                                                                    "DemographicId": 30, "ParentId": 29, "Name": "Certificates", "DataType": "Container", "Accesses": "View,Edit,Delete,Create",
                                                                    "__children__": [
                                                                      { "DemographicId": 31, "ParentId": 30, "Name": "Certificate", "DataType": "Document", "Accesses": "View,Edit,Delete,Create" },
                                                                      { "DemographicId": 32, "ParentId": 30, "Name": "Inspection Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" },
                                                                      { "DemographicId": 33, "ParentId": 30, "Name": "Expiry Date", "DataType": "date", "Accesses": "View,Edit,Delete,Create" }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                  ]
                                              }
                                        ]
                                }
                   ]
                   return data;
               }
    }]
   );

myapp1.directive(
    'panel', function () {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            template: '<div class="panel" ng-class="\'panel-\' + type">' +
                        '   <div ng-if="title && title.length > 0" class="panel-heading">' +
                        '       <h3 class="panel-title">{{ title }}</h3>' +
                        '   </div>' +
                        '   <div class="panel-body"><tree-dnd tree-data="tree_data" tree-control="my_tree" primary-key="DemographicId" column-defs="col_defs"' +
                        '   expand-on="expanding_property"></tree-dnd></div>' +
                        '</div>',
            // transclude: true,
            link: function fnPost(scope, element, attrs) {
                scope.title = attrs.title || '';
                scope.type = attrs.type || 'info';
            }
        };
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