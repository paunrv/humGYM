var app = angular.module('humi', []);

	var mock = [{
		prioridad: 1600,
		horario: "4:00 - 5:00",
		lunes: {
			clase: "Primaria",
			imagen: "img/primaria.png"
		},
		martes: {
			clase: "Kids",
			imagen: "img/kids.png"
		},
		miercoles: {
			clase: "Primaria",
			imagen: "img/primaria.png"
		},
		jueves: {
			clase: "Kids",
			imagen: "img/kids.png"
		},
		viernes: {
			clase: "Primaria",
			imagen: "img/primaria.png"
		}
	}, {
		prioridad: 1700,
		horario: "5:00 - 6:00",
		martes: {
			clase: "Avanzados",
			imagen: "img/avanzados.png"
		},
		miercoles: {
			clase: "Avanzados",
			imagen: "img/avanzados.png"
		},
		jueves: {
			clase: "Avanzados",
			imagen: "img/avanzados.png"
		}
	}];

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

	app.controller('HorariosController', ['$scope', '$http', function($scope, $http) {
		$scope.horario = mock;

		var obtenerHorario = function() {
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