// server.js

// import express ()
var express = require('express');       // npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);  // npm install --save socket.io

var makeup = [
{'product': "True Match Liquid Foundation",
 'label': "Loréal Paris",
 'price': 12.79,
 'coulor': "Rose Vanilla 2C",
 'volume': "30 ml",
 'url': "http://boots.scene7.com/is/image/Boots/10200787?wid=200&hei=200&op_sharpen=1"
},

{'product': "Stay Matte Pressed Powder",
 'label': "Rimmel London",
 'price': 5.11,
 'coulor': "Peach Glow",
 'volume': "14 g",
 'url': "http://i2.offers.gallery/p-12-b6-12b6575083aed3f981b81749af554125200x200/rimmel-stay-matte-pressed-powder-puder-matujcy-prasowany-002-pink-blossom-14g.jpg",
},

{'product': "Luxiuruos Mascara for False Lash Effect",
 'label': "Yves Saint Laurent",
 'price': 32,
 'coulor': "Burgundy",
 'volume': "7.5 ml",
 'url' : "http://boots.scene7.com/is/image/Boots/10024556?wid=200&hei=200&op_sharpen=1"
},

{'product': "Naked Palette",
 'label': "Urban Decay",
 'price': 49.28,
 'coulor': "-",
 'volume': "15,6 g",
'url' : "https://cdn1.thehunt.com/app/public/system/zine_images/5921343/hunt/3169dc4fa37b26546b21aeb797006077.jpg"
},

{'product': "Little Round Pot Blush",
 'label': "Bourjois Paris",
 'price': 10.23,
 'coulor': "Corail Tentation",
 'volume': "2.5 g",
'url' : "http://boots.scene7.com/is/image/Boots/10004959?wid=200&hei=200&op_sharpen=1"
},

];

/* ----------------------------------
    Server and Socket Configuration
--------------------------------------*/

// tell express to server our index.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// configure socket.io
// (1) when there is a connection 
io.on('connection', function(socket) {

  console.log('got a connection');

  // (2) configure the connected socket to receive custom messages
  socket.on('give some makeup', function(msg) {

    console.log('got a give some makeup: ' + msg);

    io.emit('all the makeup we have', makeup);

  });

  socket.on('disconnet', function() {

    console.log('got a disconnection');
    
  });

});

/* -------------------
    Start the server
----------------------*/

// listen to connection on port 8088 --> http://localhost:8088
server.listen(8088, function () {
    console.log('listening on port: ' + 8088);
});