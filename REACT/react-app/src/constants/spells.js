const spellList = []

export const barrier = {
    id:'SummonerBarrier',
    key: 21
}
spellList.push(barrier)

export const cleanse = {
    id:'SummonerBoost',
    key: 1
}
spellList.push(cleanse)

export const ignite = {
    id:'SummonerDot',
    key: 14
}
spellList.push(ignite)

export const exhaust = {
    id:'SummonerExhaust',
    key:3
}
spellList.push(exhaust)

export const flash = {
    id:'SummonerFlash',
    key: 4
}
spellList.push(flash)

export const ghost = {
    id:'SummonerHaste',
    key: 6
}
spellList.push(ghost)

export const heal = {
    id:'SummonerHeal',
    key: 7
}
spellList.push(heal)

export const clarity = {
    id:'SummonerMana',
    key: 13
}
spellList.push(clarity)

export const snowball = {
    id:'SummonerSnowball',
    key: 32
}
spellList.push(snowball)

export const teleport = {
    id:'SummonerTeleport',
    key: 12
}
spellList.push(teleport)

export const poroRecall = {
    id:'SummonerPoroRecall',
    key: 30
}
spellList.push(poroRecall)

export const poroThrow = {
    id:'SummonerPoroThrow',
    key: 31
}
spellList.push(poroThrow)

export const urfSnowball = {
    id:'SummonerSnowURFSnowball_Mark',
    key: 39
}
spellList.push(urfSnowball)

export const spellBook = {
    id:'Summoner_UltBookPlaceholder',
    key: 54
}
spellList.push(spellBook)

export const spellBookSmite = {
    id:'Summoner_UltBookSmitePlaceholder',
    key: 55
}
spellList.push(spellBookSmite)

export const smite = {
    id:'SummonerSmite',
    key: 11
}
spellList.push(smite)

const spells = new Map();
spellList.map(spell => spells.set(spell.key, spell.id))

export default function getSpellNameById( key ){
    return spells.get(key);
};