const RIOT_LAN_ENDPOINT = "https://lan.api.pvp.net";
const API_KEY = "21682440-4d87-4971-bc31-478519c61a20";

function getSummonerDataUrl(summonerName) {
    return buildApiUrl(`/api/lol/LAN/v1.4/summoner/by-name/${summonerName}`)
}

function buildApiUrl(apiUrl) {
    return `${RIOT_LAN_ENDPOINT}/${apiUrl}?api_key=${API_KEY}`;
}

module.exports = {
    getSummonerDataUrl
}
