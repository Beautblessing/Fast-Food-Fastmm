const http = require("http");
const app = require("./app");

const port = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(port);

//listen for request
// app.listen(process.env.port || 5000, function(){
//     console.log("now listening for requests");
// });
