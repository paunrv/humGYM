var app = angular.module('humi', []);

app.controller('ComentariosController', ['$scope', '$http', function($scope, $http) {
	$scope.nombre = "";
	$scope.mensaje = "";
	$scope.email = "";
	$scope.successful = false;

	$scope.sendComment = function() {
		$scope.successful = false;
		$http.
		post('/sendMail', {
			"email": $scope.email,
			"name": $scope.nombre,
			"message": $scope.mensaje,
		}).
		success(function() {
			$scope.successful = true;
			$scope.nombre = "";
			$scope.mensaje = "";
			$scope.email = "";
		}).
		error(function() {
			$scope.successful = false;
		});
	}
}]);