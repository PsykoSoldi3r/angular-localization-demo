application.controller('homeController', ['$scope','$routeParams','$rootScope','$resource','$translate', function( $scope, $routeParams, $rootScope, $resource, $translate){
    $scope.language = "en_US";

    $scope.words = [{
        "default" : "Yes",
        "translated" : "YES"
    },{
        "default" : "No",
        "translated" : "NO"
    },{
        "default" : "Hello",
        "translated" : "HELLO"
    },{
        "default" : "Bye",
        "translated" : "BYE"
    }];

    $scope.ChangeLanguage = function(){
        $translate.changeLanguage( $scope.language );
    }
}]);
