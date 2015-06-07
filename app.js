var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use( bodyParser.json() ); 

app.post('/bookmark',
	function(req, res) {
		var jobj = req.body;
		console.log(JSON.stringify(req.body));
		var towrite = "";

		for(key in jobj) {
			towrite += key+","+jobj[key]+"\n";
		}

		fs.writeFile("./public/books.txt", towrite, function(err) {
		    if(err) {
		    	res.sendStatus(500);
		        return console.log(err);
		    }

		    res.sendStatus(200);
		}); 
	});


//------------------------------
// SERVE PUBLIC FOLDER
//------------------------------
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});