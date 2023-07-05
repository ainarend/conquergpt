import {defineStore} from "pinia";
import {usePlayerStore} from "@/store/player";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";
import {Country} from "@/types/country";
import {PlayerColors, WhoseTurn} from "@/store/game";
import DiceBox from "@3d-dice/dice-box";

export enum BattleResult {
    'won' = 'won',
    'lost' = 'lost',
}

export interface Battle {
    forCountry: Country["name"],
    result: BattleResult,
    diceResults: {
        attacker: number,
        defender: number,
    },
}

let Box;

export const useBattleStore = defineStore('battle', {
    state: () => ({
        isOnGoing: false,
        readyToRollDice: false,
        aggressorStore: null as ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
        defenderStore: null as ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
        attacker: null as WhoseTurn.player | WhoseTurn.chatGPT | null,
        defender: null as WhoseTurn.player | WhoseTurn.chatGPT | null,
        battlingForCountry: null as Country | null,
        attackingFromCountry: null as Country | null,
        resultPromise: null as Promise<Battle> | null,
    }),
    actions: {
        async letsBattle(
            aggressor: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            defender: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            battlingForCountry: Country,
            attackingFromCountry: Country,
        ): Promise<Battle> {
            console.log('battle for country', battlingForCountry);
            this.initBattle(aggressor, defender, battlingForCountry, attackingFromCountry);

            return await this.getDiceRollResult();
        },
        initBattle(
            aggressor: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            defender: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            battlingForCountry: Country | null,
            attackingFromCountry: Country | null
        ): void {
            this.isOnGoing = battlingForCountry ? true : false;
            this.aggressorStore = aggressor;
            this.attacker = aggressor ? (aggressor.$id === 'player' ? WhoseTurn.player : WhoseTurn.chatGPT) : null
            this.defenderStore = defender;
            this.defender = defender ? (defender.$id === 'player' ? WhoseTurn.player : WhoseTurn.chatGPT) : null
            this.battlingForCountry = battlingForCountry;
            this.attackingFromCountry = attackingFromCountry;
            this.readyToRollDice = battlingForCountry ? true : false;
        },
        setReadyToRollDice(): void {
            this.readyToRollDice = true;
        },
        async rollDice(): void {
            if (!this.readyToRollDice) {
                return;
            }

            if (!Box) {
                Box = new DiceBox("#dice-box", {
                    assetPath: "/assets/",
                    theme: "default",
                    offscreen: true,
                    scale: 6
                });

                await Box.init();
            }
            Box.roll([
                {
                    sides: 6,
                    themeColor: PlayerColors[this.attacker],
                    qty: 2,
                },{
                    sides: 6,
                    themeColor: PlayerColors[this.defender],
                    qty: 1,
                }
            ]);

            Box.onRollComplete = (results) => {''
                const attackerRolls = results[0].rolls;
                const attackerResult =
                    attackerRolls[0].value > attackerRolls[1].value
                        ? attackerRolls[0].value
                        : attackerRolls[1].value;

                const defenderRolls = results[1].rolls;
                const defenderResult = defenderRolls[0].value;

                const battle: Battle = {
                    forCountry: this.battlingForCountry.name,
                    result: attackerResult > defenderResult ? BattleResult.won : BattleResult.lost,
                    diceResults: {
                        attacker: attackerResult,
                        defender: defenderResult,
                    }
                };

                this.resultPromise(battle);

                this.initBattle(null, null, null, null);
                Box.clear();
            }
        },
        getDiceRollResult(): Promise<Battle> {
            return new Promise((resolve) => {
                this.resultPromise = resolve;
            });
        }
    }
})