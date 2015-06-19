angular.module('controllers.layoutController', [])

  .controller('layoutController', function($rootScope, $scope, $http, apiurl, $window, authorizationFactory){

    this.initialize = function() {
      $scope.loadAlerts();
      console.log("initialize");
    }

    $scope.loadAlerts = function () {
      var user = JSON.parse(localStorage.getItem(("user")));
      var notificationUrl = apiurl.get() + "employees/" + user.userId + '/notifications';  

      $http.get(notificationUrl).success(function(response) { 
        var alerts = response.data; 

        for(var i = 0; i < alerts.length; i++){
          var obj = alerts[i];
          var chatUrl = apiurl.get() + "employees/" + user.userId + "/chats/" + obj.ChatId + "/messages";

          $http.get(chatUrl).success(function(response) { 
            console.log(response);
            obj.senderName = response.data.customer.name;
            $scope.alerts = alerts;
          })
        }
      })
    };

    $scope.closeNotification = function(alert, alerts) {
      var url = 'http://178.62.252.32:8080/employees/' + alert.EmployeeID + '/notifications/' + alert._id;

      $http.get(url).success(function(response) { 
        console.log(response.data); 
        alerts.removeValue('_id', alert._id);
      })

      console.log(alert);
    }

    $scope.goToChatFromAlert = function(alert){
      $window.location.href = "/chat/" + alert.ChatId;
      $scope.closeNotification(alert.ChatId);
    }

    $scope.logout = function(){
      $rootScope.loggingOut = true;
      authorizationFactory.logout();
      $rootScope.loggingOut = false;
    };

    Array.prototype.removeValue = function(name, value){
      var array = $.map(this, function(v,i){
        return v[name] === value ? null : v;
      });
      this.length = 0; //clear original array
      this.push.apply(this, array); //push all elements except the one we want to delete
    }
  })
