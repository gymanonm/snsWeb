/**
 * Created by Ronald on 2-6-2015.
 */
angular.module('controllers.authorizationController', [])

.controller('authorizationController', function($rootScope, $scope, authorizationFactory){
        $rootScope.loggingOut = false;

        console.log("ok");
        $scope.login = function(user){
            authorizationFactory.login(user);
            console.log("ok");
            console.log(localStorage.getItem("user"));
        }
    });
