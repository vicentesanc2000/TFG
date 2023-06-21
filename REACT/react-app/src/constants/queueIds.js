const queuesList = []

export const soloq = {
    id:'Ranked Solo 5v5',
    key: 420
}
queuesList.push(soloq)

export const flexq = {
    id:'Ranked Flex 5v5',
    key: 440
}
queuesList.push(flexq)

export const normalDraft = {
    id:'Normal Draft Pick 5v5',
    key: 400
}
queuesList.push(normalDraft)

export const normalBlind = {
    id:'Normal Blind Pick 5v5',
    key: 430
}
queuesList.push(normalBlind)

export const aram = {
    id:'ARAM',
    key: 450
}
queuesList.push(aram)

export const bosque = {
    id:'Twisted Treeline',
    key: 460
}
queuesList.push(bosque)

export const clash = {
    id:'Clash Game',
    key: 700
}
queuesList.push(clash)

export const aramClash = {
    id:'ARAM Clash Game',
    key: 720
}
queuesList.push(aramClash)

export const arurf = {
    id:'ARURF',
    key: 900
}
queuesList.push(arurf)

export const snowArurf = {
    id:'ARURF',
    key: 1010
}
queuesList.push(snowArurf)

export const oneForAll = {
    id:'One foe All',
    key: 1020
}
queuesList.push(oneForAll)

export const spellBook = {
    id:'Ultimate Spellbook',
    key: 1400
}
queuesList.push(spellBook)

export const pickURF = {
    id:'Pick URF',
    key: 1900
}
queuesList.push(pickURF)

export const poro = {
    id:'Legend of the Poro King',
    key: 920
}
queuesList.push(poro)

const queues = new Map();
queuesList.map(queue => queues.set(queue.key, queue.id))

export default function getQueueById( key ) {
    return queues.get(key);
}