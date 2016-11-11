angular.module('listGithub', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/'});

/* CONFIGURAÇÕES GERAIS */ 
}).factory('Settings', function(){	
	return CONFIG = {
		id 		: "3a1ee47e6207b96ef198",
		url 	: "https://api.github.com/",
		usuario : "luizangelomedeiros"
	}
});