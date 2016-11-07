// init project
var express = require('express');
var app = express();
var http = require('http');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//app.enable('trust proxy')

// this works! 
// http.get('http://bot.whatismyipaddress.com', function(res){
//     res.setEncoding('utf8');
//     res.on('data', function(chunk){
//         console.log(chunk);
//     });
// });

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    //   let ip = req.headers['x-forwarded-for']

    // let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    //x-appengine-user-ip

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress.split(":").pop()

    let language = req.headers['accept-language'].split(',')[0]

    let osString = req.headers['user-agent']
    let os = (osString.split(' ')[1] + ' ' + osString.split(' ')[2] + ' ' + osString.split(' ')[3]).replace('(', '').replace(')', '')

    let headers = req.headers

    //console.log('headers: ' + headers)
    //console.log(req)
    console.log(req.headers)

    console.log(ip)
    let json = {
        "ipaddress": ip,
        "language": language,
        "software": os
    }


    res.send(JSON.stringify(json))
});

app.get("/dreams", function (request, response) {
    response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
    dreams.push(request.query.dream);
    response.sendStatus(200);
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});