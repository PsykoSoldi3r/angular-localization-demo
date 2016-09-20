application.controller('settingsController', ['$scope','$routeParams','$rootScope','$resource','$translate', function( $scope, $routeParams, $rootScope, $resource, $translate){
    $scope.languages = $translate.GetLanguages();

    $scope.ChangeLanguage = function( code ){
        $translate.changeLanguage( code );
    };
}]);
