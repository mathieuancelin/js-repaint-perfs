angular.module('app', []).controller('DBMonCtrl', function ($scope, $timeout) {
  $scope.databases = [];
  var load = function() {
    $scope.databases = ENV.generateData(true).toArray();
    Monitoring.renderRate.ping();
    $timeout(load, ENV.timeout);
  };
  load();
});
