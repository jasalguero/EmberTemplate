var App = Em.Application.create({

});


/*******************************/
/*      MODEL                  */
/*******************************/

App.Property = Em.Object.extend({
    id: null,
    name: null,
    desc: null,
    domains: []
});

App.Domain = Em.Object.extend({
    id: null,
    instances: []
});

App.Instance = Em.Object.extend({
    id: null,
    value: null,
    lastUpdated: null
});


/*******************************/
/*      CONTROLLERS            */
/*******************************/
App.ApplicationController = Em.Controller.extend({

});

App.LoginController = Em.Controller.extend();

App.MainController = Em.Controller.extend();


/**
 * Controller that manages authentication
 * @type {*}
 */
App.AuthController = Em.Controller.extend({
    auth : null,

    init: function(){
        this.set('auth',false);
        this._super();
    },

    authenticate: function(){
        this.set('auth',true);
    },

    logout: function(){
        console.log('logging out...')
        this.set('auth',false);
        App.get('router').transitionTo('unauthenticated.login');
    },

    isAuthenticated: function(){
        return this.get('auth');
    }
});


/*******************************/
/*      VIEWS                  */
/*******************************/
App.ApplicationView = Em.View.extend({
    templateName: 'application'
});

App.LoginView = Em.View.extend({
    templateName: 'login',

    login: function(event){
        App.get('router.authController').authenticate();
        App.get('router').transitionTo('authenticated.main');
    }
});

App.MainView = Em.View.extend({
    templateName: 'main'
});

/*******************************/
/*      UTILS                  */
/*******************************/
App.Router = Em.Router.extend({

    enableLogging: true,

    root: Em.Route.extend({
        // The unknown default state; neither authenticated nor unauthenticated.
        // The router knows to enter this state by default, then the unknown
        // state can decide whether to enter authenticated or unauthenticated mode.
        default: Em.Route.extend({
            route: '/',

            enter: function(router) {
                console.log('entering root with user authenticated -> ' + App.get('router.authController').isAuthenticated())
                if (App.get('router.authController').isAuthenticated()){
                    router.transitionTo('authenticated');
                } else {
                    router.transitionTo('unauthenticated');
                }
            }
        }),

        authenticated: Em.Route.extend({
            initialState: 'main',

            main: Em.Route.extend({
                route: '/main',
                connectOutlets: function(router) {
                    if(!App.get('router.authController').isAuthenticated()){
                        router.transitionTo('unauthenticated');
                    }else{
                        router.get('applicationController').connectOutlet('main');
                    }
                }
            })

        }),

        unauthenticated: Em.Route.extend({
            initialState: 'login',

            login: Em.Route.extend({
                route: '/login',
                connectOutlets: function(router) {
                    if(App.get('router.authController').isAuthenticated()){
                        router.transitionTo('unauthenticated');
                    }else{
                        router.get('applicationController').connectOutlet('login');
                    }

                }
            })
        })
    })

});

/*******************************/
/*      UTILS                  */
/*******************************/


App.initialize();