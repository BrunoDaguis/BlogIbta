let app = angular.module('blog', ['ngRoute', 'ngSanitize'])
.config(function($routeProvider,$locationProvider){
//$locationProvider.html5Mode(true);
$routeProvider.when('/index',{
    templateUrl:'partials/home.html',
});
$routeProvider.otherwise({redirectTo:'/index'});
});
