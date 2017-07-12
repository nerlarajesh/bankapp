   var Joi = require('joi');
   var schema = {
       cardName: Joi.string().alphanum().min(3).max(30).required(),
       location: Joi.string().min(3).max(5)
   };