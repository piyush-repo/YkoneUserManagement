"use strict" ;

let mongoose = require('./connection');
let userSchema = require("./schema/user")(mongoose);
module.exports = {
    userSchema : userSchema
}