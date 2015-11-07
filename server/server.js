var express     = require('express');
var fs          = require('fs');
var http        = require('http');
var socketIo    = require('socket.io');
var bodyParser  = require('body-parser');
var porta       = 3000;

/*
 * Configurar o container Express, define parametros via JSON e request e iniciar o socket.io server
 */
var app            = express();
var server         = http.createServer(app);
var socketIoServer = socketIo.listen(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
})); 


/*
 * Mensagem default de acesso via WEB na API
 */
app.get('/', function (req, res) {
    res.send("Projeto Thor");
});

socketIoServer.sockets.on('connection', function (socket) {
    console.log('Nova Interface Conectada');
});