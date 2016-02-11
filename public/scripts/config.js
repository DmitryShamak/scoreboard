function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    jQuery.ajaxSetup({cache: true});

    $stateProvider
        .state('signup', {
          url: "/signup",
          templateUrl: "/views/signup.html",
          data: {
           pageTitle: 'Sign Up'
          },
          controller: "SignUpCtrl"
        })
        .state('login', {
          url: "/login",
          templateUrl: "/views/login.html",
          data: {
           pageTitle: 'LogIn'
          },
          controller: "LogInCtrl"
        })
        .state('logout', {
          url: "/logout",
          data: {
           pageTitle: 'Log Out'
          },
          controller: function($rootScope, $state) {
            $rootScope.user = null;
            document.cookie = null;
            $state.go("login");
          }
        })
        .state('landing', {
          url: "/landing",
          templateUrl: "/views/landing.html",
          data: {
           pageTitle: 'Landing'
          },
          controller: "LandingCtrl"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "/views/profile.html",
            data: {
                pageTitle: 'Profile'
            },
            controller: "ProfileCtrl"
        })
        .state('sources', {
            url: "/sources",
            templateUrl: "/views/sources.html",
            data: {
                pageTitle: 'Sources'
            },
            controller: "SourcesCtrl"
        })
        .state('news', {
            url: "/news",
            templateUrl: "/views/news.html",
            data: {
                pageTitle: 'News'
            },
            controller: "NewsCtrl"
        })
        .state('join', {
          url: "/join/:id",
          templateUrl: "/views/scoreboard.html",
          data: {
           pageTitle: 'Scoreboard'
          },
          controller: "ScoreboardCtrl"
        });
};

angular
  .module('app')
  .config(config)
  .run(function($rootScope, $state, $injector, $location) {
    $rootScope.getToken = function() {
        var cookie = document.cookie.split(";");
        var token;
        _.forEach(cookie, function(item) {
            if(item.charAt(0) == ' ') {
                token = item.substring(1);
            }
        });

        return token;
    };

        $rootScope.apply = function(scope) {
            var phase = scope.$root.$$phase;
            if(phase != '$apply' || phase != '$digest') {
                scope.$apply();
            }
        };

    $rootScope.redirectToMainPage = function() {
        $state.go("landing");
    };

    $rootScope.checkAuthentication = function() {
        if(!$rootScope.user) {
            $rootScope.busy = false;
            var api = $injector.get('api');
            var token = $rootScope.getToken();
            if(!token) {
                $state.go("login");
            }
            $rootScope.busy = true;
            api.authenticate.save({token: token}, function(user) {
                $rootScope.user = user;
                var state = $state.current.name;

                if(state === "login") {
                    $rootScope.redirectToMainPage();
                } else {
                    $state.go(state);
                }
                $rootScope.busy = false;
            }, function(err) {
                $state.go("login");
                $rootScope.busy = false;
            });
        }
    };

    $rootScope.checkAuthentication();

    $rootScope.apply = function(scope) {
      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
          scope.$apply();
      }
    };
  });