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
  .run(function($rootScope, $state, $urlRouter) {
    if(!$rootScope.user) {
      $state.go("login");
    }

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