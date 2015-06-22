angular.module('controllers.faqController', [])

    .controller('faqController', function($scope, $http, apiurl){
        var faqCrud = "";

        $http.get(apiurl.get() + "faq/").success(function(response) { $scope.faqs = response.data });
        $http.get(apiurl.get() + "faq/"+faqCrud).success(function(response) { $scope.faq = response.data });
        $http.get(apiurl.get() + "categories/").success(function(response) { $scope.categories = response.data });

        $scope.loadFaq = function(id) {
          faqCrud = id;
          $http.get(apiurl.get() + "faq/").success(function(response) { $scope.faqs = response.data });
          $http.get(apiurl.get() + "faq/"+faqCrud).success(function(response) { $scope.faq = response.data });
          $http.get(apiurl.get() + "categories/").success(function(response) { $scope.categories = response.data });
        };

        $scope.newFaq = function() {
          faqCrud = "";
          $scope.loadFaq(faqCrud);
        };

        $scope.setCrudFaq = function(id) {
          $scope.loadFaq(id);
        };

        $scope.deleteFaq = function(id) {
            $http.delete(apiurl.get() + "faq/" + id).success(function(data, status, headers, config) {
            $scope.loadFaq(faqCrud);
          });
        };

        $scope.submitFaq = function() {
          var data = {question : $scope.faq.question, answer : $scope.faq.answer, category_id : $scope.faq.category[0]}
          var faqid = $scope.faq._id
          if(typeof faqid === "undefined")
            //console.log("new op " +employeeid+ " met naam "+$scope.employee.name);
            $http.post(apiurl.get() + "faq/", data).success(function(data, status, headers, config) {
            $scope.loadFaq(faqCrud);
          });
          else
            //console.log("edit op " +employeeid+ " met naam "+$scope.employee.name);
            $http.put(apiurl.get() + "faq/"+faqid, data).success(function(data, status, headers, config) {
            $scope.loadFaq("");
          });
        };

        $scope.isNew = function() {
          if(typeof $scope.faq != "undefined"){
              if(typeof $scope.faq._id === "undefined")
                return "New"
              else
                return "Edit"
            }
        }
      });
