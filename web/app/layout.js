define([
    'marionette',
    'views/seasons'
], function(
    Marionette,
    SeasonView
) {
    'use strict';

    var Layout = Marionette.LayoutView.extend({
        el: 'body',
        regions: {
            main: '#main',
            seasons: '#seasons'
        },
        initialize: function() {
            this.seasons.show(new SeasonView());
        }
    });

    var layout = new Layout();
    return layout;
});
