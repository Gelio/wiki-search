(function() {
    var searchModule = angular.module("SearchModule", []);

    function getProperSectionMargin()
    {
        return (window.innerWidth-$(".info-section").width())/2;
    }

    var showItems = false;

    searchModule.controller("SearchCtrl", ["$scope", "$http", "$timeout", function($scope, $http, $timeout) {
        $(window).resize(function(){
            $(".info-section").css("margin-left", ($scope.moveInfoToLeft ? 0 : getProperSectionMargin()+"px"));
        });

        function fetchData()
        {
            $http.jsonp("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + $scope.searchBar + "&callback=JSON_CALLBACK")
                .success(function(data) {
                    //console.log(data);

                    for(var i=0; i < data[1].length; ++i)
                    {
                        var itemDescription = data[2][i];
                        if(itemDescription.length > descriptionLengthLimit)
                        {
                            var itemDescriptionArray = itemDescription.split(" ");
                            itemDescription = "";
                            var currentLenght = 0;

                            for(var j=0; currentLenght < descriptionLengthLimit; ++j)
                            {
                                currentLenght += itemDescriptionArray[j].length+1;
                                itemDescription += itemDescriptionArray[j] + " ";
                            }
                            itemDescription += "[...]";
                        }

                        var newItem = new WikipediaItem(data[1][i], itemDescription, data[3][i]);
                        $scope.itemsList.push(newItem);
                    }

                    $scope.setSearchBarFocus(false);
                    $scope.itemsFetched = true;
                })
                .error(function(data, status) {
                    console.log("error getting data from wikipedia", data, statsu);
                })
        }

        $scope.showItems = showItems;
        $scope.searchBar = "";
        $scope.itemsList = [];
        $scope.itemsFetched = false;

        var searchTimeoutPromise = null;

        $scope.checkSearchBar = function() {
            $scope.itemsList = [];
            $scope.itemsFetched = false;

            if(searchTimeoutPromise !== null)
                $timeout.cancel(searchTimeoutPromise);

            searchTimeoutPromise = $timeout(fetchData, fetchDataDelay);
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