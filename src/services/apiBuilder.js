import RiotApiConstants from '../constants/riotApiConstants';

function getSummonerDataUrl(summonerName) {
    return buildApiUrl(`api/lol/LAN/v1.4/summoner/by-name/${summonerName}`)
}

function buildApiUrl(apiUrl) {
    return `${RiotApiConstants.RIOT_LAN_ENDPOINT}/${apiUrl}?api_key=${RiotApiConstants.API_KEY}`;
}

module.exports = {
    getSummonerDataUrl
}
