angular.module('factories.chatFactory', [])


    .factory('Chats',[ '$http', 'apiurl', function ($http, apiurl) {
      return {
        all: function (callback, id) {
            $http.get(apiurl.get() + "employees/"+id+"/allchats").success(callback);
        },
        get: function (callback, id) {
            $http.get(apiurl.get() + "employees/"+id+"/chats").success(callback);
        },
        messages: function (callback, id, cid) {
            $http.get(apiurl.get() + "employees/"+id+"/chats/" + cid + "/messages").success(callback);
        },
        solve: function (callback, id, cid) {
            $http.post(apiurl.get() + "employees/"+id+"/chats/" + cid + "/solve").success(callback);
        }

      };

    }]);
