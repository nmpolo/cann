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
            data.teamnames = _.pluck(data.teams, 'teamName').join(', ');
            return data;
        },
        template: '<td><%- obj.points %></td><td><%- obj.teamnames %></td>'
    });

    var View = Marionette.CompositeView.extend({
        template: Template,
        childView: ItemView,
        childViewContainer: 'tbody',
        initialize: function() {
            this.collection = new Backbone.Collection();
        },
        onBeforeShow: function() {
            var standings = this.model.get('standing');
            var min = _.min(standings, function(standing) {
                return standing.points;
            }).points;
            var max = _.max(standings, function(standing) {
                return standing.points;
            }).points;
            var i;
            for (i = max; i >= min; i--) {
                this.collection.add({
                    points: i,
                    teams: _.where(standings, {points: i})
                });
            }
        }
    });

    return View;
});
