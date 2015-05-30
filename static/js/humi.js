var app = angular.module('humi', []);

app.controller('ComentariosController', ['$scope', '$http', function($scope, $http) {
			$scope.nombre = "";
			$scope.mensaje = "";
			$scope.email = "";
			$scope.tag = "";
			$scope.successful = false;
			$scope.sendComment = function() {
				$scope.successful = false;
				$http.
				post('/someUrl', {
					"emai": $scope.nombre,
					"name": $scope.mensaje,
					"message": $scope.email,
					"tag": $scope.tag
				}).
				success(function(status) {
					if(status == 200){
						$scope.successful = true;
						$scope.nombre = "";
						$scope.mensaje = "";
						$scope.email = "";
						$scope.tag = "";
					}else{
						$scope.successful = false;
					}
				}).
				error(function(status) {
					$scope.successful = false;
				});
			}
		});