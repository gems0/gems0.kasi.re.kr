var StampsApp = angular.module('StampsApp', []);


// StampsApp.config(function($interpolateProvider) {
//   $interpolateProvider.startSymbol('{[{');
//   $interpolateProvider.endSymbol('}]}');
// });

StampsApp.factory('StampsAppFactory', function($http, $q) {
    var obj = {};

    init();

    return obj;
});


function StampsCtrl($scope, $http, StampsAppFactory) {
    $scope.current_stamp = "";

    $scope.wcs_pan_zoom_to = function(stamp) {
	$scope.current_stamp = stamp;
	wcs_pan_zoom_to(stamp.lon, stamp.lat, stamp.diameter_arcmin);
	return false;
    }

    $scope.tag_click = function(btnname) {
	$scope.query = btnname;
    }

    $scope.clear_query = function() {
	$scope.query = "";
    }

    fetch = function(url) {
        $http.jsonp(url).success(function (data) {
                $scope.stamps = data;
        }).error(function (data, status) {
            //this always gets called
            console.log(status);
            $scope.stamps = [];
        });
    }


    var url = "http://gems0-uwife.appspot.com/stamps/jsonp?callback=JSON_CALLBACK";
    // var url = "http://localhost:8080/stamps/jsonp?callback=JSON_CALLBACK";

    fetch(url);

}

