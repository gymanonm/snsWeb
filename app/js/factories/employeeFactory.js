angular.module('factories.employeeFactory', [])

    .factory('Employees',[ '$http', 'apiurl', function ($http, apiurl) {
        var localhost = "http://localhost:8080/"
      return {
        all: function (callback) {
            $http.get(localhost + "employees/").success(callback);
        },
        get: function (callback, id) {
            $http.get(apiurl.get() + "employees/"+id).success(callback);
        },
        post: function (callback, data) {
            $http.post(apiurl.get() + "employees/", data).success(callback);
        },
        put: function (callback, id, data) {
            $http.put(apiurl.get() + "employees/"+id, data).success(callback);
        }

      };

    }]);
