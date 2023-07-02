import {defineStore} from "pinia";
import {usePlayerStore} from "@/store/player";
import {usePlayerChatGPTStore} from "@/store/playerChatGPT";
import {Country} from "@/types/country";

export enum BattleResult {
    'won' = 'won',
    'lost' = 'lost',
}

export const useBattleStore = defineStore('battle', {
    state: () => ({
        isOnGoing: false,
        aggressor: null as ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
        defender: null as ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
        battlingForCountry: null as Country["name"] | null,
    }),
    actions: {
        async letsBattle(
            aggressor: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            defender: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            battlingForCountry: Country["name"],
        ): Promise<BattleResult> {
            console.log('battle for country', battlingForCountry);
            this.setupBattle(aggressor, defender, battlingForCountry);

            return BattleResult.lost;
        },
        setupBattle(
            aggressor: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            defender: ReturnType<typeof usePlayerStore> | ReturnType<typeof usePlayerChatGPTStore> | null,
            battlingForCountry: Country["name"] | null,
        ): void {
            this.isOnGoing = battlingForCountry ? true : false;
            this.aggressor = aggressor;
            this.defender = defender;
            this.battlingForCountry = battlingForCountry;
        },
    }
})