document.addEventListener('DOMContentLoaded', function() {
  const recipientSelect = document.getElementById('recipient');
  const messageContentInput = document.getElementById('messageContent');
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  const messageList = document.getElementById('messageList');

  // Function to fetch messages
  function fetchMessages() {
    // Fetch data from the database (replace with actual database call)
    const messages = [
      { message_id: 'M1', recipient: 'Student', content: 'Complete your homework by tomorrow.', created_at: '2024-06-15' },
      { message_id: 'M2', recipient: 'Teacher', content: 'Please submit the grades by end of the week.', created_at: '2024-06-15' }
    ];

    messageList.innerHTML = '';
    messages.forEach(message => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `To: ${message.recipient} - ${message.content} (Sent on ${message.created_at})`;
      messageList.appendChild(listItem);
    });
  }

  // Function to send a message
  function sendMessage() {
    const recipient = recipientSelect.value;
    const content = messageContentInput.value;

    if (recipient && content) {
      // Add new message to the database (replace with actual database call)
      console.log('Message Sent:', { message_id: `M${Math.floor(Math.random() * 1000)}`, recipient, content, created_at: new Date().toISOString() });

      // Clear form fields
      recipientSelect.value = '';
      messageContentInput.value = '';

      // Fetch updated messages
      fetchMessages();
    } else {
      alert('Please fill all fields');
    }
  }

  // Event listener
  sendMessageBtn.addEventListener('click', sendMessage);

  // Fetch initial messages
  fetchMessages();
});
