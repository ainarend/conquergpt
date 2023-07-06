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

    async makeRequestToGPT(prompt: string): Promise<string> {
        try {
            const res = await this.api.sendMessage(prompt)
            this.logger.log(res.text)
            return res.text.replace('.', '');
        } catch (error) {
            this.logger.error(`Request to GPT error: ${error}`);
        }
    }

}
