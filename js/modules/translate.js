/**
 * Created by joeykamsteeg on 20/09/2016.
 */

angular.module('translate', ['ngResource'])
    .provider('$translate', ['$injector', function(){
        this.$get = function( $injector ){
            $rootScope = $injector.get('$rootScope');
            $resource = $injector.get("$resource");

            return this;
        };

        this.config = function( newConfig ){
            this.languages = [];
            this.currentLanguage = newConfig.default;

            this.loadLanguage( newConfig.default );

            for( var i = 0; i < newConfig.languages.length; i++){
                var language = newConfig.languages[i];
                this.loadLanguage( language );
            }
        };

        this.loadLanguage = function( code ){
            var url = 'languages/' + code + '.lang.json';
            var language = $resource( url, {}, { query: { method: "GET" } }).query();

            this.languages.push( language );
            $rootScope.$apply();
        };

        this.getWord = function( key ){
            var language = null;

            for( var i = 0; i < this.languages.length; i++){
                if( this.languages[i].locale == this.currentLanguage ){
                    language = this.languages[i];
                }
            }

            if( language !== null ) {
                for( var word in language.words ){
                    if( word == key ){
                        if( !language.hasOwnProperty( word ) ){
                            return language.words[ word ];
                        }
                    }
                }
            }

            return "Missing: " + key;
        };

        this.changeLanguage = function( code ){
            this.currentLanguage = code;
        };

        this.GetLanguages = function(){
            var languages = [];

            for( var i = 0; i < this.languages.length; i++){
                var language = this.languages[i];
                languages.push({
                    name: language.name,
                    locale: language.locale
                });
            }

            return languages;
        };
    }])
    .filter('translate',[ '$rootScope', '$translate', function ( $rootScope, $translate ){
        function filter( input ){
            return $translate.getWord( input );
        };

        filter.$stateful = true;
        return filter;
    }
]);
