const express = require('express')
const mongoose = require('mongoose')
const url = "mongodb://omar:omar@cluster0-shard-00-00.sf0zs.mongodb.net:27017,cluster0-shard-00-01.sf0zs.mongodb.net:27017,cluster0-shard-00-02.sf0zs.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-umacmu-shard-0&authSource=admin&retryWrites=true&w=majority"
//const url = "mongodb://Ayoub_test:Ayoub_test@cluster0-shard-00-00.ee3il.mongodb.net:27017,cluster0-shard-00-01.ee3il.mongodb.net:27017,cluster0-shard-00-02.ee3il.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-my093n-shard-0&authSource=admin&retryWrites=true&w=majority"

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())


var WebSocketServer = require("ws").Server
const WebSocket = require('ws')
var http = require("http")
var port = process.env.PORT || 5000
app.use(express.static(__dirname + "/"))
var server = http.createServer(app)
server.listen(port)
console.log("http server listening on %d", port)
var wss = new WebSocketServer({server: server})
console.log("websocket server created")

////////////////////////////////////////////////////////////////////
// const http = require('http')
// const port = process.env.PORT || 8080
// const httpServer = http.createServer(app)
// httpServer.listen(port)

// const WebSocket = require('ws')
// const wss = new WebSocket.Server({
//   'server': httpServer
// })
///////////////////////////////////////////////////////////////////////
// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    //console.log('A new client Connected!');
    //ws.send('Welcome New Client!');
  
    ws.on('message', function incoming(message) {
      //console.log('received: %s', message);
  
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      
    });
});   

const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)
const userRouter = require('./routes/users')
app.use('/users',userRouter)
const dashboardRouter = require('./routes/dashboard')
app.use('/dashboard',dashboardRouter)
const blocRouter = require('./routes/blocs')
app.use('/blocs',blocRouter)
const salleRouter = require('./routes/salles')
app.use('/salles',salleRouter)
const creaneauRouter = require('./routes/creneau')
app.use('/creneau',creaneauRouter)
const occupationRouter = require('./routes/occupation')
app.use('/occupation',occupationRouter)
app.use(express.static('public'));

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");
const { urlencoded } = require('express')

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );


// app.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });