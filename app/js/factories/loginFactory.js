/**
 * Created by Ronald on 2-6-2015.
 */

angular.module('factories.authorizationFactory', [])

.factory('authorizationFactory', function($http, $state, $window){

        var localUrl = "http://localhost:8080";

        return {
            login : function(user){

                var req = {
                    method: 'POST',
                    url: localUrl+'/login',
                    skipAuthorization: true,
                    data: {username: user.username, password: user.password}
                };

                $http(req)
                    .success(function(data){
                        console.log("Token: " + data.token);
                        var user = {userId: data._id, username: data.username, token: data.token};
                        localStorage.setItem("user", user);
                        console.log(localStorage.getItem("user").token);

                        $window.location.href = '/';

                    })
                    .error(function(err){
                        $window.location.href = '/login';
                    })
            },
            logout : function(){
                localStorage.removeItem("user");
                $window.location.href = '/login';
            }
        }
    });