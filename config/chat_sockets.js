//observer :: server which will recieve incoming requests from subscribers
// io will handle the connection
//socket is an object with multiple properties
module.exports.chatSockets = function(socketServer){ //recieves the conenction
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log("new connection recieved",socket.id);
    });

    io.sockets.on('disconnect',function(){
        console.log("Socket disconnected");
    })
}