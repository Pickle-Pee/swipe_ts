import io, { Socket } from 'socket.io-client';

export class SocketClient{
    socket: Socket;
     createSocketConnection(){
        const socket=io("ws://193.164.150.223:1024")
        return socket;
    }
    constructor(){
       this.socket= this.createSocketConnection();
       this.socket.on('connect',()=>{
           console.log('Успешно подключено к соксету');
       })
    }
}

