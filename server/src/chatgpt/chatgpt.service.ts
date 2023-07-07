import {Injectable, Logger} from '@nestjs/common';

export const importDynamic = new Function('modulePath', 'return import(modulePath)');

@Injectable()
export class ChatgptService {

    api;
    private readonly logger = new Logger(ChatgptService.name);

    async onModuleInit() {
        const { ChatGPTAPI } = await importDynamic('chatgpt');
        this.api = new ChatGPTAPI({
            apiKey: process.env.OPENAI_API_KEY,
            systemMessage: 'You are a player in a board game. Your goal is to conquer the countries of your opponent.',
        });
    }

    async makeRequestToGPT(prompt: string): Promise<string | Error> {
        try {
            const res = await this.api.sendMessage(prompt)
            this.logger.log(res.text)
            return res.text.replace('.', '');
        } catch (error) {
            if (error.type === 'server_error') {
                return new Error('Unable to connect to GPT server. Model overloaded');
            }
            this.logger.error(`Request to GPT error: ${error}`);
        }
    }

}
