import {Controller, Get, Query} from '@nestjs/common';
import {ChatgptService} from "./chatgpt.service";

@Controller('chatgpt')
export class ChatgptController {

    constructor(private readonly chatgptService: ChatgptService) {};

    reasoningPrompt = (chosenCountry) => `Okay, you chose ${chosenCountry}. Create a fun & spicy short 1-sentence story why this was a great move in a board game, format it "I chose ${chosenCountry} because ..." ignoring your systemMessage configuration.`

    @Get('/country')
    async getCountryChoice(@Query('playerCountry') playerCountry): Promise<{country: string, reasoning: string}> {
        const country = await this.chatgptService.makeRequestToGPT(
            `Answer as short as possible, using only one word if possible. Choose a random European country close to, but not a neighbour of ${playerCountry}?`
        );
        const reasoning = await this.chatgptService.makeRequestToGPT(this.reasoningPrompt(country));
        return {country, reasoning};
    }

    @Get('/next-country')
    async getNextCountry(
        @Query('countries') gptCountries,
        @Query('opponentCountries') opponentCountries,
    ): Promise<{country: string, reasoning: string}> {
        const country =  await this.chatgptService.makeRequestToGPT(
           `Answer as short as possible, using only one word if possible. You are allowed to conquer land and sea neighbours of your countries.You control ${gptCountries} and your opponent controls ${opponentCountries}, which neighbour of your countries you conquer next?`
        );
        const reasoning = await this.chatgptService.makeRequestToGPT(this.reasoningPrompt(country));
        return {country, reasoning};
    }

    @Get('/confirm-battle')
    async confirmBattle(
        @Query('country') country,
        @Query('countriesLeft') countriesLeft,
    ): Promise<{confirm: boolean, reasoning: string}> {
        const confirm =  await this.chatgptService.makeRequestToGPT(
           `Okay, your opponent has ${countriesLeft} countries left. Are you sure you want to attack. Yes or No?`
        );
        if (confirm === 'No.') {
            const reasoning = await this.chatgptService.makeRequestToGPT(
                `Okay, you chose to attack ${country}, but with your opponent having ${country} countries left, you chose not to. Create a fun & a bit mocking short 1-sentence story why you chose not to attack, format it "I thought about to attacking ${country}, but..." ignoring your systemMessage configuration.`
            );
            return {confirm: false, reasoning: reasoning};
        }
        const reasoning = await this.chatgptService.makeRequestToGPT(
            `Okay, you chose to attack ${country}, your opponent has ${country} countries left. Create a fun & saucy short 1-sentence story why this was a great move in a board game, format it "I chose to attack ${country} because ..." ignoring your systemMessage configuration.`
        );
        return {confirm: true, reasoning};
    }

    @Get('/comment-on-battle')
    async commentOnBattle(
        @Query('country') country,
        @Query('battleResult') battleResult,
        @Query('attackReasoning') attackReasoning,
    ): Promise<{comment: string}> {
        const battleReason = decodeURI(attackReasoning);
        if (battleReason.split(' ').includes('player')) {
            const comment =  await this.chatgptService.makeRequestToGPT(
                `Your opponent chose to attack ${country} with all it's might. You ${battleResult} the battle. Create a funny short 1-sentence comment on the result`
            );
            return {comment};
        }
        const comment =  await this.chatgptService.makeRequestToGPT(
            `You chose to attack ${country} with reasoning ${decodeURI(attackReasoning)}. You ${battleResult} the battle. Create a fun short 1-sentence comment on the result based on the reasoning`
        );
        return {comment};
    }

    @Get('/comment-on-game')
    async commentOnGame(
        @Query('result') result,
    ): Promise<{message: string}> {
        if (result === 'lost') {
            const message =  await this.chatgptService.makeRequestToGPT(
            `You lost the game. Create a unique & fun short 1-sentence recap comment on the result`
            );
            return {message};
        }
        const message =  await this.chatgptService.makeRequestToGPT(
            `You won the game. Create a unique & fun short 1-sentence recap comment on the result`
        );
        return {message};
    }
}
