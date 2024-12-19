import axios from 'axios';

// Base URL for Groqu AI API
const apiKey = "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"

const apiClient = axios.create({
    baseURL: 'https://api.groq.com/openai/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
});

// Function to send a message to Groqu AI
const sendMsgToOpenAI = async (message, options = {}) => {
    try {
        const response = await apiClient.post('/chat/completions', {
            model: 'llama3-8b-8192',
            messages: [{ role: 'user', content: message }],
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
            ...options
        });
        // const cleanData = response.data.choices[0].message.content.split("```");

        // const getD = cleanData.map((value) => {
        //     const codePattern = /\b(import|export|function|const|let|var|class|return|for|while|if|else|try|catch|switch|case|new|extends|super|this|=>|async|await)\b\s*[A-Za-z0-9_]+\s*(=\s*|[(\[{])|\b[A-Za-z0-9_]+\s*\([^)]*\)\s*\{|\{|\}|\[|\]|\bconsole\.log\b|\bfetch\b|[A-Za-z0-9_]+\s*=\s*[A-Za-z0-9_]+|\d+/;
        //     if (codePattern.test(value)) {
        //         console.log("Code: ", value);
        //     }
        //     if (!codePattern.test(value)) {
        //         console.log("Explanation: ", value)
        //     }
        // });

        // console.log(cleanData);
        return response.data.choices[0].message.content.split("```");
    } catch (error) {
        console.error('Error fetching data from Groqu AI:', error);
    }
};

export default sendMsgToOpenAI;