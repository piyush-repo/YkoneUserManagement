"use strict";
var utils = require('./utils');
var _ = require('underscore');
var page = ['', '2Z0WxHAIVb', 'lMEb3e5r', 'mCzFs7xPGnWhbb', 'LxIYOYkKNhHNP', 'Ul6w75yesLxl']


let webScrap = function () {
    this.scrap = () => {
        var promises = [];
        return new Promise((resolve, reject) => {
            page.forEach((p) => {
                promises.push(utils.retrieve(p));
            })
            Promise.all(promises).then(function (result) {
               let newResult = _.flatten(result);
                console.log("len : ", newResult.length);
                resolve(newResult);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}
module.exports = new webScrap();



