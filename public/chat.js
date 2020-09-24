// FRONT END

// Make connection using socket.io cdn
// Listening to Server -> Webpage could be hosted on a different URL, the localhost is the server address
let socket = io.connect("http://localhost:4000");

// Query DOM
let message = document.querySelector("#message"),
	handle = document.querySelector("#handle"),
	form = document.querySelector(".message-form"),
	output = document.querySelector("#output"),
	feed = document.querySelector("#feedback");

// Send message
form.addEventListener("submit", e => {
	e.preventDefault();
	socket.emit("chat", {
		message: message.value,
		handle: handle.value,
	});
});

// Typing indicator
message.addEventListener("change", e => {
	socket.emit("typing", {
		handle: handle.value,
	});
});

// Listen for events
socket.on("chat", data => {
	feedback.innerHTML = "";
	output.innerHTML += `<p class="user-message"><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on("typing", data => {
	feedback.innerHTML = `<p><em class="italic">${data.handle} is typing...</em></p>`;
});
