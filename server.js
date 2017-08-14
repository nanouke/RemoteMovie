// Includes
let express = require('express');
let exphbs  = require('express-handlebars');
let path   = require('path');
let fs = require('fs');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// =============================================
// Routes
// =============================================
app.get('/remote', function(request, response){

    let videoPath = 'public/videos';
    var files = [];
    var dynamicScript = ['remoteClient'];

    fs.readdir(videoPath, function(err,items){
        console.log(items);
        response.render('remote', {'videos' : items, 'dynamicScript': dynamicScript, 'title': 'Remote' });
    });

    
    //response.sendFile(__dirname + "/public/pages/remote.html");
});

app.get('/player', function(request, response){
    response.render('player',{'title': 'Player'});
});

var remoteClient = null;
var playerClient = null;

io.on('connection', function(socket){
    console.log('New user');
    
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

    // Remote controle
    socket.on('remote', function(data){
        console.log(data);
    });

    // player
    socket.on('player', function(data){
        console.log(data);


    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
  });


