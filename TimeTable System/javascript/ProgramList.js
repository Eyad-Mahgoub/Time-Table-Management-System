app.controller(
    'listProgram',
    function ($scope, $http, $q) {
        $scope.data;
        $scope.page_data;   
        $scope.page_no = 1; 
        $scope.page_rows = 10; 
        $scope.page_total;  
        $scope.program_data;  
        
        $scope.table = true;
        $scope.login = false;
        $scope.details = false;

        $scope.search;
        $scope.data_filtered;

        var sess_id = sessionStorage.getItem("session_id");

        if (sess_id){
            var authurl = "URL removed Due to Privacy Concerns";

            var ajax = $http({ method: "GET", 
                            url: authurl 
                            });
            
            ajax.then(
                function success(res) { ajaxSuccess(res) }, 
                function error(res) { ajaxError(res) }
            );

            function ajaxSuccess(res) {
                $scope.data = res.data;
                $scope.applyFilter()
            }
            function ajaxError(res) {
                alert("AJAX connection error!");
            }
        }else{
            $scope.table = false;
            $scope.login = true;
        }


        $scope.getDetails = function(id){
            var authurl = "URL removed Due to Privacy Concerns";

            var ajax = $http({ method: "GET", 
                            url: authurl 
                            });

            ajax.then(
                function success(res) { ajaxSuccess(res) }, 
                function error(res) { ajaxError(res) }
            );

            function ajaxSuccess(res) {
                $scope.program_data = res.data;
                $scope.table = false;
                $scope.details = true;
            }
            function ajaxError(res) {
                alert("AJAX connection error!");
            }
        }

        $scope.return = function(){
            $scope.details = false;
            $scope.table = true;
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
                    
                    if (el.nama_kurikulum.match(regex)) { return true; }
                    
                    return false;
            });
           
            
            countPage();
            $scope.goPage($scope.page_no);
        }       
    }
);