import RiotApiConstants from '../constants/riotApiConstants';

function getRecentGamesUrl(summonerId) {
    return buildApiUrl(`api/lol/LAN/v1.3/game/by-summoner/${summonerId}/recent`);
}

function getSummonerDataUrl(summonerName) {
    return buildApiUrl(`api/lol/LAN/v1.4/summoner/by-name/${summonerName}`);
}

function getChampionDataUrl(championId){
    return buildApiUrl(`api/lol/static-data/LAN/v1.2/champion/${championId}`);
}

function buildApiUrl(apiUrl) {
    return `${RiotApiConstants.RIOT_LAN_ENDPOINT}/${apiUrl}?api_key=${RiotApiConstants.API_KEY}`;
}

module.exports = {
    getSummonerDataUrl,
    getRecentGamesUrl,
    getChampionDataUrl
}
