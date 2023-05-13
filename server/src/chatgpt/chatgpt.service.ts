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
            systemMessage: 'You are a player in a board game. Answer as short as possible, using only one word if possible.',
        });
    }

    async makeRequestToGPT(prompt: string): Promise<string> {
        const res = await this.api.sendMessage(prompt)
        console.log(res.text)
        return res.text;
    }

}
