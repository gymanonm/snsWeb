angular.module('controllers.chatController', [])

    .controller('chatController', function($scope, $http, apiurl, Chats, socket){
        var employeeid = "";
        var chatid = "";

        socket.on('message', function (data) {
          console.log(data);
          console.log($scope.chatid);
          $scope.loadData($scope.chatid);
        });

        this.initialize = function() {
          var user = JSON.parse(localStorage.getItem("user"));
          employeeid = user.userId;
          $scope.employeeID = employeeid;
          $scope.loademployee(employeeid);
        }

        $scope.click = function(id) {
            console.log("load chat: " + id);
            $scope.chatid = id;
            $scope.loadData(id);
        }

        $scope.changeemployee = function(id) {
          console.log("change employee " + id);
          $scope.loademployee(id);
        }

        $scope.loadData = function (id) {

          $http.get(apiurl.get() + "employees/"+employeeid).success(function(response) { $scope.employee = response.data })
          Chats.get(function(response) { $scope.chats = response.data },employeeid)
          Chats.all(function(response) { $scope.allchats = response.data },employeeid)
          Chats.messages(function(response) { $scope.chat = response.data },employeeid,id)

//            $http.get(apiurl.get() + "employees/" + $scope.employeeID + "/chats/" + id + "/messages").success(function(response) {
//            var response = response.data;
//
//            var customer = response.customer;
//            var employees = response.employees;
//
//            for (var index = 0; index < response.messages.length; ++index) {
//              var item = response.messages[index];
//
//              if(item.employee == false){
//                item.userId = customer.name;
//              } else {
//                for (var empc = 0; empc < employees.length; ++empc) {
//                  var emp = employees[empc];
//
//                  if(emp._id == item.userId){
//                    item.userId = emp.name;
//                  } else if(item.userId == 000000000000000000000000){
//                    item.userId = "SNS Bank Systeem";
//                  }
//                }
//              }
//            }
//
//            $scope.chat = response;
//          });
        };

        $scope.loademployee = function (id) {
          console.log("loademployee " + id);
          $http.get(apiurl.get() + "employees/"+id).success(function(response) { $scope.employee = response.data })
          Chats.get(function(response) { $scope.chats = response.data },id)
          Chats.all(function(response) { $scope.allchats = response.data },id)
          Chats.messages(function(response) { $scope.chat = response.data },id)
        };

        $scope.empclass = function(emp) {
          if(emp==true)
            return "right"
          else
            return "left"
        }

        $scope.pullempclass = function(emp) {
            if(emp==true)
                return "pull-right"
            else
                return "pull-left"
        }

        $scope.handleDrop = function(item){
          console.log(item);
          $http.put(apiurl.get() + "employees/"+ $scope.employeeID + "/chats/"+item).success(function(response) {
            $scope.loademployee($scope.employeeID);
          });

          console.log(apiurl.get() + "employees/"+ $scope.employeeID + "/chats/"+item)
        }

        $scope.submitMessage = function(id) {
          var data = { message: $scope.textmessage}
          $http.post(apiurl.get() + "employees/" + $scope.employeeID + "/chats/" + id + "/messages", data).success(function(data, status, headers, config) {
            $scope.loadData(id);
              });
            $scope.textmessage = null;
        }
      });
