var handelrs = require('./handlers');
var fs = require('fs');
var uuid = require('uuid');
var joi = require('joi');
var boom = require('boom');
var cards = JSON.parse(fs.readFileSync('./cards.json', 'utf-8'));
module.exports = [{
        method: 'GET',
        path: '/card',
        handler: function(request, reply) {
            reply.view('cards', { data: JSON.parse(fs.readFileSync('./cards.json', 'utf-8')), dropdownData: fs.readdirSync('./images'), errMessage: "" });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.redirect('/card');
        }
    },
    {
        method: 'POST',
        path: '/new',
        handler: function(request, reply) {
            if (request.payload.cardName != "" && request.payload.path != "" && request.payload.location != "") {
                var id = uuid.v1()
                var newCard = { cardName: request.payload.cardName, path: request.payload.path, location: request.payload.location, id: id }
                cards[id] = newCard
                fs.writeFileSync('./cards.json', JSON.stringify(cards))
                reply.redirect('/card')
            } else {
                reply.view('cards', { data: JSON.parse(fs.readFileSync('./cards.json', 'utf-8')), dropdownData: fs.readdirSync('./images'), errMessage: "Please enter the proper card details" });
            }
        }
    },
    {
        method: 'GET',
        path: '/delete',
        handler: function(request, reply) {
            delete cards[request.query.id];
            fs.writeFileSync('./cards.json', JSON.stringify(cards))
            reply.redirect('/card')
        }
    },
    {
        method: 'GET',
        path: '/img/{file*}',
        handler: {
            directory: {
                path: 'images'
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/styles/{file*}',
        handler: {
            directory: {
                path: 'dist'
            }
        }
    }

]