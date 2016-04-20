const jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.defaultView;
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

/*
 * Only for NPM users
 */
// require('angular/angular');
// require('angular-mocks');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;
