angular.module('services.apiurlService', [])

    .service('apiurl', function () {
    var url = 'http://178.62.252.32:8080/';
            return {
                get: function () {
                    return url;
                },
                set: function(value) {
                    url = value;
                }
            };
        })
