angular.module('controllers.categoryController', [])

    .controller('categoryController', function($scope, $http, apiurl){
        var categoryCrud = "";

        $http.get(apiurl.get() + "categories/").success(function(response) { $scope.categories = response.data });
        $http.get(apiurl.get() + "categories/"+categoryCrud).success(function(response) { $scope.category = response.data });

        $scope.loadCategory = function(id) {
          categoryCrud = id;
          $http.get(apiurl.get() + "categories/").success(function(response) { $scope.categories = response.data });
          $http.get(apiurl.get() + "categories/"+categoryCrud).success(function(response) { $scope.category = response.data });
        };

        $scope.newCategory = function() {
          categoryCrud = "";
          $scope.loadCategory(categoryCrud);
        };

        $scope.setCrudCategory = function(id) {
          $scope.loadCategory(id);
        };

        $scope.deleteCategory = function(id) {
            $http.delete(apiurl.get() + "categories/" + id).success(function(data, status, headers, config) {
            $scope.loadCategory(categoryCrud);
          });
        };

        $scope.submitCategory = function() {
          var data = {name : $scope.category.name}
          var categoryid = $scope.category._id
          if(typeof categoryid === "undefined")
            //console.log("new op " +employeeid+ " met naam "+$scope.employee.name);
            $http.post(apiurl.get() + "categories/", data).success(function(data, status, headers, config) {
            $scope.loadCategory(categoryCrud);
          });
          else
            //console.log("edit op " +employeeid+ " met naam "+$scope.employee.name);
            $http.put(apiurl.get() + "categories/"+categoryid, data).success(function(data, status, headers, config) {
            $scope.loadCategory("");
          });
        };

        $scope.isNew = function() {
          if(typeof $scope.category != "undefined"){
              if(typeof $scope.category._id === "undefined")
                return "New"
              else
                return "Edit"
            }
        }
      });
