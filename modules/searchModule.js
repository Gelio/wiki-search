(function() {
    var searchModule = angular.module("SearchModule", []);

    function getProperSectionMargin()
    {
        return (window.innerWidth-$(".info-section").width())/2;
    }

    var showItems = false;

    searchModule.controller("SearchCtrl", ["$scope", "$http", function($scope, $http) {
        $(window).resize(function(){
            $(".info-section").css("margin-left", ($scope.moveInfoToLeft ? 0 : getProperSectionMargin()+"px"));
        });

        $scope.showItems = showItems;
        $scope.searchBar = "";

        $scope.checkSearchBar = function() {
            //console.log($scope.searchBar);
        };

        $scope.setSearchBarFocus = function(focused) {
            if(!focused)
                showItems = $scope.searchBar != "";
            else
            {
                if($scope.searchBar == "")
                    showItems = false;
            }
            $(".info-section").css("margin-left", (showItems ? 0 : getProperSectionMargin()+"px"));
            $scope.showItems = showItems;
        };
    }]);
})();