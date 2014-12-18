define([
    'marionette',
    'modules/routing',
    'modules/data',
    'modules/templating',
    'views/seasons'
], function(
    Marionette,
    RoutingModule,
    DataModule,
    TemplatingModule,
    SeasonsView
) {
    'use strict';

    var app = new Marionette.Application({
        regions: {
            main: '#main',
            seasons: '#seasons'
        },
        onBeforeStart: function() {
            this.module('Routing', RoutingModule);
            this.module('Data', DataModule);
            this.module('Templating', TemplatingModule);
        },
        onStart: function() {
            this.seasons.show(new SeasonsView());
            Backbone.history.start();
        }
    });

    return app;
});
