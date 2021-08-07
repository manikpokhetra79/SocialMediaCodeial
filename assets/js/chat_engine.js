//client side : user

class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000'); // fires an event connection in config                                               chat_sockets file
        if(this.userEmail){
            this.connectionHandler();
        }
        // console.log(this.chatBox);
    }

    connectionHandler(){
      this.socket.on('connect',function(){  //detects 
          console.log("conenction established using sockets");
      });
    }
}