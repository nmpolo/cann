define([
    'marionette'
], function(
    Marionette
) {
    'use strict';

    Marionette.Renderer.render = function(template, data, view) {
        return _.template(template, data);
    };

    Backbone.ajax = function(request) {
        request.headers = {
            'X-Auth-Token': '61be99dccfbd4f28836025edc912111d'
        };
        return Backbone.$.ajax.apply(Backbone.$, [request]);
    };

    var App = Marionette.Application.extend({
        onStart: function() {
            Backbone.history.start();
        }
    });

    var app = new App();
    return app;
});
