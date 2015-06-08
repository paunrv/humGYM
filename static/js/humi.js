'use strict';
var app = angular.module('humi', ['ngStorage']);

app.controller('ContenidoController', ['$scope', '$http', '$sessionStorage', function($scope, $http, $sessionStorage) {
	$scope.user = $sessionStorage.user || false;

	$scope.template = 'principal.html';
	$scope.username = '';
	$scope.password = '';

	var carrito = [{
		"producto": {
			"id": "55751278366a24d12a4bf47d",
			"nombre": "Casco",
			"imagen": "img/casco.png",
			"descripcion": "Uso obligatorio para pelear",
			"precio": {
				"tamano": "XS",
				"precio": 59.99
			}
		},
		"cantidad": 2
	}];

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

	$scope.onAgregarCarrito = function() {
         
    };
	$scope.productos = [{
		"id": "55751278366a24d12a4bf47d",
		"nombre": "Casco",
		"imagen": "img/casco.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 59.99
		}, {
			"tamano": "S",
			"precio": 59.99
		}, {
			"tamano": "M",
			"precio": 59.99
		}, {
			"tamano": "L",
			"precio": 59.99
		}, {
			"tamano": "XL",
			"precio": 59.99
		}]
	}, {
		"id": "55751278366a24d12a4bf47d",
		"nombre": "Concha",
		"imagen": "img/concha.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 30.99
		}, {
			"tamano": "S",
			"precio": 30.99
		}, {
			"tamano": "M",
			"precio": 30.99
		}, {
			"tamano": "L",
			"precio": 30.99
		}, {
			"tamano": "XL",
			"precio": 30.99
		}]
	}, {
		"id": "55751278366a24d12a4bf47d",
		"nombre": "Coderas",
		"imagen": "img/coderas.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 29.99
		}, {
			"tamano": "S",
			"precio": 29.99
		}, {
			"tamano": "M",
			"precio": 29.99
		}, {
			"tamano": "L",
			"precio": 29.99
		}, {
			"tamano": "XL",
			"precio": 29.99
		}]
	}, {
		"id": "55751278366a24d12a4bf47d",
		"nombre": "Espinilleras",
		"imagen": "img/espinilleras.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 44.99
		}, {
			"tamano": "S",
			"precio": 44.99
		}, {
			"tamano": "M",
			"precio": 44.99
		}, {
			"tamano": "L",
			"precio": 44.99
		}, {
			"tamano": "XL",
			"precio": 44.99
		}]
	}, {
		"id": "55751278366a24d12a4bf47d",
		"nombre": "Guantes",
		"imagen": "img/guantes.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 39.99
		}, {
			"tamano": "S",
			"precio": 39.99
		}, {
			"tamano": "M",
			"precio": 39.99
		}, {
			"tamano": "L",
			"precio": 39.99
		}, {
			"tamano": "XL",
			"precio": 39.99
		}]
	}, {

		"id": "55751278366a24d12a4bf47d",
		"nombre": "Empeineras",
		"imagen": "img/empeineras.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 55.99
		}, {
			"tamano": "S",
			"precio": 55.99
		}, {
			"tamano": "M",
			"precio": 55.99
		}, {
			"tamano": "L",
			"precio": 55.99
		}, {
			"tamano": "XL",
			"precio": 55.99
		}]
	}, {

		"id": "55751278366a24d12a4bf47d",
		"nombre": "Peto",
		"imagen": "img/peto.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 72.99
		}, {
			"tamano": "S",
			"precio": 72.99
		}, {
			"tamano": "M",
			"precio": 72.99
		}, {
			"tamano": "L",
			"precio": 72.99
		}, {
			"tamano": "XL",
			"precio": 72.99
		}]
	}, {

		"id": "55751278366a24d12a4bf47d",
		"nombre": "Protección Bucal",
		"imagen": "img/pbucal.png",
		"descripcion": "Uso obligatorio para pelear",
		"precio": [{
			"tamano": "XS",
			"precio": 9.99
		}, {
			"tamano": "S",
			"precio": 9.99
		}, {
			"tamano": "M",
			"precio": 9.99
		}, {
			"tamano": "L",
			"precio": 9.99
		}, {
			"tamano": "XL",
			"precio": 9.99
		}]
	}];


}]);