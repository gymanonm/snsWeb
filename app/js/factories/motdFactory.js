angular.module('factories.motdFactory', [])

    .factory('Motd',[ '$http', 'apiurl', function ($http, apiurl) {
      return {
        get: function (callback) {
            $http.get(apiurl.get()).success(callback);
        }

      };

    }]);
