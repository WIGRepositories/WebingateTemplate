var myapp1 = angular.module('myApp', ['ngStorage', 'ngRoute', 'ui.bootstrap', 'ngSanitize',  'treasure-overlay-spinner', 'angularFileUpload'])

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
myapp1.filter('hasTag', function () {
    return function (items, tagName) {
        if (items == null) return;
        var filtered = [];
        angular.forEach(items, function (el) {
            if (el.tags && el.tags.indexOf(tagName) > -1) {
                filtered.push(el);
            }
        });
        return filtered;
    }
});

var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal, $filter, fileReader, $upload, $rootScope) {

    if ($localStorage.uname == null) {
       // window.location.href = "../login.html";
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
    $scope.IsFileExtnInvalid = false;
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.isSuperUser = $localStorage.isSuperUser;
    $scope.CanCreate = 0;
    $scope.roleLocations = $localStorage.roleLocation;
    $scope.docfiles = [];
    $scope.MoveDocTypeId = null;
    $scope.d = null;
    $scope.l = null;
    $scope.fname = null;

    $scope.InitData = function () {

        $http.get('/api/Types/TypesByGroupId?groupid=4').then(function (res, data) {
            $scope.docTypes = res.data;
        });

        // $rootScope.spinner.on();
        $http.get('/api/location/getlocations').then(function (res, data) {
            $scope.Locations = res.data;
        }, function (errres) {
            // alert(errres);
            //  $rootScope.spinner.off();
        });      

        //check the loction of the selected asset
        //if user is not super user then compare with the location of the user
        //if location is mismatching then disable the save button
        $scope.CanEdit = ($scope.isSuperUser == 1) ? 1 : 0;
        $scope.CanUploadDoc = ($scope.isSuperUser == 1) ? 1 : 0;
        $scope.CanCreate = ($scope.isSuperUser == 1) ? 1 : 0;
        if ($scope.isSuperUser == 0 && $scope.roleLocations != null) {

            $scope.CanEdit = 0;
            $scope.CanUploadDoc = 0;
            if ($scope.l != null) {
                for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                    if ($scope.l.LocationId == $scope.roleLocations[cnt].LocationId) {
                        $scope.CanEdit = ($scope.roleLocations[cnt].roleid == 2) ? 1 : 0;
                        break;
                    }
                }

                for (cnt = 0; cnt < $scope.roleLocations.length; cnt++) {
                    if ($scope.l.LocationId == $scope.roleLocations[cnt].LocationId) {
                        $scope.CanCreate = ($scope.roleLocations[cnt].roleid == 2 || $scope.roleLocations[cnt].roleid == 3) ? 1 : 0;
                        break;
                    }
                }
            }
        }
        $scope.GetDocsList();

        //document.getElementById('docNameTextBox').text = "";
        //document.getElementById('docTypeDD').value = "";
        //document.getElementById('locTypeDD').value = "";
    }

    $scope.ClearFilter = function (l,d,fname) {

       
        this.fname = '';
        this.d = null;
        this.l = null;
      
        $scope.GetDocsList();
    }

    $scope.GetDocsList = function () {

        $rootScope.spinner.on();
        $scope.docfiles = [];
        $http.get('/api/Documents/GetDocsList').then(function (res, data) {
            $scope.docs1 = res.data;
            $scope.docs = $scope.docs1;
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
        }, function (errres) {
            // alert(errres);
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
        });       
    }

    $scope.FilterDocsList = function (l,d,f) {

        if ((d == null || d != "") && (l == null || l == "") && f == null) {
            $scope.GetDocsList();
            return;
        }
        $scope.docfiles = [];

        var filterdoc = {
            FileName: f,
            LocationId: (l==null || l =="") ? -1 : l,
            docTypeId: (d == null || d == "") ? -1 : d
        }
        var req = {
            method: 'POST',
            url: '/api/Documents/FilteredDocsList',
            data: filterdoc
        }
        $rootScope.spinner.on();

        $http(req).then(function (res) {

            $scope.docs1 = res.data;
            $scope.docs = [];
            for (cnt = 0; cnt < $scope.docs1.length; cnt++) {
                if ($scope.docs1[cnt].t1 == 0 && $scope.docs1[cnt].rootid == 1)
                    continue;
                else
                $scope.docs.push($scope.docs1[cnt]);
            }
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
        }, function (errres) {
            // alert(errres);
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
        });

        if (d != null && d != "") {
            $scope.MoveDocTypeId = d;
        }
        
    }

    $scope.hasTag1 = function (text) {
         
        return $scope.docs[0];
    }

    $scope.deletedDocs = [];
    $scope.addedUpdatedDocs = [];
    $scope.docs = null;
    $scope.docs1 = null;
    $scope.ppdocOrderNo = null;

    $scope.SetParentDoc = function (a) {
        $scope.ppdocOrderNo = a.OrderNo;
        //alert($scope.ppdocOrderNo);
    }

    $scope.onFileSelect = function (files, $event) {

        $scope.docfiles =[];
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
                        ID: -1,
                        createdById: 1,
                        UpdatedById: 1,

                        LocationId: ($scope.ppdoc == null || $scope.ppdoc.Location1 == null) ? null : $scope.ppdoc.Location1.id,

                        docTypeId: ($scope.ppdoc == null || $scope.ppdoc.docType == null) ? null : $scope.ppdoc.docType.Id,
                        docType: ($scope.ppdoc == null || $scope.ppdoc.docType == null) ? null : $scope.ppdoc.docType.Name,//
                        FileName: files[0].name,
                        FileContent: result,

                        exipryDate: ($scope.ppdoc == null || $scope.ppdoc.ExpiryDate == null) ? null : getdateFormat($scope.ppdoc.ExpiryDate),
                        effectiveDate: ($scope.ppdoc == null || $scope.ppdoc.effectiveDate == null) ? null : getdateFormat($scope.ppdoc.effectiveDate),
                        Description: ($scope.ppdoc == null || $scope.ppdoc.Desc == null) ? null : $scope.ppdoc.Desc,
                        OrderNo : ($scope.ppdocOrderNo == null) ? 0 : $scope.ppdocOrderNo, 
                        insupddelflag: 'I'
        }

            //check if already the file exists                       
            for (cnt = 0; cnt < $scope.docfiles.length; cnt++) {
                if ($scope.docfiles[cnt].FileName == files[0].name) {
                    $scope.docfiles.splice(cnt, 1);
            }
        }

            $scope.docfiles.push(doc);
            //if ($scope.DocFiles)
            //{
            //    $scope.DocFiles.push(doc);
            //}

    });
    };
    $scope.SaveDoc = function () {

        var req = {
                method: 'POST',
                url: '/api/Documents/SaveDocsList',
                data: $scope.docfiles
    }
        $rootScope.spinner.on();

        $http(req).then(function (response) {

            $scope.currDoc = null;
            $scope.GetDocsList();
            $scope.ppdocOrderNo = null;
            $scope.MoveDocTypeId = null;
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
             $scope.showDialog1(errmssg);
            //alert(errmssg);
    });
    }
    $scope.validateFile = function ($event) {
        //if ($scope.assetDoc.docType == null) {
        //    alert('Please select docType');
        //    $event.stopPropagation();
        //    $event.preventDefault();
        //    return;
        //}
    }

    $scope.EditPPDoc = function (f) {
         $scope.currDoc = f;
        //$scope.assetDoc.insupddelflag = 'U';

        //for (cnt = 0; cnt < $scope.docfiles.length; cnt++) {
        //    if ($scope.docfiles[cnt].FileName == f.FileName) {
        //        $scope.assetDoc = $scope.docfiles[cnt];
        //        break;
        //    }
        //}
    }

    $scope.setDocType = function () {
        if ($scope.currDoc.docType1) {
            if ($scope.currDoc.docType1.Id != $scope.currDoc.docTypeId) {
                $scope.currDoc.DocTypeId = $scope.currDoc.docType1.Id;
                $scope.currDoc.DocType = $scope.currDoc.docType1.Name;
        }
    }
    }
    $scope.setLocation = function () {
        if ($scope.currDoc.Location1) {
            if ($scope.currDoc.Location1.id != $scope.currDoc.LocationId) {
                $scope.currDoc.LocationId = $scope.currDoc.Location1.id;
                $scope.currDoc.Location = $scope.currDoc.Location1.name;
                $scope.CheckCanCreate($scope.currDoc.LocationId);
        }
    }
    }
    $scope.updateDoc = function () {

        $scope.currDoc.insupddelflag = 'U';
        ////check if the location is changed
        //if ($scope.Location1) {
        //    if ($scope.Location1.id != $scope.currDoc.Location.id)
        //    {
        //        $scope.Location = $scope.Location1;
        //    }
        //}
        $scope.docfiles.push($scope.currDoc);
        $scope.SaveDoc();
        $scope.currDoc = null;
    }
    $scope.DeleteDoc = function (d) {
        var candelete = confirm('Do you really wish to delete this file?');
        if (!candelete) {
            return;
    }
        d.insupddelflag = 'D';
        $scope.docfiles.push(d);
            $scope.SaveDoc();

    }

    $scope.GetFileContent = function (f) {
        if (f.Id == -1) {
            //this is newly added document, hence show without going to db
            for (cnt = 0; cnt < $scope.docfiles.length; cnt++) {
                if ($scope.docfiles[cnt].FileName == f.FileName) {
                    openPDF(f.docContent, f.FileName);
            }
        }

        }
        else {
            // var data = $scope.docfiles[0];  
            $rootScope.spinner.on();
            //get the file content from db
            $http.get('/api/Documents/GetPPFileContent?docId=' +f.Id).then(function (res, data) {
                $scope.docDetails = res.data[0];
                $rootScope.spinner.off();
                $("#ppdocuments-content").show();

                openPDF($scope.docDetails.FileContent, $scope.docDetails.FileName);

            }, function (errres) {
                // alert(errres);
                $rootScope.spinner.off();
                $("#ppdocuments-content").show();
        });
    }
    }

        function openPDF(resData, fileName) {

        var blob = null;
        var ext = fileName.split('.').pop();
        if (ext == 'csv') {
            blob = new Blob([resData], { type: "text/csv"
        });
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

        function b64toBlob(b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays =[];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset +sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
        }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType
        });
        return blob;
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
        winLookup = window.open('', 'winLookup', 'scrollbars=no,resizable=yes,toolbar=' + (showToolbar ? 'yes' : 'no') + ',height=' + m_height + ',width=' + m_width + ',top=' + intTop + ',left=' +intLeft);
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
            var ext = m_title.split('.').pop();
            switch (ext) {
                case 'pdf':
                    // winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><object  data="' + m_url + '" height="100%" width="100%" ><///object></body></html>');
                    var blob = new Blob([resData], { type: 'application/pdf'
                });
                    saveAs(blob, m_title);
                    break;
                case 'csv':

                    var blob = new Blob([resData], 'text/csv');
                    saveAs(blob, m_title);

                    break;
                default:
                    winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><img src="' + m_url + '" height="100%" width="100%" /></body></html>');
                    //var blob = new Blob([resData], 'text/csv');                    
                    //saveAs(blob, m_title);


                    //image/png;base64
                    break;
        }
            // winLookup.document.write('<html><head><title>' + m_title + '</title></head><body height="100%" width="100%"><embed src="' + m_url + '" type="application/pdf" height="100%" width="100%" /></body></html>');
        } else {
            // if not loaded yet
            setTimeout(checkPopup(m_url, m_title), 10); // check in another 10ms
        }
    }

    $scope.SetDocdocCatId = function (docCatId) {
        $scope.CurrDocdocCatId = docCatId;
    }

        function getdateFormat(date) {
        var formateddate = date;

        if (date) {
            formateddate = $filter('date') (date, 'MM-dd-yyyy');
        }

        return formateddate;
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

        //$scope.MoveUp = function (ix) {
        //    // Make sure it's in the list! The last item we don't have to do anything with
        //    if (ix > -1 && ix < $scope.docs.length - 1) {
        //        var tmp = $scope.docs[ix + 1];
        //        $scope.docs[ix + 1] = $scope.docs[ix];
        //        $scope.docs[ix] = tmp;
        //    } else {
        //      //  alert('you are at the end!');
        //    }
        //};

        //$scope.MoveDown = function (ix) {
        //    // Make sure it's in the list! The last item we don't have to do anything with
        //    if (ix > -1 && ix < $scope.docs.length - 1) {
        //        var tmp = $scope.docs[ix - 1];
        //        $scope.docs[ix - 1] = $scope.docs[ix];
        //        $scope.docs[ix] = tmp;
        //    } else {
        //        //  alert('you are at the end!');
        //    }
        //};

    $scope.moveItem = function (origin, destination) {
        var temp = $scope.docs[destination];

        if (temp == null) return;
        if (temp.rootid == 1) return;

        $scope.docs[destination] = $scope.docs[origin];
        $scope.docs[origin] = temp;
    };

    //    // Move list item Up
    //$scope.MoveUp = function (itemIndex) {
    //    $scope.moveItem(itemIndex, itemIndex -1);
    //};

    //    // Move list item Down
    //$scope.MoveDown = function (itemIndex) {
    //    $scope.moveItem(itemIndex, itemIndex +1);
    //};

    $scope.MoveDoc = function (doc, down) {
        doc.IncPosition = down;
        doc.insupddelflag = 'R';

        $scope.reorderdocfiles = [];
        $scope.reorderdocfiles.push(doc);

        var f = document.getElementById('docNameTextBox').value;
        var d = document.getElementById('docTypeDD').value;
        var l = document.getElementById('locTypeDD').value;

        var req = {
            method: 'POST',
            url: '/api/Documents/SaveDocsList',
            data: $scope.reorderdocfiles
        }
        $rootScope.spinner.on();

        $http(req).then(function (response) {

            $scope.currDoc = null;
            if ((d != null && d != "") || (l != null && l != "") || f != null )
                $scope.FilterDocsList(l, d, f);
               else
            $scope.GetDocsList();
            $scope.ppdocOrderNo = null;
            $scope.MoveDocTypeId = doc.DocTypeId;
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();


        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            $scope.MoveDocTypeId = null;
            $rootScope.spinner.off();
            $("#ppdocuments-content").show();
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog1(errmssg);
            //alert(errmssg);
        });
    }

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        //alert("ng-repeat finished");
        $("#example-advanced").treetable({ expandable: true }, true);
        if ($scope.MoveDocTypeId != null)
        {
            $("#example-advanced").treetable("reveal", $scope.MoveDocTypeId);
        }
    });
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


//angular.module("dragndropdemo", ['ngRepeatReorder']);
//function dragndropdemo($scope) {
//    $scope.names = [{ val: 'bob' }, { val: 'lucy' }, { val: 'john' }, { val: 'luke' }, { val: 'han' }];
//    $scope.tempplayer = '';
//    $scope.updateNames = function () {
//        if ($scope.tempplayer === "") return
//        $scope.names.push({ val: $scope.tempplayer });
//        $scope.tempplayer = "";
//    };
//    $scope.checkForNameDelete = function ($index) {
//        if ($scope.names[$index].val === '') {
//            $scope.names.splice($index, 1);
//        }
//    };
//};