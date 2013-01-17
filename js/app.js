var CT = Em.Application.create({

});


/*******************************/
/*      MODEL                  */
/*******************************/

CT.Property = Em.Object.extend({
    id: null,
    name: null,
    desc: null,
    domains: []
});

CT.Domain = Em.Object.extend({
    id: null,
    instances: []
});

CT.Instance = Em.Object.extend({
    id: null,
    value: null,
    lastUpdated: null
});


/*******************************/
/*      CONTROLLERS            */
/*******************************/
CT.ApplicationController = Em.Controller.extend({

});

CT.LoginController = Em.Controller.extend();

CT.MainController = Em.Controller.extend();


/**
 * Controller that manages authentication
 * @type {*}
 */
CT.AuthController = Em.Controller.extend({
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
        CT.get('router').transitionTo('unauthenticated.login');
    },

    isAuthenticated: function(){
        return this.get('auth');
    }
});


/*******************************/
/*      VIEWS                  */
/*******************************/
CT.ApplicationView = Em.View.extend({
    templateName: 'application'
});

CT.LoginView = Em.View.extend({
    templateName: 'login',

    login: function(event){
        CT.get('router.authController').authenticate();
        CT.get('router').transitionTo('authenticated.main');
    }
});

CT.MainView = Em.View.extend({
    templateName: 'main'
});

/*******************************/
/*      UTILS                  */
/*******************************/
CT.Router = Em.Router.extend({

    enableLogging: true,

    root: Em.Route.extend({
        // The unknown default state; neither authenticated nor unauthenticated.
        // The router knows to enter this state by default, then the unknown
        // state can decide whether to enter authenticated or unauthenticated mode.
        default: Em.Route.extend({
            route: '/',

            enter: function(router) {
                console.log('entering root with user authenticated -> ' + CT.get('router.authController').isAuthenticated())
                if (CT.get('router.authController').isAuthenticated()){
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
                    if(!CT.get('router.authController').isAuthenticated()){
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
                    if(CT.get('router.authController').isAuthenticated()){
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


CT.initialize();