/**
 * Created by Ronald on 2-6-2015.
 */
angular.module('controllers.authorizationController', [])

.controller('authorizationController', function($scope, authorizationFactory){

        console.log("ok");
        $scope.login = function(user){
            authorizationFactory.login(user);
            console.log("ok");
            console.log(localStorage.getItem("user"));
        }
    });
