define([
    'state'
], function(
    sm
) {
    'use strict';

    sm.state({
        name: 'default',
        route: '*def',
        transition: function(state, params) {
            sm.transition('league', {league: 'PL'}, {replace: true});
        }
    });
});
