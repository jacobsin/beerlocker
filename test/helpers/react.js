const jsdom = require('jsdom');
const virtualConsole = jsdom.createVirtualConsole().sendTo(console);
const url = 'http://localhost';

global.document = jsdom.jsdom('<html><head><script></script></head><body></body></html>', {virtualConsole, url});
global.window = global.document.defaultView;

window.addEventListener("error", function (event) {
  console.error("script error!!", event.error);
});

global.navigator = window.navigator = {userAgent: 'jsdom'};
global.Node = window.Nodes;


global.window.mocha = {};
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;

global.$ = require('../../app/bower_components/jquery/dist/jquery.min');
$('body').append('<div id="mocha-fixture"></div>');
