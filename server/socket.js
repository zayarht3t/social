let io;

module.exports = {
    init: (httpServer)=>{
        io = require("socket.io")(httpServer,{
            cors: {
              origin: "http://localhost:3000",
              methods: ['GET,PUT,POST,DELETE,UPDATE,OPTIONS'],
              credentials: true
            }
          })
        return io;
    },
    getIo: ()=>{
        if(io){
            return io;
        }
        throw new Error("socket not initialized")
    }

}