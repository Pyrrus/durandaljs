// This is the main requirejs script

requirejs.config({
    paths: {
        'durandal': '../bower_components/Durandal/js',
        'jquery': '../bower_components/jquery/jquery',
        'knockout': '../bower_components/knockout/dist/knockout',
        'plugins': '../bower_components/Durandal/js/plugins',
        'text': '../bower_components/requirejs-text/text',
        'transitions': '../bower_components/Durandal/js/transitions'
    }
});

define(function (require) {

    // Durandal configuration:
    var app = require('durandal/app');
    var system = require('durandal/system');
    var viewLocator = require('durandal/viewLocator');

    system.debug(true);

    app.title = 'First time using Durandal';
    app.configurePlugins({
        observable: true, 
        router: true
    });
    app.start()
        .then(function () {
            viewLocator.useConvention();
            app.setRoot('Shell', 'entrance');
        });
});
