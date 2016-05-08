const jsdom = require('jsdom');
const virtualConsole = jsdom.createVirtualConsole().sendTo(console);

global.document = jsdom.jsdom('<html><head><script></script></head><body></body></html>', {virtualConsole});
global.window = global.document.defaultView;

// window.addEventListener("error", function (event) {
//   console.error("script error!!", event.error);
// });

global.navigator = window.navigator = {userAgent: 'jsdom'};
global.Node = window.Node;


global.window.mocha = {};
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;

/*
 * Only for Bower users
 */
require('../../app/bower_components/angular/angular');
require('../../app/bower_components/angular-route');
require('../../app/bower_components/angular-resource');
require('../bower_components/angular-mocks/angular-mocks');

global.$ = require('../../app/bower_components/jquery/dist/jquery.min');
$('body').append('<div id="mocha-fixture"></div>');

/*
 * Only for NPM users
 */
// require('angular/angular');
// require('angular-mocks');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;
