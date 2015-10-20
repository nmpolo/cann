define([
    'state',
    'views/table',
    'seasons',
    'layout'
], function(
    sm,
    View,
    seasons,
    layout
) {
    'use strict';

    var LeagueTableModel = Backbone.Model.extend({
        url: function() {
            return this.get('url');
        }
    });

    sm.state({
        name: 'league',
        route: 'league/:league(/:matchday)',
        transition: function(params, options) {
            seasons.promise.done(function() {
                layout.seasons.currentView.ui.select.val(params.league);
                var season = seasons.findWhere({league: params.league});
                params.url = season.get('_links').leagueTable.href;
                var table = new LeagueTableModel(params);
                var fetchOptions = {
                    data: {}
                };
                if (params.matchday) {
                    fetchOptions.data.matchday = params.matchday;
                }
                table.fetch(fetchOptions).done(function() {
                    var navigateOptions = {};
                    if (options && options.replace) {
                        navigateOptions.replace = true;
                    }
                    Backbone.history.navigate('league/' + params.league + '/' + table.get('matchday'), navigateOptions);
                    var view = new View({model: table});
                    layout.main.show(view);
                    var analytics = ga && ga('send', 'pageview', {page: Backbone.history.fragment});
                });
            });
        }
    });
});
