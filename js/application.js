var application = angular.module('application',[
	'ngRoute',
	'ngResource',
	'translate'
]);

application.run(['$rootScope', '$location', '$templateCache', '$route','$sce','$translate',
	function( $rootScope, $location, $templateCache, $route, $sce, $translate ){
		$rootScope.LoadView = function ( path ){
			if( $location.path() == "/" + path ){
				$rootScope.ReloadView();
			}
			else{
				$location.path( path );
			}
		};

		$rootScope.ReloadView = function(){
			$route.reload();
		};

		$rootScope.GetCurrentRoute = function(){
			return $location.path();
		};

		$translate.config({
			default :'en_US',
			languages :[
				'nl_NL',
				'fr_FR',
				'de_DE'
			]
		});
	}
]);