export interface Country {
    readonly name: string;
    readonly army: Army;
    readonly isBaseCountry: boolean;
}

export enum Army {
    army1 = 'Army1',
    army2 = 'Army2',
    army3 = 'Army3',
    army4 = 'Army4',
    army5 = 'Army5',
}