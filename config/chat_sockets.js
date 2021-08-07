//observer :: server which will recieve incoming requests from subscribers
// io will handle the connection
//socket is an object with multiple properties
module.exports.chatSockets = function(socketServer){ //recieves the conenction
    //explicitly enable Cross-Origin Resource Sharing (CORS)
    //https://socket.io/docs/v4/handling-cors/
    let io = require('socket.io')(socketServer,{   
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
          }
});

    io.sockets.on('connection',function(socket){
        console.log("new connection recieved",socket.id);
    });

    io.sockets.on('disconnect',function(){
        console.log("Socket disconnected");
    })
}