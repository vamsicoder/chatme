var socket = io();

function notifyTyping() {
	var user = $("#user").val();
	socket.emit("notifyUser", user);
}


function submitfunction() {
	var from = $("#user").val();
	var message = $("#m").val();
	if(message !== "") {
		socket.emit("chatMessage", from, message);
	}
	$("#m").val('').focus();
	return false;
}

function emitJoin(name) {
	$("#user").val(name || '');
	socket.emit("chatMessage", "System", "<b>" + name + " has joined discussion </b>");
	socket.emit("addUser", {"name": name, id: makeid()});
}

function saveUserName() {
	var name = $("#userName").val();
	if(name === "") {
		return;
	}
	emitJoin(name);
	$("#userModal").modal("hide");
}

$(document).ready(function() {
	$("#userModal").modal("show");
})

function makeid() {
  return Math.random().toString(36).substr(7);
}