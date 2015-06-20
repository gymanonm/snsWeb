/**
 * Created by Ronald on 2-6-2015.
 */

angular.module('factories.authorizationFactory', [])

.factory('authorizationFactory', function($http, $state, $window, apiurl){

        return {
            login : function(user){

                var req = {
                    method: 'POST',
                    url: apiurl.get()+'login',
                    skipAuthorization: true,
                    data: {username: user.username, password: user.password}
                };

                $http(req)
                    .success(function(data){
                        var user = {userId: data._id, username: data.username};
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", data.token);
                        console.log("Token: " + localStorage.getItem(("token")));

                        $window.location.href = '#/';
                    })
                    .error(function(err){
                        $window.location.href = '/login';
                    })
            },
            logout : function(){
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                $window.location.href = '/login';
            }
        }
    });
