app.controller(
    "timetable",
    function ($scope, $http, $q) {
        $scope.data;
        $scope.ttdata;
        $scope.page_data;   
        $scope.page_no = 1; 
        $scope.page_rows = 10; 
        $scope.page_total;

        $scope.search;
        $scope.data_filtered;

        $scope.login = false;
        $scope.ttable = false;
        $scope.sublist = true;
        
        var session = sessionStorage.getItem("session");
        var sem = sessionStorage.getItem("sem");

        if(session){
            var auth_url = "URL removed Due to Privacy Concerns";

            var ajax = $http({ method: "GET", 
                            url:auth_url
                            });
            
            ajax.then(
                function success(res) { ajaxSuccess(res) }, 
                function error(res) { ajaxError(res) }
            );

            function ajaxSuccess(res) {
                $scope.data = res.data;
                $scope.applyFilter();
            }
            function ajaxError(res) {
                alert("AJAX connection error!");
            }
        }else{
            $scope.sublist = false;
            $scope.login = true;
        }
        
        $scope.getTimetable = function(subjectCode, section) {                     
            var session = sessionStorage.getItem("session");
            var sem = sessionStorage.getItem("sem");

            var auth_url = "URL removed Due to Privacy Concerns";

            var ajax = $http({ method: "GET", 
                            url:auth_url
                            });
            
            ajax.then(
                function success(res) { ajaxSuccess(res) }, 
                function error(res) { ajaxError(res) }
            );

            function ajaxSuccess(res) {
                checkday(res.data);
                checktime(res.data);
                $scope.ttdata = res.data;
                $scope.ttable = true;
                $scope.sublist = false;
            }
            function ajaxError(res) {
                alert("AJAX connection error!");
            }
        }

        $scope.return = function(){
            $scope.ttable = false;
            $scope.sublist = true;
        }

        function checkday(data){
            for (let i = 0; i < data.length; i++){
                if (data[i].hari == "1"){
                    data[i].hari = "Monday";
                } else if (data[i].hari == "2"){
                    data[i].hari = "Tuesday";
                }else if (data[i].hari == "3"){
                    data[i].hari = "Wednesday";
                }else if (data[i].hari == "4"){
                    data[i].hari = "Thursday";
                }else if (data[i].hari == "5"){
                    data[i].hari = "Friday";
                }else if (data[i].hari == "6"){
                    data[i].hari = "Saturday";
                }else if (data[i].hari == "7"){
                    data[i].hari = "Sunday";
                }
            }
        }

        function checktime(data){
            for (let i = 0; i < data.length; i++){
                if (data[i].masa == "1"){
                    data[i].masa = "07:00 AM - 07:50 AM";
                }else if (data[i].masa == "2"){
                    data[i].masa = "08:00 AM - 08:50 AM	";
                }else if (data[i].masa == "3"){
                    data[i].masa = "09:00 AM - 09:50 AM	";
                }else if (data[i].masa == "4"){
                    data[i].masa = "10:00 AM - 10:50 AM	";
                }else if (data[i].masa == "5"){
                    data[i].masa = "11:00 AM - 11:50 AM	";
                }else if (data[i].masa == "6"){
                    data[i].masa = "12:00 PM - 12:50 PM	";
                }else if (data[i].masa == "7"){
                    data[i].masa = "01:00 PM - 01:50 PM	";
                }else if (data[i].masa == "8"){
                    data[i].masa = "02:00 PM - 02:50 PM	";
                }else if (data[i].masa == "9"){
                    data[i].masa = "03:00 PM - 03:50 PM	";
                }else if (data[i].masa == "10"){
                    data[i].masa = "04:00 PM - 04:50 PM	";
                }else if (data[i].masa == "11"){
                    data[i].masa = "05:00 PM - 05:50 PM	";
                }else if (data[i].masa == "12"){
                    data[i].masa = "06:00 PM - 06:50 PM	";
                }else if (data[i].masa == "13"){
                    data[i].masa = "07:00 PM - 07:50 PM	";
                }else if (data[i].masa == "14"){
                    data[i].masa = "08:00 PM - 08:50 PM	";
                }else if (data[i].masa == "15"){
                    data[i].masa = "09:00 PM - 09:50 PM	";
                }else if (data[i].masa == "16"){
                    data[i].masa = "10:00 PM - 10:50 PM ";
                }
            }
        }

        $scope.$watch('page_rows', function () {
            if ($scope.page_rows < 1) { $scope.page_rows = 1; }

            if ($scope.data && $scope.page_rows > 0) {
                countPage();
                $scope.goPage($scope.page_no);
            }
        });

        $scope.prevPage = function () {
            if ($scope.page_no > 1) {
                $scope.page_no--;
                $scope.goPage($scope.page_no);
            }
        }
        
        $scope.nextPage = function () {
            if ($scope.page_no < $scope.page_total) {
                $scope.page_no++
                $scope.goPage($scope.page_no);
            }
        }

        $scope.goPage = function (pnumber) {

            $scope.page_no = pnumber;

            var idx_start = $scope.page_rows * ($scope.page_no - 1);
            var idx_end = idx_start + parseInt($scope.page_rows) - 1;

            if ($scope.search != "") {
                $scope.page_data = $scope.data_filtered.slice(idx_start, idx_end + 1);
            } else {
                $scope.page_data = $scope.data.slice(idx_start, idx_end + 1);
            }

            $(".pnumber").css('color', '#63aaf7');
            $("#p" + pnumber).css('color', 'orange')
        }

        function countPage() {
            if ($scope.search != "") {
                $scope.page_total = Math.ceil($scope.data_filtered.length / $scope.page_rows);
            } else { 
                $scope.page_total = Math.ceil($scope.data.length / $scope.page_rows);
            }
            

            $scope.pages = [];
            for (var i = 0; i < $scope.page_total; i++) {
                $scope.pages.push(i + 1);
            }
        }
        
        $scope.applyFilter = function () {
            const regex = new RegExp($scope.search, 'i');
            
            $scope.data_filtered = $scope.data.filter(function (el) {
                    
                    if (el.nama_subjek.match(regex)) { return true; }
                    
                    return false;
            });
            
            countPage();
            $scope.goPage($scope.page_no);
        }
    }

    
);