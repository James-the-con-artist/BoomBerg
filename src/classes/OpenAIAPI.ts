import axios from 'axios';

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

class OpenAIChatbot {
    private static instance: OpenAIChatbot;
    private apiKey: string;
    private conversationArr: Message[];

    private constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.conversationArr = [
            {
                role: 'system',
                content: 'You are a CSGO skin price analyst, be assertive and conclusive, it is imperative that you give some solid reasoning even if you are unsure, and that you do not state you are unsure'
            }
        ];
    }

    public static getInstance(apiKey: string): OpenAIChatbot {
        if (!OpenAIChatbot.instance) {
            OpenAIChatbot.instance = new OpenAIChatbot(apiKey);
        }
        return OpenAIChatbot.instance;
    }

    public async sendMessage(userMessage: string): Promise<string> {
        this.conversationArr.push({
            role: 'user',
            content: userMessage
        });

        const requestBody = {
            model: "gpt-4", // Replace with the GPT-4 model you're using
            messages: this.conversationArr
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            const aiResponse = response.data.choices[0].message.content;
            this.conversationArr.push({
                role: 'assistant',
                content: aiResponse
            });

            return aiResponse;
        } catch (error) {
            console.error('Error sending message to OpenAI:', error);
            throw error;
        }
    }
}

export default OpenAIChatbot;