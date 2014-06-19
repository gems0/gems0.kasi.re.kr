var tableListApp = angular.module('tableListApp', ['ngRoute']);


tableListApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


tableListApp.config(function($routeProvider) {
    $routeProvider.
	when('/', {controller:tableListCtrl, templateUrl:'template/table_list.html'}).
	// when('/:uwife_id', {controller:tableListCtrl, templateUrl:'/static/html/table/table_list.html'}).
	when('/:uwife_id', {controller:tableOneCtrl, templateUrl:'template/table_one.html'}).
        otherwise({redirectTo:'/'});
});


tableListApp.factory('tableListFactory', function($http) {
    var obj = {header:null,
	       data:null,
	      };

    obj.json_root="uwife_info_20120620_20130915_v9_filtered_wsa.json";
    obj.json_ext=".html";

    $http.get(obj.json_root+"/uwife_summary.json"+obj.json_ext).success(
	function(data) {
	    obj.header=data.header;
	    obj.data=data.data;
	}
    );

    return obj;
});

function tableRootCtrl($scope, $http) {
    $scope.do_query = function() {
	$http.jsonp("http://gems0-uwife.appspot.com/query/jsonp?callback=JSON_CALLBACK&coord=gal&lon=" + $scope.lon + "&lat=" + $scope.lat + "&width=" + $scope.size).success(
	    function(data) {
		$scope.filtered_list = data;
	    }
	);
    };

    $scope.clear_query = function() {
	$scope.lon = "";
	$scope.lat = "";
	$scope.size = "";
	$scope.filtered_list = undefined;
    };

    $scope.filter_msbid = function(a) {
	if ($scope.filtered_list) {
	    var msbid_list = _.map($scope.filtered_list.value, 
				   function(row){ return row.msbid; });
	    $scope.msbid_list = msbid_list;
	    var filtered_list = $.grep(a, function(v) {
		return $.inArray(v[0], msbid_list) > -1;
	    });
	    return filtered_list;
	} else {
	    return a;
	}
    }
}

// tableListApp.filter('filtermsbid', function() {
//   return function(input, msbid) {
//     return input ? '\u2713' : '\u2718';
//   };
// });

// var found_names = $.grep(names, function(v) {
//     return v.name === "Joe" && v.age < 30;
// });

function tableListCtrl($scope, $location, tableListFactory) {
    $scope.table_summary =  tableListFactory;
    // $scope.uwife_id = $routeParams.uwife_id;

    $scope.go = function(uwife_id) {
        $location.path( uwife_id.toString()  )
    };

}

function tableOneCtrl($scope, $http, $routeParams, $location, tableListFactory) {
    // $scope.table_summary =  tableListFactory;
    $scope.uwife_id = $routeParams.uwife_id;

    $scope.uwife_id_str = _("uwife%03d").sprintf(Number($scope.uwife_id));

    // $scope.jpg_names = ["H2_coadd", "FeII_coadd", "J_coadd"];
    $scope.jpg_names = ["coadd_H2_FeII_J", "H2_coadd", "FeII_coadd", "J_coadd"];
    $scope.filter_names = ["FeII", "H2", "J", "H", "K"];

    $http.get(tableListFactory.json_root + "/uwife" + $scope.uwife_id + "_info.json" + tableListFactory.json_ext).success(
	function(data) {
	    $scope.uwife_info = data;
	}
    );

}
