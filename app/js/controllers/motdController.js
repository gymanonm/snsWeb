angular.module('controllers.motdController', [])

.controller('motdController', function ($scope, Motd) {
//        $http.get(apiurl.get()).success(function(response) { $scope.data = response })

                Motd.get(function (response) {
                    $scope.data = response
                });
});
