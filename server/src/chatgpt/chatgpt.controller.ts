import {Controller, Get, Query} from '@nestjs/common';
import {ChatgptService} from "./chatgpt.service";

@Controller('chatgpt')
export class ChatgptController {

    constructor(private readonly chatgptService: ChatgptService) {};

    @Get('/country')
    async getCountryChoice(@Query('playerCountry') playerCountry): Promise<string> {
       return await this.chatgptService.makeRequestToGPT(`Choose a random European country close to, but not a neighbour of ${playerCountry}??`);
    }
}
