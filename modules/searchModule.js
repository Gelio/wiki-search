(function() {
    var searchModule = angular.module("SearchModule", []);

    function getProperSectionMargin()
    {
        return (window.innerWidth-$(".info-section").width())/2;
    }

    searchModule.controller("SearchCtrl", ["$scope", "$http", function($scope, $http) {
        $(window).resize(function(){
            $(".info-section").css("margin-left", ($scope.moveInfoToLeft ? 0 : getProperLeftMargin()+"px"));
        });

        $scope.moveInfoToLeft = false;

        $scope.checkSearchBar = function() {
            //console.log($scope.searchBar);
        };

        $scope.setSearchBarFocus = function(focused) {
            if(!focused)
                $scope.moveInfoToLeft = $scope.searchBar != "";
            else
            {
                if($scope.searchBar == "")
                    $scope.moveInfoToLeft = false;
            }
            $(".info-section").css("margin-left", ($scope.moveInfoToLeft ? 0 : getProperSectionMargin()+"px"));
        };
    }]);
})();