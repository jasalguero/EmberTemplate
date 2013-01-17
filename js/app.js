var App = Ember.Application.create();


/*******************************/
/*      MODEL                  */
/*******************************/


/*******************************/
/*      CONTROLLERS            */
/*******************************/
App.ApplicationController = Ember.Controller.extend();


/*******************************/
/*      VIEWS                  */
/*******************************/
App.ApplicationView = Ember.View.extend({
    templateName: 'application'
});

/*******************************/
/*      UTILS                  */
/*******************************/
App.Router = Ember.Router.extend({
    root: Ember.Route.extend({
        index: Ember.Route.extend({
            route: '/'
        })
    })
})

/*******************************/
/*      UTILS                  */
/*******************************/
App.initialize();