angular.module('controllers.customerController', [])

    .controller('customerController', function($scope, $http, apiurl){
        var customerCrud = "";

        console.log("ok");
        $http.get(apiurl.get() + "customers/").success(function(response) { $scope.customers = response.data });
        $http.get(apiurl.get() + "customers/"+customerCrud).success(function(response) { $scope.customer = response.data });

        $scope.loadCustomer = function(id) {
          customerCrud = id;
          $http.get(apiurl.get() + "customers/").success(function(response) { $scope.customers = response.data });
          $http.get(apiurl.get() + "customers/"+customerCrud).success(function(response) { $scope.customer = response.data });
        };

        $scope.newCustomer = function() {
          customerCrud = "";
          $scope.loadCustomer(customerCrud);
        };

        $scope.setCrudCustomer = function(id) {
          $scope.loadCustomer(id);
        };

        $scope.deleteCustomer = function(id) {
            $http.delete(apiurl.get() + "customers/" + id).success(function(data, status, headers, config) {
            $scope.loadCustomer(customerCrud);
          });
        };

        $scope.submitCustomer = function() {
          var data = {name : $scope.customer.name, registrationId: $scope.customer.registrationId}
          var customerid = $scope.customer._id
          if(typeof customerid === "undefined")
            //console.log("new op " +employeeid+ " met naam "+$scope.employee.name);
            $http.post(apiurl.get() + "customers/", data).success(function(data, status, headers, config) {
            $scope.loadCustomer(customerCrud);
          });
          else
            //console.log("edit op " +employeeid+ " met naam "+$scope.employee.name);
            $http.put(apiurl.get() + "customers/"+customerid, data).success(function(data, status, headers, config) {
            $scope.loadCustomer("");
          });
        };

        $scope.isNew = function() {
          if(typeof $scope.customer != "undefined"){
              if(typeof $scope.customer._id === "undefined")
                return "New"
              else
                return "Edit"
            }
        }
      });
