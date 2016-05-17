angular
    .module('MyBlog', [
        'ui.router',
        'angular-storage',
        'angular-jwt',
        'ngResource',
        'MyBlog.signinup',
        'MyBlog.posts',
        'ngMaterial'
    ])
    .config(function (
        $stateProvider,
        $urlRouterProvider,
        jwtInterceptorProvider,
        $httpProvider,
        $mdThemingProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                authenticate: true
            });
        $urlRouterProvider.otherwise('/signinup');
        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('jwt');
        }
        $httpProvider.interceptors.push('jwtInterceptor');

        $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('blue');

    })
    .run(function (
        $rootScope,
        $state,
        AuthService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !AuthService.isAuthenticated()){
                $state.transitionTo("signinup");
                event.preventDefault(); 
            }
        });
    })
    .controller('HomeController', function ($resource, $scope, $state) {
        $state.go('posts');
    });