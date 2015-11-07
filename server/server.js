var http        = require('http');
var express     = require('express');
var socketIo    = require('socket.io');
var bodyParser  = require('body-parser');
var ip          = require('ip');
var porta       = 3000;

var myIP          = ip.address();
var upmMicrophone = require("jsupm_mic");
var myMic         = new upmMicrophone.Microphone(0);

var threshContext = new upmMicrophone.thresholdContext;
threshContext.averageReading = 0;
threshContext.runningAverage = 0;
threshContext.averagedOver   = 2;

var is_running = false;


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
        
    var myInterval = setInterval(function(){
        var buffer = new upmMicrophone.uint16Array(128);
        var len = myMic.getSampledWindow(2, 128, buffer);
        if (len) {
            var thresh = myMic.findThreshold(threshContext, 30, buffer, len);
            myMic.printGraph(threshContext);
            if (thresh){
                console.log("Threshold is " + thresh);
                socket.emit('grito', thresh);
            }
        }
    }, 500);
});

process.on('SIGINT', function()
{
	clearInterval(myInterval);
	console.log("Exiting");
	process.exit(0);
});


/*
 * Iniciar a aplicacao WEB para aceitar requisicoes
 */
server.listen(porta, function () {
    console.log("Servidor Thor-Edison-Game iniciado: http://" + myIP + ":" + porta);
});