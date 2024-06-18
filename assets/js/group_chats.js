document.addEventListener('DOMContentLoaded', function() {
    fetchChatRooms();
});

function fetchChatRooms() {
    const db = firebase.firestore();
    db.collection('chat_rooms').get().then((querySnapshot) => {
        const chatRoomSelect = document.getElementById('chat_room');
        chatRoomSelect.innerHTML = '<option value="">Select Chat Room</option>'; // Clear previous rooms
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            chatRoomSelect.add(option);
        });
    });
}

function fetchChatMessages() {
    const chatRoomId = document.getElementById('chat_room').value;

    if (chatRoomId === '') {
        alert('Please select a chat room.');
        return;
    }

    const db = firebase.firestore();
    db.collection('chat_rooms').doc(chatRoomId).collection('messages').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const chatMessages = document.getElementById('chat_messages');
        chatMessages.innerHTML = ''; // Clear previous messages
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<strong>${message.sender_name}:</strong> ${message.content} <small class="text-muted">${new Date(message.timestamp.toDate()).toLocaleString()}</small>`;
            chatMessages.appendChild(li);
        });
    });
}

function sendChatMessage() {
    const chatRoomId = document.getElementById('chat_room').value;
    const chatMessage = document.getElementById('chat_message').value;

    if (chatRoomId === '' || chatMessage.trim() === '') {
        alert('Please select a chat room and type a message.');
        return;
    }

    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    db.collection('chat_rooms').doc(chatRoomId).collection('messages').add({
        sender_id: user.uid,
        sender_name: user.displayName,
        content: chatMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('chat_message').value = '';
    }).catch((error) => {
        console.error('Error sending message:', error);
    });
}
