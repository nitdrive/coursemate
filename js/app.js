// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('schoolmate', ['ionic','schoolmate.controllers','schoolmate.services','ngStorage','schoolmate.admincontrollers','schoolmate.adminservices'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}) 
.config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

           .state('user_app_home', {
                url: '/user',
                templateUrl: 'templates/user_app_home.html',
                controller: 'UserAppHomeCtrl'
            })

            .state('user_app_login', {
                url: '/user/login/:logindetails',
                templateUrl: 'templates/user_app_login.html',
                controller: 'UserAppLoginCtrl'
            })

            .state('user_app_register_p1', {
                url: '/user/register/p1',
                templateUrl: 'templates/user_app_register_p1.html',
                controller: 'UserAppRegisterCtrl'
            })

	    .state('user_app_register_p2', {
                url: '/user/register/p2',
                templateUrl: 'templates/user_app_register_p2.html',
                controller: 'UserAppRegisterCtrl'
            })

	    .state('user_app_register_p3', {
                url: '/user/register/p3',
                templateUrl: 'templates/user_app_register_p3.html',
                controller: 'UserAppRegisterCtrl'
            })
	   
           .state('user_app_register_p4', {
                url: '/user/register/p4',
                templateUrl: 'templates/user_app_register_p4.html',
                controller: 'UserAppRegisterCtrl'
            })
           
           .state('user_app_register_p5', {
                url: '/user/register/p5',
                templateUrl: 'templates/user_app_register_p5.html',
                controller: 'UserAppRegisterCtrl'
            })

       	   .state('user_app_register_p6', {
                url: '/user/register/p6',
                templateUrl: 'templates/user_app_register_p6.html',
                controller: 'UserAppRegisterCtrl'
            })
	     
           .state('user_app_user_home', {
                url: '/user/userhome/:currentuser',
                templateUrl: 'templates/user_app_user_home.html',
                controller: 'UserAppUserHomeCtrl'
            })

	   .state('user_app_register_success', {
                url: '/user/register/success',
                templateUrl: 'templates/user_app_register_success.html',
                controller: 'UserAppUserHomeCtrl'
            })

        // Admin routes start here

           .state('admin_app_login', {
                url: '/admin/login',
                templateUrl: 'templates/admin_app_login.html',
                controller: 'AdminAppLoginCtrl'
            })

           /*.state('admin_app_dashboard', {
                url: '/admin/dashboard/:admin',
                templateUrl: 'templates/admin_app_dashboard.html',
                controller: 'AdminAppListCtrl'
            })

           .state('admin_app_search', {
                url: '/admin/search',
                templateUrl: 'templates/admin_app_search.html',
                controller: 'AdminAppListCtrl'
            })*/

     // Test roures start here ........................................

  // setup an abstract state for the tabs directive
	    .state('tab', {
	    url: "/tab",
	    abstract: true,
	    templateUrl: "templates/tabs.html"
	  })

           /*.state('tab.menu', {
	    url: "/search",
	    abstract: true,
	    templateUrl: "templates/tabs.html"
	  })*/
    
           
  // Each tab has its own nav history stack:

          .state('tab.admin_app_dashboard', {

		        url: '/dashboard/:admin',
			views: {
		        'tab-dash': {
		        templateUrl: 'templates/admin_app_dashboard.html',
		        controller: 'AdminAppListCtrl'
		}
	      }
            })

           .state('tab.admin_app_search', {

		        url: '/search',
			views: {
			'tab-search': {
		        templateUrl: 'templates/admin_app_search.html',
		        controller: 'AdminAppSearchCtrl'
		}
	      }
            })

          .state('tab.admin_app_settings', {

		        url: '/settings',
			views: {
			'tab-settings': {
		        templateUrl: 'templates/admin_app_settings.html',
		        controller: 'AdminAppListCtrl'
		}
	      }
            });
	  


          
	    
	  





        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/user');

    });
