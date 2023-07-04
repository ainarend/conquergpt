import {defineStore} from "pinia";
import {usePlayerStore} from "@/store/player";
import {useMapStore} from "@/store/map";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";
import {Army, Country} from "@/types/country";
import {BattleResult, useBattleStore} from "@/store/battle";
import {randomNumberFromARande} from "@/utils";

export enum GameStatuses {
    'initializing' = 'initializing',
    'choosingCountries' = 'choosingCountries',
    'updatingLog' = 'updatingLog',
    'playing' = 'playing',
    'batteling' = 'batteling',
    'gameWon' = 'gameWon',
    'gameLost' = 'gameLost',
}

export enum WhoseTurn {
    'undefined' = 'undefined',
    'moderator' = 'moderator',
    'player' = 'player',
    'chatGPT' = 'chatGPT',
}

export enum PlayerColors {
    'undefined' = 'undefined',
    'moderator' = '#FA6B06FF',
    'player' = '#0b702b',
    'chatGPT' = '#e00140',
}

export interface GameMessage {
    readonly userName: WhoseTurn;
    readonly color: string;
    readonly message: string;
    finishedAnimating?: boolean;
}


export const useGameStore = defineStore('game', {
    state: () => ({
        status: GameStatuses.initializing as GameStatuses,
        turn: WhoseTurn.undefined as WhoseTurn,
        turnNumber: 0,
        playerMe: null as ReturnType<typeof usePlayerStore> | null,
        playerChatGpt: null as ReturnType<typeof usePlayerChatGPTStore> | null,
        messages: [] as GameMessage[],
        messageAnimationPromises: [] as any[],
    }),
    getters: {
        isLoading(): boolean {
            return [GameStatuses.initializing, GameStatuses.updatingLog].includes(this.status);
        },
    },
    actions: {
        async delay(ms: number) {
            // return new Promise(resolve => setTimeout(resolve, ms));
        },
        setStatus(status: GameStatuses) {
            this.status = status;
        },
        setTurn(turn: WhoseTurn) {
            this.turn = turn;
        },
        async changeTurnBetweenPlayers() {
            const randomMessages = [
                'Your turn, ',
                'Make some magic, ',
                'What will you do now, ',
                'Whoa, what now, ',
                'Lets make some moves, ',
                'Great! Now its your turn, ',
                'Any ideas whats next, ',
                'Your move, ',
                'Take your turn, ',
                'Proceed, ',
                'It is your go, ',
                'Your round, ',
                'Play, ',
                'Go ahead, ',
                'Your action, ',
                'Time to play, ',
                'The spotlight is on you, ',
            ];
            const message = randomMessages[randomNumberFromARande(0, randomMessages.length - 1)];
            if (this.turn === WhoseTurn.player) {
                this.setTurn(WhoseTurn.chatGPT);
                await this.addMessage(
                    {
                        userName: WhoseTurn.moderator,
                        color: PlayerColors[WhoseTurn.moderator] as string,
                        message: message + 'chatGPT',
                    }
                );
                this.setStatus(GameStatuses.playing);
                return;
            }
            this.turnNumber++;
            this.setTurn(WhoseTurn.player);
            await this.addMessage(
                {
                    userName: WhoseTurn.moderator,
                    color: PlayerColors[WhoseTurn.moderator] as string,
                    message: message + 'player',
                }
            );
            this.setStatus(GameStatuses.playing);
        },
        addMessage(message: GameMessage) {
            if (!Object.hasOwn( message, 'finishedAnimating')) {
                message.finishedAnimating = false;
            }
            this.messages.push(message);
            this.setStatus(GameStatuses.updatingLog);
            return new Promise((resolve) => {
                this.messageAnimationPromises[this.messages.length - 1] = resolve;
            });
        },
        async setMessageAnimated(messageIndex: number) {
            if (this.messages[messageIndex].finishedAnimating) {
                return;
            }
            this.messages[messageIndex].finishedAnimating = true;
            await this.delay(300);
            this.messageAnimationPromises[messageIndex]();
        },
        setupGame(payload: {mapData: { map: any, api: any }}) {
            const mapStore = useMapStore();
            mapStore.init(payload.mapData);

            this.initializePlayers();

            this.startChoosingCountries();
        },
        initializePlayers() {
            this.playerMe = usePlayerStore();
            this.playerChatGpt = usePlayerChatGPTStore();
        },
        async startChoosingCountries() {
            this.setTurn(WhoseTurn.moderator);

            await this.addMessage(
                {
                    userName: this.turn,
                    color: PlayerColors[this.turn] as string,
                    message: 'Welcome, setting up the game',
                }
            );
            await this.addMessage(
                {
                    userName: this.turn,
                    color: PlayerColors[this.turn] as string,
                    message: `Let's start by choosing countries. Click on the map to choose your Base country.`,
                }
            );
            this.setStatus(GameStatuses.choosingCountries);
            this.setTurn(WhoseTurn.player);
        },
        async clickedOnCountry(countryName: string) {
            if (this.isLoading || this.turn !== WhoseTurn.player) {
                return;
            }
            if (this.status === GameStatuses.choosingCountries) {
                return await this.playerMe.chooseBaseCountry(countryName);
            }

            return await this.playerMe.clickedOnCountry(countryName);
        },
        async playerHasChosenBaseCountry() {
            await this.delay(1000);
            this.setTurn(WhoseTurn.moderator);
            await this.addMessage({
                userName: this.turn,
                color: PlayerColors[this.turn],
                message: `Great, asking ChatGPT to choose it's Base country...`,
            });
            this.setStatus(GameStatuses.choosingCountries);
            this.setTurn(WhoseTurn.chatGPT);
            await this.delay(400);
            await this.playerChatGpt.chooseBaseCountry();
        },
        async playerHasChosenACountry() {
            await this.delay(1000);
            this.setTurn(WhoseTurn.moderator);
            await this.addMessage({
                userName: this.turn,
                color: PlayerColors[this.turn],
                message: `Great, asking ChatGPT to make it's move...`,
            });
            this.setStatus(GameStatuses.playing);
            this.setTurn(WhoseTurn.chatGPT);
            await this.delay(400);
            await this.playerChatGpt.chooseNextCountry();
        },
        async startGame() {
            this.setStatus(GameStatuses.playing);
            this.setTurn(WhoseTurn.moderator);
            await this.addMessage({
                userName: this.turn,
                color: PlayerColors[this.turn],
                message: `Okay, lets start the game!`,
            });

            this.turnNumber++;

            const mapStore = useMapStore();
            mapStore.moveMapToCountry(this.playerMe.baseCountry.name);

            await this.addMessage({
                userName: this.turn,
                color: PlayerColors[this.turn],
                message:
                    `Okay, player, now it's your turn for turn ${this.turnNumber}. What is your next move?`,
            });

            this.setTurn(WhoseTurn.player);
            this.setStatus(GameStatuses.playing);
        },
        chooseRandomArmyComponent(): Army {
            const armies = Object.values(Army);
            const index = randomNumberFromARande(0, armies.length - 1);
            return armies[index];
        },
        willNeedToBattleForCountry(countryName: string): boolean {
            console.log('willNeedToBattleForCountry')
            const whoseTurn = this.turn;
            const checkIfPlayerCountry = (playerCountry: Country) => playerCountry.name === countryName;
            if (whoseTurn === WhoseTurn.player) {
                console.log('willNeedToBattleForCountry players turn')
                const chatGPTCountries = this.playerChatGpt.countries;
                if (chatGPTCountries.find(checkIfPlayerCountry)) {
                    console.log('willNeedToBattleForCountry player ', true)
                    return true;
                }
            } else {
                console.log('willNeedToBattleForCountry gpt turn')
                const playerCountries = this.playerMe.countries;
                if (playerCountries.find(checkIfPlayerCountry)) {
                    console.log('willNeedToBattleForCountry gpt ', true)
                    return true;
                }
            }
            console.log('willNeedToBattleForCountry  ', false)
            return false;
        },
        async battleForCountry(countryName: string): Promise<BattleResult> {
            console.log('battleForCountry ')
            const battleStore = useBattleStore();
            if (this.turn === WhoseTurn.player) {
                return await battleStore.letsBattle(this.playerMe, this.playerChatGpt, countryName);
            }
            return await battleStore.letsBattle(this.playerChatGpt, this.playerMe, countryName);
        }
    },
})