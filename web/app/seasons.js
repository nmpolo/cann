define([
    'backbone',
    'app'       // To ensure auth header is set before fetching
], function(
    Backbone
) {
    'use strict';

    var SeasonCollection = Backbone.Collection.extend({
        url: 'http://api.football-data.org/alpha/soccerseasons/'
    });

    var seasons = new SeasonCollection();
    seasons.promise = seasons.fetch();
    return seasons;
});
