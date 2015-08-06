(function() {
    var searchModule = angular.module("SearchModule", []);

    searchModule.controller("SearchCtrl", ["$scope", "$http", function($scope, $http) {
        $scope.focus = false;
    }]);
})();