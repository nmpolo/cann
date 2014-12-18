define([
    'marionette'
], function(
    Marionette
) {
    'use strict';

    var Module = Marionette.Module.extend({
        initialize: function(moduleName, app, options) {
            Marionette.Renderer.render = function(template, data) {
                return _.template(template, data);
            };
        }
    });

    return Module;
});
