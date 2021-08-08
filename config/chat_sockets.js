//observer :: server which will recieve incoming requests from subscribers
// io will handle the connection
//socket is an object with multiple properties
module.exports.chatSockets = function(socketServer){ //recieves the conenction
    //explicitly enable Cross-Origin Resource Sharing (CORS)
    //https://socket.io/docs/v4/handling-cors/
    let io = require('socket.io')(socketServer,{   
        cors: {
            origin: "http://localhost:8000"
          }
        });

    io.sockets.on('connection',function(socket){
        console.log("new connection recieved",socket.id);

        socket.on('disconnect',function(){
            console.log("Socket disconnected");
        });

        socket.on('join_room',function(data){ //user sent a req to join the room
            console.log("Joining request recieved",data);
            socket.join(data.chatroom); // id a chatroom exists with the specified name and enters the user into it
            io.in(data.chatroom).emit('user_joined',data); // emit other users that new user has joined the chat
        })

    });


}