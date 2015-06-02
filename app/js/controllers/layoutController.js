angular.module('controllers.layoutController', [])

  .controller('layoutController', function($scope, $http, apiurl, $window){
    $http.get(apiurl.get() + "profile/").success(function(response) {
      var userID = response.data.userid;
      $http.get(apiurl.get() + "employees/" + userID + '/notifications').success(function(response) { console.log(response.data); })
    })

    var alerts = [{"message": "Hallo, ontvang jij mijn bericht?", "EmployeeID": "554eabc1fe4e330300000002", "ChatId": "5563304b2edb92844f000005", "_id": "5563308f2edb92844f000009", "__v": 0}];
    $scope.alerts = alerts;

        $scope.logout = function(){
            localStorage.setItem("user", undefined);
            $window.location.href = "/login";
        }
    //$http.get(apiurl.get() + "employees/" + $scope.userid + '/notifications').success(function(response) { console.log(response.data); })
  })
