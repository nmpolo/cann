define([
    'marionette',
    'views/table'
], function(
    Marionette,
    TableView
) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            'season/:season(/:matchday)': 'season',
            '*def': 'default'
        }
    });

    var Controller = Marionette.Controller.extend({
        season: function(season, matchday) {
            var analytics = ga && ga('send', 'pageview', {page: Backbone.history.fragment});
            require('app').seasons.currentView.ui.select.val(season);
            var seasons = require('app').Data.seasons;
            var model = seasons.get(season) || seasons.add({id: season});
            require('app').main.show(new TableView({model: model, matchday: matchday}));
        },
        default: function() {
            Backbone.history.navigate('season/354', {push: false, trigger: true});
        }
    });

    var Module = Marionette.Module.extend({
        initialize: function(moduleName, app, options) {
            this.router = new Router({controller: new Controller()});
        }
    });

    return Module;
});
