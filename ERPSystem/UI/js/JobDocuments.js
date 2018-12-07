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

var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $rootScope) {

    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.isAdminSupervisor = $localStorage.isAdminSupervisor;

    $scope.init = function () {

        $http.get('/api/GetCustomers').then(function (res, data) {
            $scope.Customers = res.data;
        });

        $http.get('/api/Types/TypesByGroupId?groupid=3').then(function (res, data) {
            $scope.jobStatus = res.data;
        });

        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
        });

        $scope.GetJobDocuments();
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

    $scope.GetJobDocuments = function () {
        var mid = ($scope.s == null) ? -1 : $scope.s.Id;
        var lid = ($scope.l == null) ? -1 : $scope.l.id;
        var custId = ($scope.c == null || $scope.c.Id == null) ? -1 : $scope.c.Id;

        $http.get('/api/Jobs/GetJobDocuments?locationId=' + lid + '&statusId=' + mid + '&customerId=' + custId).then(function (res, data) {
            $scope.JobDocuments = res.data;
            $rootScope.spinner.off();
            $("#jobdocuments-content").show();
        });
    }

    //function stuffController($scope) {
    //    $scope.$on('$viewContentLoaded', jqueryStartWork);
    //}
   

    $scope.GetFileContent = function (a) {
        // var data = $scope.currobj.files1[0];  
       
        //get the file content from db
        var docid = a.ID % 100000;
        $http.get('/api/Jobs/GetJobFileContent?docId=' + docid).then(function (res, data) {
                $scope.docDetails = res.data[0];
                openPDF($scope.docDetails.DocContent, $scope.docDetails.DocName);
            });
        
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


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        //alert("ng-repeat finished");
        $("#example-advanced").treetable({ expandable: true }, true);
    });

    $scope.GoToJobDetails = function (aid) {
        $localStorage.nJobId = aid;
        window.location.href = "JobDetails.html";
    }
});