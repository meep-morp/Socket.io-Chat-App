// BACK END

let express = require("express");
let socket = require("socket.io");

// App setup
let app = express();
let server = app.listen(4000, function () {
	console.log("listening for requests on port 4000,");
});

// Static files -> The Web Page that the base URL is on
app.use(express.static("public"));

// Socket setup & pass server
let io = socket(server);
io.on("connection", socket => {
	console.log("made socket connection", socket.id);

	socket.on("chat", data => {
		// Targets all sockets
		io.sockets.emit("chat", data);
	});

	socket.on("typing", data => {
		// Targets all sockets except for the socket emitting the data
		socket.broadcast.emit("typing", data);
	});
});
