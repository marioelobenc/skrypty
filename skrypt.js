const apiKey = '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'; // Wstaw swój klucz API

async function sendMessage() {
    const input = document.getElementById('userInput');
    const chat = document.getElementById('chat');

    const userMessage = input.value;
    if (!userMessage) return;

    // Wyświetl wiadomość użytkownika
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.textContent = `Twoje zapytanie: ${userMessage}`;
    chat.appendChild(userDiv);

    input.value = ''; // Wyczyść pole tekstowe

    // Wyślij zapytanie do API OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${apiKey}'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }]
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Wyświetl wiadomość bota
    const botDiv = document.createElement('div');
    botDiv.className = 'message bot';
    botDiv.textContent = `Bot: ${botMessage}`;
    chat.appendChild(botDiv);

    // Przewiń na dół
    chat.scrollTop = chat.scrollHeight;
}