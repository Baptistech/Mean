angular.module('ContactsApp')
    .controller('ListController', function ($scope, $rootScope, Contact, $location, options) {
        $rootScope.PAGE = "all";
        $scope.contacts = Contact.query();
        $scope.fields = ['prenom', 'nom'].concat(options.displayed_fields);

        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        $scope.sort.field = 'prenom';
        $scope.sort.order = false;

        $scope.show = function (id) {
            $location.url('/contact/' + id);
        };
    })
    .controller('AddController', function ($scope, $rootScope, Contact, $location) {
        $rootScope.PAGE = "new";
        $scope.contact = new Contact({
            prenom: ['', 'text'],
            nom:  ['', 'text']
        });

        $scope.save = function () {
            if ($scope.newContact.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.contact.$save();
                $location.url('/contacts');
            }
        };
    })
    .controller('SingleController', function ($scope, $rootScope, $location, Contact, $routeParams) {
        $rootScope.PAGE = "single";
        $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) }); 
        $scope.delete = function () {
            $scope.contact.$delete();
            $location.url('/contacts');
        };
    })
    .controller('SettingsController', function ($scope, $rootScope, options, Contact, $q) {
        $rootScope.PAGE = 'settings';
        
        var allFields = [],
            ignore = ['prenom', 'nom', 'id' ];

        $scope.fields = options.displayed_fields;

        deferred = $q.defer(),

        contacts = Contact.query(function () {
            contacts.forEach(function (c) {
                Object.keys(c).forEach(function (k) {
                    if (allFields.indexOf(k) < 0 && ignore.indexOf(k) < 0) allFields.push(k);
                });
            });
            deferred.resolve(allFields);
        });

        deferred.promise.then(function (data) {
            $scope.allFields = data;
        });

        $scope.toggle = function (field) {
            var i = options.displayed_fields.indexOf(field);

            if (i > -1) {
                options.displayed_fields.splice(i, 1);
            } else {
                options.displayed_fields.push(field); 
            }
        };
    });
