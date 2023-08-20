
// Register controller 
app.controller(
    'login',
    function ($scope, $http) {
       
        $scope.userLogout = true;
        $scope.userLogin = false;
        
        var session_id = sessionStorage.getItem("session_id");
        
        if (session_id) {
            var auth_url = "URL removed Due to Privacy Concerns";
            
            var ajax = $http({ method: "GET", url: auth_url});

            ajax.then(
                function success(res) { ajaxSuccess(res) },
                function error(res) { ajaxError(res) }
            );

            function ajaxSuccess(res) {
                
                
                if (res.data) {


                    $scope.session_info = res.data[0];       
                    
                    $scope.userLogout = false;
                    $scope.userLogin = true;
                } else {
                    alert.log("session invalid");
                }
            }

            function ajaxError(res) {
            
                alert("AJAX connection error!");
            }
        }
        
        $scope.doAuth = function() {
            if ($scope.login && $scope.password) {
    
                
                var auth_url = "URL removed Due to Privacy Concerns";

                var ajax = $http({ method: "GET", url: auth_url});

                ajax.then(
                    function success(res) { ajaxSuccess(res) },
                    function error(res) { ajaxError(res) }
                );

                function ajaxSuccess(res) {
                
                    
                    if (res.data) {
                    
                        sessionStorage.setItem("session_id", res.data[0].session_id);
                        
                        $scope.session_info = res.data[0];
                        
                        $scope.userLogout = false;
                        $scope.userLogin = true;
                        
                        auth_url = "URL removed Due to Privacy Concerns";
                        
                        doAuthAdmin(auth_url);
                        getSessem();
                        
                    } else {
                        alert("login fail");
                    }
                }

                function ajaxError(res) {
                    alert("AJAX connection error!");
                }
            } else {
                alert("Please provide login & password!");
            }
        }
        
        function doAuthAdmin(auth_url) {
    
            
            var ajax = $http({ method: "GET", url: auth_url});

            ajax.then(
                function success(res) { ajaxSuccess(res) },
                function error(res) { ajaxError(res) }
            );

            function ajaxSuccess(res) {
                
                
                if (res.data) {
                   
                    sessionStorage.setItem("session_id_admin", res.data[0].session_id);
                    
                } else {
                    alert("login fail");
                }
            }

            function ajaxError(res) {
                alert("AJAX connection error!");
            }
        }
        
        $scope.doLogout = function() {
            $scope.userLogout = true;
            $scope.userLogin = false;
            sessionStorage.clear();
        }

        function getSessem(){
            var auth = "URL removed Due to Privacy Concerns"; 

            var ajax = $http({ method: "GET", url: auth});

            ajax.then(
                function success(res) { ajaxSuccess(res) },
                function error(res) { ajaxError(res) }
            );
            
            function ajaxSuccess(res) {
                sessionStorage.setItem("session", res.data[1].sesi);
                sessionStorage.setItem("sem", res.data[1].semester);

                sessionStorage.setItem("session_program", "2020/2021");
            }

            function ajaxError(res) {
                alert("AJAX connection error!");
            }
        }
    }
);
