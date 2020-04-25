var express = require('express'), bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
app.use(bodyParser.json());

app.get('/getUser/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( JSON.parse(data)[req.params.id] );
      res.end( JSON.stringify(JSON.parse(data)[req.params.id])  );
   });
})
app.post('/newUser', function(req, res){              //Takes the name, password, and internal ID of a new user.
   res.setHeader('Content-Type', 'application/json'); 
   console.log(req.body);
   if (req.body.id!=null&&req.body.password!=null&&req.body.name!=null) {
      fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
         let newdata= JSON.parse(data);
         if (Object.keys(newdata).includes(req.body.id)) {
            res.send("ALREADY_REGISTERED");
            return;
         }
         newdata[req.body.id]= {"name":req.body.name,"password":req.body.password,"id":req.body.id};
         fs.writeFileSync( __dirname + "/" + "users.json", JSON.stringify(newdata), 'utf-8');
         res.send("OK");
      });
      

   } else {
      res.send("INVALD_USER");
   }

});
app.post('/newFarmer', function(req, res){              //Takes the name, password, and internal ID of a new user.
   res.setHeader('Content-Type', 'application/json'); 
   console.log(req.body);
   if (req.body.id!=null&&req.body.password!=null&&req.body.latlong!=null&&req.body.farmName!=null&&req.body.isContractor!=null) {
      fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
         let newdata= JSON.parse(data);
         if (Object.keys(newdata).includes(req.body.id)) {
            res.send("ALREADY_REGISTERED");
            return;
         }
         newdata[req.body.id]= {"password":req.body.password,"id":req.body.id,"farmName":req.body.farmName,"isContractor":req.body.isContractor,"gps":req.body.latlong};
         fs.writeFileSync( __dirname + "/" + "farmers.json", JSON.stringify(newdata), 'utf-8');
         res.send("OK");
      });
      
      
   } else {
      res.send("INVALD_DATA");
      return;
   }

});
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})