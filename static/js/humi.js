'use strict';
var app = angular.module('humi', ['ngStorage']);

app.controller('ContenidoController', ['$scope', '$http', '$sessionStorage', function($scope, $http, $sessionStorage) {
	$scope.user = $sessionStorage.user || false;

	$scope.template = 'principal.html';
	$scope.username = '';
	$scope.password = '';
	$scope.total = 0;

	$scope.carrito = [{
		"id": "5575c80a24108a0300f5bb59",
		"nombre": "Espinilleras",
		"imagen": "img/espinilleras.png",
		"precio": {
			"tamano": "XS",
			"precio": 44.99
		},
		"cantidad": 3
	}, {
		"id": "5575c81524108a0300f5bb5a",
		"nombre": "Guantes",
		"imagen": "img/guantes.png",
		"precio": {
			"tamano": "M",
			"precio": 39.99
		},
		"cantidad": 2
	}];


	$scope.calcularTotal = function(){
		var total = 0;
		for(var objeto in carrito){
			total += objeto.precio.precio;
		}
		$scope.total = total;

	};
	$scope.onAgregarCarrito = function(id, nombre, imagen, precio, cantidad) {
		carrito.push({
			"id": id,
			"nombre": nombre,
			"imagen": imagen,
			"precio": precio,
			"cantidad": cantidad
		});
		$scope.calcularTotal();
	};
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

	$scope.logout = function() {
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

app.controller('TiendaController', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/Productos').
	success(function(data) {
		$scope.productos = data;
	}).
	error(function() {});
}]);