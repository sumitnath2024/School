document.addEventListener('DOMContentLoaded', function() {
  const recipientSelect = document.getElementById('recipient');
  const messageContentInput = document.getElementById('messageContent');
  const sendMessageBtn = document.getElementById('sendMessageBtn');

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
    } else {
      alert('Please fill all fields');
    }
  }

  // Event listener
  sendMessageBtn.addEventListener('click', sendMessage);
});
