(function(){
    'use strict';

    var log = function(str) { console.log(str); };

    app.controller('IndexController', function($scope, $facebook) {
        $scope.test = "test"

        // bind directly to the response promise

        // use the promise in code
        $facebook.getLoginStatus().then(
            function(response) {
                $scope.loginResponse = response;
            },
            function(response) {
                $scope.loginError = response.error;
            }
        );


        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
              // Logged into your app and Facebook.
              testAPI();
            } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
            } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
            }
        }

        function testAPI() {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
            });
        }


        $scope.checkLoginState = function() {

            $facebook.getLoginStatus().then(function(data) {
                statusChangeCallback(data)
            })
        }


    })
}());
