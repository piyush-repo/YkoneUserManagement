'use strict';
var cheerio = require('cheerio');
var request = require('request');
module.exports = {
    retrieve: function (page) {
        let form;
        if (page) {
            form = {
                page: page
            }
        }
        else {
            form={}
        }
        return new Promise((resolve, reject) => {
            request.post({ url: "https://jointhecrew.in/clients/", form: form }, function (error, response, body) {
                if (error) {
                    console.log("error : ", error);
                }
                console.log("statusCode : ", response.statusCode);

                var $ = cheerio.load(body);

                var table = $('table tbody');
                var Arr = []
                table.find('tr').each(function (i) {
                    var $td = $(this).find('td');
                    let phone = $td.eq(1).text().split(" ");
                    Arr.push({
                        name: $td.eq(0).text(),
                        countryCode:phone[0],
                        phone: phone[1],
                        email: $td.eq(2).text(),
                        company: $td.eq(3).text(),
                        zip: $td.eq(4).text()
                    })
                })
                resolve(Arr);
            })
        })

    }
}