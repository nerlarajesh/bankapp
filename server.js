var Hapi = require('hapi');
var inert = require('inert');
var vision = require('vision');
var fs = require('fs');
var handlebar = require('handlebars');
var routes = require('./route');
var server = new Hapi.Server();
server.connection({
    port: 3000,
    host: 'localhost'
})
server.register([{ register: vision }, { register: inert }])
server.views({
    engines: {
        hbs: handlebar
    },
    path: __dirname + '/views'
})
server.route(routes);
server.start(function(err) {
    if (err) throw err;
    console.log('server up and running at: ' + server.info.uri);
})