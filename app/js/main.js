angular.module('listGithub', ['ngAnimate', 'ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/'});
});