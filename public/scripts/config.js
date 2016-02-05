function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");

  jQuery.ajaxSetup({cache: true});

  $stateProvider
  .state('signin', {
      url: "/signin",
      templateUrl: "/views/signin.html",
      data: {
       pageTitle: 'Sign In'
      },
      controller: "SignInCtrl"
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
  .run(function($rootScope, $state, $injector) {
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

    $rootScope.checkAuthentication = function() {
        if(!$rootScope.user) {
            var api = $injector.get('api');
            var token = $rootScope.getToken();
            if(!token) {
                $state.go("login");
            }

            api.authenticate.save({token: token}, function(user) {
                $rootScope.user = user;
            }, function(err) {
                $state.go("login");
            });
        }
    };

    $rootScope.checkAuthentication();

    $rootScope.isAdmin = function(id, name) {
      if(id && $rootScope.user.id == id) {
        return true;
      }
      if(name && $rootScope.user.name == name) {
        return  true;
      }

      return false;
    };

    $rootScope.apply = function(scope) {
      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
          scope.$apply();
      }
    };
  });