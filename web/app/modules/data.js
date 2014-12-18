define([
    'marionette'
], function(
    Marionette
) {
    'use strict';

    var SeasonModel = Backbone.Model.extend({
        url: function() {
            return 'http://www.football-data.org/soccerseasons/' + this.id + '/ranking';
        },
        defaults: {
            matchday: 1
        }
    });

    var SeasonCollection = Backbone.Collection.extend({
        model: SeasonModel,
        url: 'http://www.football-data.org/soccerseasons'
    });

    var Module = Marionette.Module.extend({
        initialize: function(moduleName, app, options) {
            this.seasons = new SeasonCollection();
        },
        onStart: function() {
            Backbone.ajax = function(request) {
                request.headers = {
                    'Auth-Token': '61be99dccfbd4f28836025edc912111d'
                };
                return Backbone.$.ajax.apply(Backbone.$, [request]);
            };
            this.seasons.fetch();
        }
    });

    return Module;
});
