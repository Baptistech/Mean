angular.module('MyBlog.signinup', [
    'ui.router',
    'angular-storage',
    'ngMaterial'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('signinup', {
                url: '/signinup',
                controller: 'SigninupController',
                templateUrl: 'views/signinup.html',
                authenticate: false
            });
    })
    .service('AuthService', function() {
      var isAuthenticated = false;
      return {
        isAuthenticated: function() {return isAuthenticated;},
        setAuthenticated: function() {isAuthenticated = true;}
      };
    })
    .controller('SigninupController', function ($scope, $http, store, $state, AuthService) {
        $scope.user = {};
        $scope.signup = function() {
            $http({
                url: '/signup',
                method: 'POST',
                data: $scope.user
            })
            .then(function(response){
              console.log('coucou');
                store.set('jwt', response.data);
                $state.go('posts')
            }, function(response){
                console.log(response);
            });
        }
        $scope.signin = function() {
            $http({
                url: '/signin',
                method: 'POST',
                data: $scope.user
            })
            .then(function(response){
                store.set('jwt', response.data);
                AuthService.setAuthenticated();
                $state.go('home')
            }, function(response){
                console.log(response);
            });
        }
    });
