angular.module('controllers.chatController', [])

    .controller('chatController', function($scope, $http, apiurl, Chats, socket, Employees){
        var employeeid = "";
        var chatid = "";
        var categoryid = "";

        socket.on('message', function (data) {
          console.log(data);
          console.log($scope.chatid);
          $scope.loadData($scope.chatid);
        });

        this.initialize = function() {
          var user = JSON.parse(localStorage.getItem("user"));
          employeeid = user.userId;
          $scope.employeeID = employeeid;
          $scope.loadData(chatid);
        }

        $scope.click = function(id) {
            console.log("load chat: " + id);
            $scope.chatid = id;
            $scope.loadData(id);
        }


        $scope.loadData = function (id) {
          console.log("loadData " + id);
          Employees.all(function(response) { $scope.employees = response.data });
          Employees.get(function(response) { $scope.employee = response.data },employeeid);
          //categoryid = $scope.employee.category[0];
          //$scope.categoryID = categoryid;
            console.log("set catid "  );
          Chats.get(function(response) { $scope.chats = response.data },employeeid)
          Chats.all(function(response) { $scope.allchats = response.data },employeeid)
          Chats.messages(function(response) { $scope.chat = response.data },employeeid, id)
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

        $scope.handleDrop = function(item, bin){
          console.log(item + " " + bin);
          $http.put(apiurl.get() + "employees/"+ bin + "/chats/"+item).success(function(response) {
            $scope.loadData(chatid);
          });

          console.log(apiurl.get() + "employees/"+ $scope.employeeID + "/chats/"+item)
        }

        $scope.submitMessage = function(id) {
          var data = { message: $scope.textmessage}
          $http.post(apiurl.get() + "employees/" + employeeid + "/chats/" + id + "/messages", data).success(function(data, status, headers, config) {
            $scope.loadData(id);
              });
            $scope.textmessage = null;
        }

        $scope.solveChat = function(id) {
            Chats.solve(function(response) { console.log("solvechat") },employeeid, id)
        }
      });
