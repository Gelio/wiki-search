(function() {
    var listModule = angular.module("ListModule", []);

    /*listModule.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {

    }]);*/

    listModule.directive("wikipediaItem", function() {
        return {
            restrict: "C",
            templateUrl: "wikipedia-item.html"
        }
    });
})();