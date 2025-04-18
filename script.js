const sendBtn = document.querySelector('#send-btn');
const userInput = document.querySelector('#user-input');
const chatBox = document.querySelector('#chat-box');

function displayMessage(message, sender = 'user') {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageContainer.textContent = message;
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const message = userInput.ariaValueMax.trim();
    if (message) {
        displayMessage(message, 'user');
        userInputvalue = ''
        simulateBotResponse(message);
    }
});