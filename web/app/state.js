define([
    'backbone'
], function(
    Backbone
) {
    'use strict';

    var StateMachine = function() {
        this.router = new Backbone.Router();
        this.states = {};
    };

    _.extend(StateMachine.prototype, {
        state: function(state) {
            this.states[state.name] = state;
            this.router.route(state.route, state.name, this.routeToState.bind(this, state));
        },
        states: function(states) {
            _.each(states, this.state.bind(this));
        },
        routeToState: function(state) {
            var args = _.values(arguments).slice(1, -1);
            var params = {};
            _.each(state.route.match(/\:[A-Za-z]+/g), function(key, index) {
                key = key.replace(':', '');
                params[key] = args[index];
            });
            this.transition(state.name, params);
        },
        transition: function(name, params, options) {
            var state = this.states[name];
            state.transition(params, options);
        }
    });

    var sm = new StateMachine();
    return sm;
});
