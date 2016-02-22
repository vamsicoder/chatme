var socket = io();

socket.on("chatMessage", function(from, msg) {
	var me = $("#user").val();
	var color = (from === me) ? "green": "#009afd";
	var from = (from === me) ? "Me": from;
	$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

function notifyTyping() {
	var user = $("#user").val();
	socket.emit("notifyUser", user);
}

socket.on("notifyUser",function(user) {
	var me = $("#user").val();
	if(user !== me) {

		$("#notifyUser").text(user + " is typing");
	}

	setTimeout(function() {
		$("#notifyUser").text('');
	}, 10000)
});

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