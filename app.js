/* Config */
var serverIP = 'ws://localhost:8080'; /* Put here your server IP */

/* Server require */
var express = require('express');
var app = express();
var http = require('http');

/* Moduls */
var compression = require('compression');
var multer  = require('multer')
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var watch = require('node-watch');

/* GZIP compression */
app.use(compression());

/* IO / WATCH : Check change files */
io.sockets.on('connection', function (socket, pseudo) {

    watch('./public', { recursive: true }, function(evt, name) {
        if (evt == 'update') {

            if (name.match(".jpg") || name.match(".jpeg") || name.match(".png")) {
               socket.emit('message', name);
            } 
        }
    });
});

/* Static ressources */
app.use(express.static(__dirname + '/public'));

/* View engine */
app.set('view engine', 'ejs');

/* Files storage */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
        console.log(file.originalname + '-' + Date.now() + getExtension(file))
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype)
        cb(null, file.originalname + '-' + Date.now() + getExtension(file));
    }
});

function getExtension(file) {
    var res = '';
    if (file.mimetype === 'image/jpeg') res = '.jpg';
    if (file.mimetype === 'image/png') res = '.png';
    return res;
}

var upload = multer({ storage: storage })

/* Routes */
app.get('/', function(req, res, next) {
	res.render('index', {server: serverIP});
});

app.post('/send', upload.single('picture'), function (req, res, next) {
  res.render('resend');
});

app.get('/screen', function(req, res, next) {
	res.render('screen', {pic: "start.jpg", server: serverIP});
});

/* Server Config */
server.listen(8080);