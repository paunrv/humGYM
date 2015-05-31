'use strict';
var app = angular.module('humi', []);
	app.controller('ContenidoController', ['$scope', '$http', function($scope, $http) {
		$scope.template = "principal.html"
	}]);


	app.controller('ComentariosController', ['$scope', '$http', function($scope, $http) {
		$scope.nombre = '';
		$scope.mensaje = '';
		$scope.email = '';
		$scope.successful = false;

		$scope.sendComment = function() {
			$scope.successful = false;
			$http.
			post('/sendMail', {
				email: $scope.email,
				name: $scope.nombre,
				message: $scope.mensaje,
			}).
			success(function() {
				$scope.successful = true;
				$scope.nombre = '';
				$scope.mensaje = '';
				$scope.email = '';
			}).
			error(function() {
				$scope.successful = false;
			});
		};
	}]);

	app.controller('HorariosController', ['$scope', '$http', function($scope, $http) { 
			$http.
			get('/api/Clases').
			success(function(data) {
				$scope.horario = data;
			}).
			error(function() {

			});
		
	}]);