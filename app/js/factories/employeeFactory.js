angular.module('factories.employeeFactory', [])

    .factory('Employees',[ '$http', 'apiurl', function ($http, apiurl) {
        var localhost = "http://localhost:8080/"
      return {
        all: function (callback) {
            $http.get(localhost + "employees/").success(callback);
        },
        get: function (callback, id) {
            $http.get(localhost + "employees/"+id).success(callback);
        },
        post: function (callback, data) {
            $http.post(localhost + "employees/", data).success(callback);
        },
        put: function (callback, id, data) {
            $http.put(localhost + "employees/"+id, data).success(callback);
        },
        delete : function(id){
            console.log(id)
            $http.delete(localhost +"employees/"+ id)
                .success(function(data){
                    console.log("Error " + data.data);
                })
                .error(function(data){
                    console.log("Error " + data.data);
                })

        }

      };

    }]);
