const express = require('express');
const app = express();
const firebase = require('firebase-admin');

// Initialize Firebase
firebase.initializeApp({
  // Your Firebase configuration
});

app.post('/messages', (req, res) => {
  const message = req.body;
  // Store the message in the database
  firebase.database().ref('messages').push(message);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});// Send a message to the server-side endpoint
fetch('/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(message)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Message sent successfully');
  } else {
    console.error('Error sending message');
  }
})
.catch(error => {
  console.error('Error:', error);
});
