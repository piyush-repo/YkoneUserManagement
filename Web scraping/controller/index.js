"use strict";
let webScrap = require('../scrap'),
    userModel = require('../db/index').userSchema;

let controller = function () {
    this.scrap = (req, res, next) => {
        let promises = [];
        webScrap.scrap().then((result) => {
            console.log("total records : ",result.length);
            result.forEach(element => {
                console.log(element);
                var user = new userModel(element);
                promises.push(user.save());
            });
            Promise.all(promises).then((success) => {
                if (success) {
                    console.log("All data got saved into DB successfully ");
                    console.log("total records : ",result.length);
                    res.status(200).json({ success: true });
                }
            }).catch((error) => {
                next(error);
            })
        }).catch((error) => {
            next(error);
        })
    }

    this.listAll = (req, res, next) => {
        userModel.find({ deleted: false }).then((result) => {
            console.log("Total available records : ", result.length);
            res.status(200).json({ success: true, payload: result });
        }).catch((error) => {
            next(error);
        })
    }

    this.create = (req, res, next) => {
        let data = req.body;
        let user = new userModel(data);
        user.save().then((success) => {
            console.log("user got saved into DB");
            res.status(200).json({ success: true });
        }).catch((error) => {
            next(error);
        })
    }

    this.delete = (req, res, next) => {
        let email = req.params.email;
        userModel.update({ deleted: false, email: email }, { $set: { deleted: true } }).then((success) => {
            console.log("user got deleted ...");
            res.status(200).json({ success: true });
        }).catch((error) => {
            next(error);
        })
    }

    this.getClient = (req, res, next) => {
        console.log(req.url);
        let email = req.params.email;
        userModel.findOne({ deleted: false, email: email }).then((userData) => {
            console.log("user Details : ", userData);
            res.status(200).json({ success: true, payload: userData });
        }).catch((error) => {
            next(error);
        })
    }

    this.updateClient = (req, res, next) => {
        let email = req.body.email;
        let data = req.body.updateItems;
        let updateData = {}
        for (var key in data) {
            updateData[key] = data[key];
        }
        userModel.update({ deleted: false, email: email }, { $set: updateData }).then((success) => {
            console.log("user got updated ...");
            res.status(200).json({ success: true });
        }).catch((error) => {
            next(error);
        })
    }

    this.searchClient = (req, res, next) => {
        let obj = req.query;
        console.log(obj);
        let keys = Object.keys(obj);
        let searchtext = obj[keys[0]];
        console.log("searchText : ", searchtext);
        let query = {
            deleted: false
        }
        if (searchtext) {
            query['$or'] = [
                {
                    name: new RegExp(searchtext, 'i')
                },
                {
                    phone: new RegExp(searchtext, 'i')
                },
                {
                    email: new RegExp(searchtext, 'i')
                }
            ]
        }

        userModel.find(query).then((result)=>{
            console.log("Available Result "+ result.length + " for searchtext / "+ searchtext+" /");
            res.status(200).json({success:true,payload:result});
        }).catch((error)=>{
            next(error);
        })
    }
} 

module.exports = new controller();