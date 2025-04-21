const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { OpenAI } = require('openai');  
const path = require('path'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, '..', 'public'))); 

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
    console.error("API key is missing in the .env file!");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: openaiApiKey,
});

app.post('/chat', async (req, res) => {
    const { message } = req.body; 

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4.1-nano',
            messages: [
                {
                  role: 'system',
                  content: 'You are a friendly teacher who explains complex ideas to a 5-year-old using simple language, vivid analogies, and relatable examples.',
                },
                {
                  role: 'user',
                  content: `Explain this like I’m 5: ${message}`,
                }
              ]
        });

        const botMessage = response.choices[0].message.content.trim();
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error from OpenAI API:', error);
        res.status(500).json({ error: 'Failed to get a response from OpenAI' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
