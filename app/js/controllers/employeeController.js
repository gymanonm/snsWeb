angular.module('controllers.employeeController', [])

    .controller('employeeController', function($scope, $http, apiurl, Employees){
        var employeeCrud = "";
        console.log("User: " + localStorage.getItem("user").username + "  Token: " + localStorage.getItem("user").token);
        Employees.all(function(response) { $scope.employees = response.data });
        Employees.get(function(response) { $scope.employee = response.data },employeeCrud);

        $scope.loadEmployee = function(id) {
          employeeCrud = id;
          Employees.all(function(response) { $scope.employees = response.data });
          Employees.get(function(response) { $scope.employee = response.data },employeeCrud);
        };

        $scope.newEmployee = function() {
          employeeCrud = "";
          $scope.loadEmployee(employeeCrud);
        };

        $scope.setCrudEmployee = function(id) {
          $scope.loadEmployee(id);
        };

        $scope.deleteEmployee = function(employee) {
            $scope.employees.splice($scope.employees.indexOf(employee), 1);
            Employees.delete(employee._id);
        };

        $scope.submitEmployee = function() {
          var data = {username : $scope.employee.username, password: $scope.employee.password}
          var employeeid = $scope.employee._id
          if(typeof employeeid === "undefined")
            //console.log("new op " +employeeid+ " met naam "+$scope.employee.name);
            Employees.post(function(data, status, headers, config) {
            $scope.loadEmployee(employeeCrud);
          },data);
          else
            //console.log("edit op " +employeeid+ " met naam "+$scope.employee.name);
            Employees.put(function(data, status, headers, config) {
            $scope.loadEmployee("");
          }, employeeCrud, data);
        };

        $scope.isNew = function() {
          if(typeof $scope.employee != "undefined"){
              if(typeof $scope.employee.username === "undefined")
                return "New"
              else
                return "Edit"
            }
        }
      });
