'use strict';
var app = angular.module('humi', ['ngStorage']);

app.controller('ContenidoController', ['$scope', '$http','$sessionStorage', function($scope, $http, $sessionStorage) {
	$scope.user = $sessionStorage.user || false;

	$scope.template = 'principal.html';
	$scope.username = '';
	$scope.password = '';

	$scope.login = function() {
		$http.
		post('/api/Users/login', {
			username: $scope.username,
			password: $scope.password,
		}).
		success(function(data) {
			$scope.user = {
				accessToken: data.id,
				username: $scope.username
			};
			$scope.passwordError = false;

			$sessionStorage.user = $scope.user;
			$sessionStorage.$save();

		}).
		error(function() {
			$scope.passwordError = true;
		});
	};

	$scope.logout = function(){
		$sessionStorage.user = null;
		$sessionStorage.$save();
		$scope.username = '';
		$scope.password = '';
		$scope.user = false;
	};

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
	var clases = [];
	$scope.valido = false;
	$http.
	get('/api/Clases').
	success(function(data) {
		$scope.horario = data;
	}).
	error(function() {});

	$http.
	get('/api/InformacionClases').
	success(function(data) {
		clases = data;
	}).
	error(function() {});

	$scope.seleccionarClase = function(nombre) {

		$scope.imagen = 'img/error.png';
		return function() {
			$scope.valido = false;
			for (var clase in clases) {
				if (clases[clase].nombre === nombre) {
					$scope.seleccionado = clases[clase];
					$scope.imagen = clases[clase].imagen;
					$scope.valido = true;
				}
			}
		};
	};


}]);