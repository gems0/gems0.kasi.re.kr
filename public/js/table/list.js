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

    obj.json_root="uwife_info_20120620_20130915_v9_filtered.json";
    obj.json_ext=".html";

    $http.get(obj.json_root+"/uwife_summary.json"+obj.json_ext).success(
	function(data) {
	    obj.header=data.header;
	    obj.data=data.data;
	}
    );

    return obj;
});

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
