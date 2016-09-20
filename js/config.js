application.config(['$routeProvider','$resourceProvider', function( $routeProvider, $resourceProvider ){
	$routeProvider
		.when('/',{
			templateUrl: 'js/views/home.html',
			controller: 'homeController'
		})
		.when('/settings',{
			templateUrl: 'js/views/settings/settings.html',
			controller: 'settingsController'
		});

	$resourceProvider.defaults.actions = {
		create: { method: 'POST' },
		action: { method: 'POST' },
		get: 	{ method: 'GET' },
		getAll: { method: 'GET', isArray: true },
		update: { method: 'PUT' },
		delete: { method: 'DELETE' }
	};
}]);