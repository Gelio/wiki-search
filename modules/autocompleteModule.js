(function(){
    var autocompleteModule = angular.module("AutocompleteModule", []);

    autocompleteModule.controller("AutocompleteCtrl", ["$scope", "$http", function($scope, $http) {
        $scope.autocompleteList = [];

        $scope.autocompleteFetch = function(currentSearch) {
            $scope.autocompleteList = [];
            $http.jsonp("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + currentSearch + "&callback=JSON_CALLBACK")
                .success(function(data) {

                    for(var i=0; i < data[1].length; ++i)
                        $scope.autocompleteList.push(data[1][i]);

                    //$scope.setSearchBarFocus(false);
                })
                .error(function(data, status) {
                    console.log("error getting autocomplete data from wikipedia", data, statsu);
                });
        }
    }]);
})();