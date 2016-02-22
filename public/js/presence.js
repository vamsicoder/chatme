var socket = io();
var online_users = [];

socket.on("notifyUser",function(user) {
	var me = $("#user").val();
	if(user !== me) {

		$("#notifyUser").text(user + " is typing");
	}

	setTimeout(function() {
		$("#notifyUser").text('');
	}, 10000)
});

socket.on("chatMessage", function(from, msg) {
	var me = $("#user").val();
	var color = (from === me) ? "green": "#009afd";
	var from = (from === me) ? "Me": from;
	$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on("addUser", function(user) {
	online_users.push(user);
	console.log(online_users);
});