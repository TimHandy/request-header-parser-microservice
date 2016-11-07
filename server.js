'use strict'
// init project
var express = require('express');
var app = express();
var http = require('http');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// app.enable('trust proxy')

// this works as a workaround?
// http.get('http://bot.whatismyipaddress.com', function(res){
//     res.setEncoding('utf8');
//     res.on('data', function(chunk){
//         console.log(chunk);
//     });
// });


app.get("/", function (req, res) {
    //   let ip = req.headers['x-forwarded-for']

    // let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress.split(":").pop()

    let language = req.headers['accept-language'].split(',')[0]

    let osString = req.headers['user-agent']
    let os = osString.match(/\(([^\)]+)\)/)[0].replace(/[\(|\)]+/g, '')
    console.log('os' + os)
    // let os = (osString.split(' ')[1] + ' ' + osString.split(' ')[2] + ' ' + osString.split(' ')[3]).replace('(', '').replace(')', '')


    let headers = req.headers

    // console.log(req.headers)

    // console.log(ip)

    let json = {
        "ipaddress": ip,
        "language": language,
        "software": os
    }

    res.send(JSON.stringify(json))
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});