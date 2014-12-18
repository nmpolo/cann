define([
    'marionette',
    'text!views/table.html'
], function(
    Marionette,
    Template
) {
    'use strict';

    var ItemView = Marionette.ItemView.extend({
        tagName: 'tr',
        serializeData: function() {
            var data = this.model.toJSON();
            var teamnames = [];
            _.each(data.teams, function(team) {
                teamnames.push(team.team);
            });
            data.teamnames = teamnames.join(', ');
            return data;
        },
        template: '<td><%- obj.points %></td><td><%- obj.teamnames %></td>'
    });

    var View = Marionette.CompositeView.extend({
        template: Template,
        childView: ItemView,
        childViewContainer: 'tbody',
        modelEvents: {
            'sync': 'render',
            'error': 'onError'
        },
        initialize: function(opts) {
            var options = {reset: true, data: {}};
            if (opts.matchday) {
                options.data.matchday = opts.matchday;
            }
            this.model.fetch(options);
            this.collection = new Backbone.Collection();
        },
        onRender: function() {
            this.rankings();
        },
        onError: function() {
            this.$('tbody').html('<tr><td colspan="2" class="danger">Error loading data</td></tr>');
        },
        rankings: function() {
            var rankings = this.model.get('ranking');
            if (!rankings) {
                return;
            }
            var min = _.min(rankings, function(ranking) {
                return ranking.points;
            }).points;
            var max = _.max(rankings, function(ranking) {
                return ranking.points;
            }).points;
            this.collection.reset();
            var i;
            for (i = max; i >= min; i--) {
                var model = {
                    points: i
                };
                model.teams = _.where(rankings, {points: i});
                this.collection.add(model);
            }
        }
    });

    return View;
});
