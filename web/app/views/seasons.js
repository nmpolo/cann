define([
    'marionette'
], function(
    Marionette
) {
    'use strict';

    var ChildView = Marionette.ItemView.extend({
        template: '<%- obj.caption %>',
        tagName: 'option',
        modelEvents: {
            'change': 'render'
        },
        attributes: function() {
            return {
                value: this.model.id
            };
        }
    });

    var View = Marionette.CompositeView.extend({
        childView: ChildView,
        childViewContainer: 'select',
        tagName: 'form',
        template: '<select class="form-control"></select>',
        events: {
            'submit': 'onSubmit',
            'change select': 'onChange'
        },
        ui: {
            'select': 'select'
        },
        initialize: function() {
            this.collection = require('app').Data.seasons;
        },
        onSubmit: function(event) {
            event.preventDefault();
            var season = this.ui.select.val();
            Backbone.history.navigate('season/' + season, true);
        },
        onChange: function(event) {
            this.$el.submit();
        }
    });

    return View;
});
