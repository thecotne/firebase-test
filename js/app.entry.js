import 'firebase';
var chat = new Firebase('https://resplendent-inferno-895.firebaseio.com/chat');

function appendMessage(text) {
	var message = document.createElement('div');
	message.textContent = text;
	messages.appendChild(message);
}


chat.once('value', snapshot => {
	snapshot.forEach(childSnapshot => {
		appendMessage(childSnapshot.val())
	});
});


chat.on('child_added', (snapshot, prevChildKey) => {
	appendMessage(snapshot.val());
});


var id = document.getElementById.bind(document);

var newMessage = id('new-message');
var messages = id('messages');


newMessage.addEventListener('keyup', e => {
	if (e.keyCode != 13) return;
	chat.push(newMessage.value);
	newMessage.value = '';
});
