var ang_app = angular.module('myApp', []);

ang_app.controller('myCtrl', function($scope, $http) {
    $http.get("/tgtest/get")
    .then(function(response) {
        $scope.tgtest = response.data;
    });
    $http.get("/tgtest/get_scan_result")
    .then(function(response) {
        $scope.scan_data = response.data;
    });
    $scope.runScan = function () {
      $http.get("/tgtest/scan/")
      .then(function(response) {
        $scope.scan_status = 'started';
      })
    }
});
