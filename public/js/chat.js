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
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}