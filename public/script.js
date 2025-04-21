const sendBtn = document.querySelector('#send-btn');
const userInput = document.querySelector('#user-input');
const chatBox = document.querySelector('#chat-box');
const typingIndicator = document.querySelector('#typing-indicator');

function displayMessage(message, sender = 'user') {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageContainer.textContent = message;
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
        displayMessage(message, 'user');
        userInput.value = '';

        typingIndicator.style.display = 'flex';
        chatBox.scrollTop = chatBox.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 300));

        const botMessage = await getBotReply(message);
        
        typingIndicator.style.display = 'none';

        displayMessage(botMessage, 'bot');
    }
});


userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

async function getBotReply(message) {
    const endpoint = 'http://localhost:5000/chat';

    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        message: message,
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data.message || 'Sorry, something went wrong!';
    } catch (err) {
        console.error(err);
        return 'Sorry, something went wrong!';
    }
}