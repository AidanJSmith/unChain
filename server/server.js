var express = require('express'), bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
app.use(bodyParser.json());

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) { //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
   var dLon = deg2rad(lon2-lon1); 
   var a = 
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
     Math.sin(dLon/2) * Math.sin(dLon/2)
     ; 
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   var d = R * c; // Distance in km
   return d;
 }
 
 function deg2rad(deg) {
   return deg * (Math.PI/180)
 }

//Get User Data
app.get('/getUser/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.id]== undefined) {
         res.send("NOT_FOUND");
         return;
      };
      res.send( JSON.stringify(JSON.parse(data)[req.params.id])  );
   });
})

//Get Farmer Data
app.get('/getFarmer/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.id]== undefined) {
         res.send("NOT_FOUND");
         return;
      };
      res.send( JSON.stringify(JSON.parse(data)[req.params.id])  );
   });
})

//Get Farmers' Market Data
app.get('/getMarket/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) {
      if (JSON.parse(data)[req.params.id]== undefined) {
         res.send("NOT_FOUND");
         return;
      };
      res.send( JSON.stringify(JSON.parse(data)[req.params.id])  );
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
         newdata[req.body.id]= {"password":req.body.password,"markets":[],"id":req.body.id,"farmName":req.body.farmName,"isContractor":req.body.isContractor,"routes":[], "rep":100,reviews:[],"products":{},"gps":req.body.latlong};
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
         res.end("USER_NOT_FOUND");
         return;
      };
      let newdata=JSON.parse(data);
      let products=JSON.parse(data)[req.params.farmerid]["products"];
      console.log(req.body.products);
      for (let item of req.body) {
         console.log(item.id);
         if (item.id==undefined) {
            res.end("INVALID_DATA");
            return;
         }
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

//Join Market
app.get('/joinMarket/:farmerid/:marketid', function (req, res) {
   let market;
   let marketid=req.params.marketid;
   let farmerid=req.params.farmerid;
   fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) {
      if (JSON.parse(data)==undefined||JSON.parse(data)[marketid]== undefined) {
         res.end("MARKET_NOT_FOUND");
         console.log("END")
         return;
      } else {
         market=JSON.parse(data);
         console.log(market);
         fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {
            if (JSON.parse(data)[req.params.farmerid]==undefined) {
               res.end("USER_NOT_FOUND");
               return;
            } else {
               let farmers=JSON.parse(data);
               market[req.params.marketid]["farmers"].push(req.params.farmerid);
               farmers[req.params.farmerid]["markets"].push(req.params.marketid);
               fs.writeFile( __dirname + "/" + "markets.json", JSON.stringify(market), 'utf-8', function (err) {
                  if (err) res.send(err);
                  return;
               });
               fs.writeFile( __dirname + "/" + "farmers.json", JSON.stringify(farmers), 'utf-8', function (err) {
                  if (err) res.send(err);
                  return;
               });
               res.send("OK"); 
            }
         })
      }
})})

//Farmers Market Product Aggregate
app.get('/marketProducts/:marketid', function (req, res) {
   let market;
   let marketid=req.params.marketid;
   
   fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) {
      let products=[]
      if (JSON.parse(data)==undefined||JSON.parse(data)[marketid]== undefined) {
         res.end("MARKET_NOT_FOUND");
         console.log("END")
         return;
      } else {
         let farmers;
         fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data2) {
            farmers=JSON.parse(data2);          
            let users=JSON.parse(data)[marketid]["farmers"];            
            for (let user of users) {
               console.log(user);
               if (farmers[user]==undefined) {
                  res.end("ERR");
                  return;
               }
               if (farmers[user]==undefined) {
                  continue;
               }
               for (let product of Object.keys(farmers[user]["products"])) {
                  console.log(product);
                  products.push([farmers[user]["products"][product],user]);
               }
            }
            res.send(JSON.stringify(products));
         })
         
      }

   })
})

//Get Nearest Farmers' Market to user
app.get('/marketsNear/:lat/:long', function (req, res) {
   let latitude=req.params.lat;
   let longitude=req.params.long;
   fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) {
      let withinrange=[]
      let newdata=JSON.parse(data);
      for (let market of Object.keys(JSON.parse(data))) {
         console.log(market);
         console.log(market);
         console.log(newdata["exfat"]);
         let distance= getDistanceFromLatLonInKm(latitude,longitude,newdata[market]["gps"].split("lat")[1].split("long")[0],newdata[market]["gps"].split("lat")[1].split("long")[1])
         if (distance<=25) {
            withinrange.push([market,distance]);
         }
      }
      res.send(JSON.stringify(withinrange));
   });
})

//Find Subcontractors On Farmer's Route
app.get('/subcontractNear/:lat/:long', function (req, res) {
   let latitude=req.params.lat;
   let longitude=req.params.long;
   fs.readFile( __dirname + "/" + "farmers.json", 'utf8', function (err, data) {  // Account for if they're within tolerance of a market or a farmer's farm.
      let withinrange=[] 
      for (let farmer of Object.keys(JSON.parse(data))) {
         let distance= getDistanceFromLatLonInKm(latitude,longitude,data[farmer]["gps"].split("lat")[1].split("long")[0],data[farmer]["gps"].split("lat")[1].split("long")[1])
         if (distance<=25) {
            withinrange.push([market,distance]);
         }
      }
      fs.readFile( __dirname + "/" + "markets.json", 'utf8', function (err, data) { // Account for if they're within tolerance of a market or a farmer's farm.
         for (let market of Object.keys(JSON.parse(data))) {
            let distance= getDistanceFromLatLonInKm(latitude,longitude,data[market]["gps"].split("lat")[1].split("long")[0],data[market]["gps"].split("lat")[1].split("long")[1])
            if (distance<=25) {
               withinrange.push([market,distance]);
            }
         }
      })
      res.end(JSON.stringify(withinrange));
   })
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("unChain listening at http://%s:%s", host, port)
})