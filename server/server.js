var express = require('express'), bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
app.use(bodyParser.json());

//Get User Data
app.get('/getUser/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.id]== undefined) {
         res.send("NOT_FOUND");
         return;
      };
      res.end( JSON.stringify(JSON.parse(data)[req.params.id])  );
   });
})

//Get Farmer Data
app.get('/getFarmer/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.id]== undefined) {
         res.send("NOT_FOUND");
         return;
      };
      res.end( JSON.stringify(JSON.parse(data)[req.params.id])  );
   });
})

//Get Farmers' Market Data
app.get('/getMarket/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.id]== undefined) {
         res.send("NOT_FOUND");
         return;
      };
      res.end( JSON.stringify(JSON.parse(data)[req.params.id])  );
   });
})
//Create a new User
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

//Create a new Farmer
app.post('/newFarmer', function(req, res){              //Takes the name, password,subcontractor status, and internal ID, and coordinates of a new farmer.
   res.setHeader('Content-Type', 'application/json'); 
   console.log(req.body);
   if (req.body.id!=null&&req.body.password!=null&&req.body.latlong!=null&&req.body.farmName!=null&&req.body.isContractor!=null) {
      fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
         let newdata= JSON.parse(data);
         if (Object.keys(newdata).includes(req.body.id)) {
            res.send("ALREADY_REGISTERED");
            return;
         }
         newdata[req.body.id]= {"password":req.body.password,"id":req.body.id,"farmName":req.body.farmName,"isContractor":req.body.isContractor,"routes":[], "rep":100,reviews:[],"products":{},"gps":req.body.latlong};
         fs.writeFileSync( __dirname + "/" + "farmers.json", JSON.stringify(newdata), 'utf-8');
         res.send("OK");
      });
      
      
   } else {
      res.send("INVALD_DATA");
      return;
   }

});

//Create Farmers' Market
app.post('/newMarket', function(req, res){              //Takes the name, password,subcontractor status, and internal ID, and coordinates of a new farmer.
   res.setHeader('Content-Type', 'application/json'); 
   console.log(req.body);
   if (req.body.id!=null&&req.body.latlong!=null&&req.body.name!=null&&req.body.schedule!=null&&req.body.description!=null) {
      fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) {
         let newdata= JSON.parse(data);
         if (Object.keys(newdata).includes(req.body.id)) {
            res.send("ALREADY_REGISTERED");
            return;
         }
         newdata[req.body.id]= {"id":req.body.id,"marketName":req.body.name,"farmers":[],"schedule":req.body.schedule,"description":req.body.description,"gps":req.body.latlong};
         fs.writeFileSync( __dirname + "/" + "markets.json", JSON.stringify(newdata), 'utf-8');
         res.send("OK");
      });
      
      
   } else {
      res.send("INVALD_DATA");
      return;
   }

});
// Add/Update Products
app.post('/addProducts/:farmerid', function (req, res) {
   res.setHeader('Content-Type', 'application/json'); 
   fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.farmerid]== undefined) {
         res.send("USER_NOT_FOUND");
         return;
      };
      let newdata=JSON.parse(data);
      let products=JSON.parse(data)[req.params.farmerid]["products"];
      console.log(req.body.products);
      for (let item of req.body.products) {
          products[item.id]=item;
      }
      newdata[req.params.farmerid]["products"]=products; 
      console.log(newdata);
      fs.writeFile( __dirname + "/" + "farmers.json", JSON.stringify(newdata), 'utf-8', function (err) {
         if (err) res.send(err);
         console.log('Replaced!');
       }); 
      
      res.send("OK");
      
   });
})

//Get Products
app.get('/getProducts/:farmerid', function (req, res) {
   res.setHeader('Content-Type', 'application/json'); 
   fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.farmerid]== undefined) {
         res.send("USER_NOT_FOUND");
         return;
      };
      let products=JSON.parse(data)[req.params.farmerid]["products"];
      
      res.send(JSON.stringify(products));
      
   });
})
//Delete Products
app.get('/deleteProduct/:farmerid/:productid', function (req, res) {
   res.setHeader('Content-Type', 'application/json'); 
   fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.farmerid]== undefined) {
         res.send("USER_NOT_FOUND");
         return;
      };
      let newdata=JSON.parse(data);
      let products=JSON.parse(data)[req.params.farmerid]["products"];
      try {
         delete products[req.params.productid];
      } catch (e) {
         console.log(e);
         res.send("INVALID_PRODUCT");
      }
      newdata[req.params.farmerid]["products"]=products; 
      console.log(newdata);
      fs.writeFile( __dirname + "/" + "farmers.json", JSON.stringify(newdata), 'utf-8', function (err) {
         if (err) res.send(err);
         console.log('Removed.');
       }); 
      
      res.send("OK");
      
   });
})
//Farmers Market Product Aggregate

//Join Market

//Get Nearest Farmers' Market to user

//Add Subcontractor

//Find Subcontractors On Farmer's Route


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("unChain listening at http://%s:%s", host, port)
})