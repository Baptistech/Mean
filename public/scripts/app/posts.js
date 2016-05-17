angular.module('MyBlog.posts', [
    'ui.router',
    'ngResource',
    'ngMaterial'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('post', {
                url: '/post/:id',
                controller: 'PostController',
                templateUrl: 'views/post.html',
                authenticate: true
            })
            .state('posts', {
                url: '/post?page=1',
                controller: 'PostsController',
                templateUrl: 'views/posts.html',
                authenticate: true
            })
    })
    .controller('PostsController', function ($scope, $resource, $stateParams) {
        $scope.posts = [];
        $scope.nextPage = parseInt($stateParams.page) + 1;
        $resource('/api/post?page=' + $stateParams.page, null, {
            get: {
                method: "GET",
                isArray: true
            }
        })
        .get().$promise.then(function(posts) {
            $scope.posts = posts;
        });
    })
    .controller('PostController', function ($scope, $resource, $stateParams) {
        $scope.post = {};
        $resource('/api/post/:id')
        .get({id: $stateParams.id}).$promise.then(function(post) {
            console.log(post);
            $scope.post = post;
        });
    });
