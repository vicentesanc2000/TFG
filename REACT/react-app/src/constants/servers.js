const serverList = []

export const euw = {
    id: 'europe',
    key: 'euw1'
}
serverList.push(euw)

export const eun = {
    id: 'europe',
    key: 'eun1'
}
serverList.push(eun)

export const na = {
    id: 'americas',
    key: 'na1'
}
serverList.push(na)

export const la1 = {
    id: 'americas',
    key: 'la1'
}
serverList.push(la1)

export const la2 = {
    id: 'americas',
    key: 'la2'
}
serverList.push(la2)

export const kr = {
    id: 'asia',
    key: 'kr'
}
serverList.push(kr)

export const jp = {
    id: 'asia',
    key: 'jp1'
}
serverList.push(jp)

export const br = {
    id: 'americas',
    key: 'br1'
}
serverList.push(br)

export const ru = {
    id: 'asia',
    key: 'ru'
}
serverList.push(eun)

export const oc = {
    id: 'sea',
    key: 'oc1'
}
serverList.push(oc)

const servers = new Map();
serverList.map(server => servers.set(server.key, server.id))

export default function getRegionByServer( key ){
    return servers.get(key);
};