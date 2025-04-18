const sendBtn = document.querySelector('#send-btn');
const userInput = document.querySelector('#user-input');
const chatBox = document.querySelector('#chat-box');

// Function to display a message in the chat box
function displayMessage(message, sender = 'user') {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageContainer.textContent = message;
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto scroll to the bottom
  }
  
  // Handle send button click
  sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
      displayMessage(message, 'user');
      userInput.value = '';  // Clear the input
      simulateBotResponse(message);
    }
  });
  
  // Handle pressing Enter key
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();  // Trigger the button click if Enter is pressed
    }
  });
  
  // Simulate a response from the bot (for now it's static)
  function simulateBotResponse(userMessage) {
    setTimeout(() => {
      const botMessage = `You said: "${userMessage}"`;  // Just an echo for now
      displayMessage(botMessage, 'bot');
    }, 1000);  // Simulate a delay before the bot responds
  }