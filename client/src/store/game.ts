import {defineStore} from "pinia";
import {usePlayerStore} from "@/store/player";
import {useMapStore} from "@/store/map";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";
import {Army, Country} from "@/types/country";
import {Battle, useBattleStore} from "@/store/battle";
import {randomNumberFromARande} from "@/utils";
import {findFirstNeighbour} from "@/country-neighbours";

export enum GameStatuses {
    'initializing' = 'initializing',
    'choosingCountries' = 'choosingCountries',
    'updatingLog' = 'updatingLog',
    'playing' = 'playing',
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
        autoConfirmBattle: false,
        allowGptToCheat: null,
    }),
    getters: {
        isLoading(): boolean {
            return [GameStatuses.initializing, GameStatuses.updatingLog].includes(this.status);
        },
        isGameWon(): boolean {
            return this.status === GameStatuses.gameWon;
        },
        isGameLost(): boolean {
            return this.status === GameStatuses.gameLost;
        },
    },
    actions: {
        setAllowGptToCheat(payload: boolean) {
            this.allowGptToCheat = payload;
        },
        async delay(ms: number) {
            // return new Promise(resolve => setTimeout(resolve, ms));
        },
        restart () {
            // Simple hack to restart the game.
            location.reload();
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
            const mapStore = useMapStore();
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
                mapStore.moveMapToCountry(this.playerChatGpt.baseCountry.name);
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
            mapStore.moveMapToCountry(this.playerMe.baseCountry.name);
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
                message: `Awesome, lets start the game!`,
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
            const whoseTurn = this.turn;
            const checkIfPlayerCountry = (playerCountry: Country) => playerCountry.name === countryName;

            if (whoseTurn === WhoseTurn.player) {
                const chatGPTCountries = this.playerChatGpt.countries;

                if (chatGPTCountries.find(checkIfPlayerCountry)) {
                    return true;
                }
            } else {
                const playerCountries = this.playerMe.countries;
                if (playerCountries.find(checkIfPlayerCountry)) {
                    return true;
                }
            }
            return false;
        },
        async battleForCountry(countryName: string): Promise<Battle> {
            const battleStore = useBattleStore();
            if (this.turn === WhoseTurn.player) {
                const closestAttackNeighbour = findFirstNeighbour(countryName, this.playerMe.countries.map(c => c.name));
                const attackingFromCountry = this.playerMe.countries.find(c => c.name === closestAttackNeighbour);
                const battlingForCountry = this.playerChatGpt.countries.find(c => c.name === countryName);

                return await battleStore.letsBattle(this.playerMe, this.playerChatGpt, battlingForCountry, attackingFromCountry);
            }
            const closestAttackNeighbour = findFirstNeighbour(countryName, this.playerChatGpt.countries.map(c => c.name));
            const attackingFromCountry = this.playerChatGpt.countries.find(c => c.name === closestAttackNeighbour);
            const battlingForCountry = this.playerMe.countries.find(c => c.name === countryName);

            return await battleStore.letsBattle(this.playerChatGpt, this.playerMe, battlingForCountry, attackingFromCountry);
        },
        async battleLost(battle: Battle, gptComment: string) {
            let message = '';
            if (this.turn === WhoseTurn.player) {
                message = `Well-well, GPT's best roll was ${battle.diceResults.defender} and yours was ${battle.diceResults.attacker}. You lost the battle for ${battle.forCountry}.`;
            } else {
                message = `So, player's best roll was ${battle.diceResults.defender} and GPT's was ${battle.diceResults.attacker}. GPT lost the battle for ${battle.forCountry}.`;
            }
            // Moderator telling about the loss of the battle.
            await this.addMessage({
                userName: WhoseTurn.moderator,
                color: PlayerColors[WhoseTurn.moderator],
                message,
            });
            // Gpt commenting on the result of the battle.
            await this.addMessage({
                userName: WhoseTurn.chatGPT,
                color: PlayerColors[WhoseTurn.chatGPT],
                message: gptComment,
            });

            await this.changeTurnBetweenPlayers();
            if (this.turn === WhoseTurn.chatGPT) {
                await this.playerChatGpt.chooseNextCountry();
            }
        },
        setGameOver() {
            if (this.turn === WhoseTurn.player) {
                return this.setStatus(GameStatuses.gameWon);
            }
            return this.setStatus(GameStatuses.gameLost);
        }
    },
})