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
        let self = this;
        this.socket.on('connect',function(){  //detects 
          console.log("conenction established using sockets ...!");

          self.socket.emit('join_room',{ //join_room is name for any room
              user_email : self.userEmail,
              chatroom : 'codeial'
          });
          self.socket.on('user_joined',function(data){
              console.log('a user joined',data);
          })
        });

        //send a message on clicking send button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val(); //retrieve input value
            if(msg != ''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email : self.userEmail,
                    chatroom : 'codeial'
                });
            }
        });

        self.socket.on('recieve_message',function(data){
            console.log('message recieved',data.message);

            //app message to chat box
            let newMessage = $('<li>');
            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<span>',{
                'html': data.message
            }));
            newMessage.append($('<sub>',{
                'html': data.user_email.split("@")[0]
            }));
           

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        })
    }
   
}