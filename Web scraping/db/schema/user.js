"use strict";

//let mongoose = require("../connection.js");

module.exports = (mongoose) => {
    let userSchema = new mongoose.Schema({
        name: {
            type: String
        },
        phone: {
            type: String
        },
        countryCode:{
            type:String
        },
        email: {
            type: String
        },
        company: {
            type: String
        },
        zip: {
            type: Number
        },
        updateDate: {
            type: Date
        },
        deleted: {
            type: Boolean,
            default: false,
            required: true
        }
    }, { strict: true })

    return mongoose.model("user", userSchema);
}
