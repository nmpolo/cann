require.config({
    paths: {
        backbone: '../vendor/bower/backbone/backbone',
        marionette: '../vendor/bower/backbone.marionette/lib/backbone.marionette',
        underscore: '../vendor/bower/underscore/underscore',
        jquery: '../vendor/bower/jquery/dist/jquery',
        text: '../vendor/bower/text/text'
    }
});

require([
    'app'
], function(
    app
) {
    'use strict';

    app.start();
});
