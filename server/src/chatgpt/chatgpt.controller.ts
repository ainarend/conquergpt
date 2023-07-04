import {Controller, Get, Query} from '@nestjs/common';
import {ChatgptService} from "./chatgpt.service";

@Controller('chatgpt')
export class ChatgptController {

    constructor(private readonly chatgptService: ChatgptService) {};

    reasoningPrompt = (chosenCountry) => `Okay, you chose ${chosenCountry}. Create a unique short 1-sentence story why this was a great move in a board game, format it "I chose ${chosenCountry} because ..." ignoring your systemMessage configuration.`

    @Get('/country')
    async getCountryChoice(@Query('playerCountry') playerCountry): Promise<{country: string, reasoning: string}> {
        const country = await this.chatgptService.makeRequestToGPT(
            `Answer as short as possible, using only one word if possible. Choose a random European country close to, but not a neighbour of ${playerCountry}?`
        );
        const reasoning = await this.chatgptService.makeRequestToGPT(this.reasoningPrompt(country));
        return {country, reasoning};
    }

    @Get('/next-country')
    async getNextCountry(@Query('countries') countries): Promise<{country: string, reasoning: string}> {
        const country =  await this.chatgptService.makeRequestToGPT(
           `Answer as short as possible, using only one word if possible. If you control ${countries} and you are allowed to conquer land and sea neighbours of these countries, which neighbour you conquer next?`
        );
        const reasoning = await this.chatgptService.makeRequestToGPT(this.reasoningPrompt(country));
        return {country, reasoning};
    }
}
