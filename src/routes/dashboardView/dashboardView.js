import React, { Component } from 'react';
//@Components
import UserInfo from '../../components/user-info/user-info';
import Reloader from '../../components/reloader/reloader';
import GameCard from '../../components/gamecard/gamecard';
import Modal from 'react-bootstrap/lib/Modal';
//@Services
import ApiBuilder from '../../services/apiBuilder';
import RiotApi from '../../services/riotApi';
//@Libs
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import _find from 'lodash/find';

class DasboardView extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            userData: { userId: 365375, username: "Alan Zam", level: "23", revisionDate: "Mon 23" },
            gameCards: [{ result: "Win", timeSpent: "27m 22s", gameDate: "Mon 23, 2017", kda: 0.7, cs: 12, gold: 8630, champ: "Diana", champId: 101 },
                        { result: "Defeat", timeSpent: "19m 51s", gameDate: "Mon 24, 2017", kda: 20, cs: 128, gold: 10630, champ: "Orianna", champId: 102 }]
        }

        this.handleClick = this.handleClick.bind(this);
        this.updateStateFromReload = this.updateStateFromReload.bind(this);
    }

    getUserInfo = function() {

        const dashboard = this;
        
        const apiUrl = ApiBuilder.getSummonerDataUrl('zamancer');
        
        RiotApi.get(apiUrl, {}, function (response) {
                
                const userData = {userId: response.data.zamancer.id,
                                  username: response.data.zamancer.name, 
                                  level: response.data.zamancer.summonerLevel, 
                                  revisionDate: new Date(response.data.zamancer.revisionDate).toDateString()};

                dashboard.setState({
                    userData
                });
            });
    }

    updateStateFromReload(gameCards) {
        
        this.setState({
                    gameCards,
                    showModal: false
                });
    }

    handleClick() {
        
        this.setState({
            showModal: true
        });

        this.getGameInfo()
            .then(this.getChampionInfo)
            .then(this.updateStateFromReload)
            .catch();
    }

    getGameInfo() {      
        
        const apiUrl = ApiBuilder.getRecentGamesUrl(this.state.userData.userId);

        return RiotApi.get(apiUrl, {}, function(response){
 
            const games = response.data.games;

            let gameCards = games.map((game) => {
                const localGameDate = new Date(game.createDate);

                return {
                    result: game.stats.win === true ? "Win" : "Defeat",
                    timeSpent: "27m 22s",
                    gameDate: `${localGameDate.toLocaleDateString()} ${localGameDate.toLocaleTimeString()}`,
                    kda: (game.stats.championsKilled + game.stats.assists) / game.stats.numDeaths,
                    cs: game.stats.minionsKilled + game.stats.neutralMinionsKilled,
                    gold: game.stats.goldEarned,
                    champId: game.championId,
                    champ: "Diana"
                };
            });

            return gameCards;
        });
    }

    getChampionInfo(gameCards){

        let axiosRequests = gameCards.map((gameCard) => {
            const apiUrl = ApiBuilder.getChampionDataUrl(gameCard.champId);
            return Axios.get(apiUrl);
        });

        return Axios.all(axiosRequests)
            .then(function (obj) {
                
                let gameCardsWithChamp = obj.map((response) => {
                    
                    let foundChamp = {champ: response.data.name};
                    let gameCard = _find(gameCards, { champId: response.data.id });
                    
                    return Object.assign({}, gameCard, foundChamp);
                });

                return gameCardsWithChamp;
            
            })
            .catch(function(error){ console.log(error) });
    }

    _getGameCards(){
        return this.state.gameCards.map((gameCard, i) => {
            return <GameCard {...gameCard} key={i} />
        });
    }

    render() {
        const gameCards = this._getGameCards();

        return (
                <div>
                    <UserInfo {...this.state.userData} />
                    <Reloader handleReload={this.handleClick} />
                    {gameCards}
                    <Modal show={this.state.showModal} > 
                        <Modal.Body>
                            <h3>Reloading Data...</h3>
                        </Modal.Body>
                    </Modal>
                </div>
            );
    }
}

export default DasboardView;
