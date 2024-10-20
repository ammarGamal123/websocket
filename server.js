// Import the 'ws' library to use WebSocket
const WebSocket = require('ws');
const PORT = 5000;

// Create a WebSocket server on the specified port
const wsServer = new WebSocket.Server({ port: PORT });

// Event handler for new client connections
wsServer.on('connection', function (socket, req) {
    // Extract client details from the incoming request
    const clientIp = req.socket.remoteAddress;
    const clientPort = req.socket.remotePort;

    // Log the client's connection information
    console.log(`A client connected! IP: ${clientIp}, Port: ${clientPort}`);

    // Attach behavior to handle incoming messages from the client
    socket.on('message', function (msg) {
        console.log(`Received a message from the client: ${msg}`);

        // Send a response back to the client
        const response = `Echo from the server: ${msg}`;
        console.log(`Sent: ${response}`);
        //socket.send(response);

        // broadcast that message to all connected clients 
        wsServer.clients.forEach(function(client){
            client.send(`Someone Said this thing: ${msg}`);
        });
    });

    // Handle client disconnection
    socket.on('close', function () {
        console.log(`Client disconnected: IP ${clientIp}, Port ${clientPort}`);
    });

    // Handle errors in communication
    socket.on('error', function (err) {
        console.error(`Error with client ${clientIp}: ${err.message}\nerror is ${err.message}`);
    });
});

// Server startup message
console.log(`${new Date()} Server is listening on port ${PORT}...`);
