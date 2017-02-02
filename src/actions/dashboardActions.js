//@Services
import ApiBuilder from '../services/apiBuilder';
import RiotApi from '../services/riotApi';
//@Libs
import Axios from 'axios';
import _find from 'lodash/find';
import _add from 'lodash/add';
import _divide from 'lodash/divide';
import _floor from 'lodash/floor';
import _round from 'lodash/round';

function updateSummonerInfo(summonerName, responseHandler, errorHandler) {
    getUserInfo(summonerName)
            .then(getGameInfo)
            .then(getChampionInfo)
            .then(responseHandler)
            .catch(errorHandler);
}

function getUserInfo(username) {

    const apiUrl = ApiBuilder.getSummonerDataUrl(username);
    
    return RiotApi.get(apiUrl, {}, 
            function (response) {
            
                const userRemoteData = response.data[username];
                
                const userData = {userId: userRemoteData.id,
                                username: userRemoteData.name, 
                                level: userRemoteData.summonerLevel, 
                                revisionDate: new Date(userRemoteData.revisionDate).toDateString()};

                return userData;
            }, 
    () => alert('Username not found'));
}

function getGameInfo(userInfo) {      
        
    const apiUrl = ApiBuilder.getRecentGamesUrl(userInfo.userId);

    return RiotApi.get(apiUrl, {}, function(response){

        const games = response.data.games;
        
        let gameCards = games.map((game) => {

            const localGameDate = new Date(game.createDate);

            const minutesPlayed = _round(_divide(game.stats.timePlayed, 60));
            const secondsPlayed = game.stats.timePlayed % 60;

            const kda = _floor(_divide(_add(game.stats.championsKilled, game.stats.assists), game.stats.numDeaths), 2);
            const creepScore = _add(game.stats.minionsKilled, game.stats.neutralMinionsKilled);

            return {
                result: game.stats.win === true ? "Win" : "Defeat",
                timeSpent: `${minutesPlayed}m ${secondsPlayed}s`,
                gameDate: `${localGameDate.toLocaleDateString()} ${localGameDate.toLocaleTimeString()}`,
                kda: kda,
                cs:  creepScore,
                gold: game.stats.goldEarned,
                champId: game.championId
            };
        });

        return { userData: userInfo, gameCards };
    });
}

function getChampionInfo(gameInfo){

    const gameCards = gameInfo.gameCards;
    
    let axiosRequests = gameCards.map((gameCard) => {
        const apiUrl = ApiBuilder.getChampionDataUrl(gameCard.champId);
        return Axios.get(apiUrl);
    });

    return Axios.all(axiosRequests)
        .then(function (axiosResponses) {

            let gameCardsWithChamp = gameCards.map((gameCard) =>{
                let champData = _find(axiosResponses, function(response) { return response.data.id === gameCard.champId });
                
                let foundChamp = {champ: champData.data.key};
                return Object.assign({}, gameCard, foundChamp);                    
            });
            
            return Object.assign({}, gameInfo, {gameCards: gameCardsWithChamp});
        
        })
        .catch(function(error){ console.log(error) });
}

module.exports = {
    updateSummonerInfo
}