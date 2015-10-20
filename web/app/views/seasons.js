define([
    'marionette',
    'seasons',
    'state'
], function(
    Marionette,
    seasons,
    sm
) {
    'use strict';

    var ChildView = Marionette.ItemView.extend({
        template: '<%- obj.caption %>',
        tagName: 'option',
        attributes: function() {
            return {
                value: this.model.get('league')
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
            this.collection = seasons;
        },
        onSubmit: function(event) {
            event.preventDefault();
            var league = this.ui.select.val();
            sm.transition('league', {league: league});
        },
        onChange: function(event) {
            this.$el.submit();
        }
    });

    return View;
});
