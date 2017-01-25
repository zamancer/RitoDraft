import React, { Component } from 'react';
//@Components
import UserInfo from '../../components/user-info/user-info';
import Reloader from '../../components/reloader/reloader';
import GameCard from '../../components/gamecard/gamecard';
//@Services
import ApiBuilder from '../../services/apiBuilder';
import RiotApi from '../../services/riotApi';

class DasboardView extends Component {
    constructor() {
        super();
        this.state = {
            userData: { username: "Alan Zam", level: "23", revisionDate: "Mon 23" },
            gameCards: [{ result: "Win", timeSpent: "27m 22s", gameDate: "Mon 23, 2017", kda: 0.7, cs: 12, gold: 8630, champ: "Diana" },
                        { result: "Defeat", timeSpent: "19m 51s", gameDate: "Mon 24, 2017", kda: 20, cs: 128, gold: 10630, champ: "Orianna" }]
        }

        this.onReloaderClick = this.onReloaderClick.bind(this);
    }

    onReloaderClick = function() {
        const dashboard = this;
        
        const apiUrl = ApiBuilder.getSummonerDataUrl('zamancer');
        
        RiotApi.get(apiUrl, {}, function (response) {
                
                const userData = {username: response.data.zamancer.name, 
                                  level: response.data.zamancer.summonerLevel, 
                                  revisionDate: new Date(response.data.zamancer.revisionDate).toDateString()};

                dashboard.setState({
                    userData
                });
            });
    }

    _getGameCards(){
        return this.state.gameCards.map((gameCard) => {
            return <GameCard {...gameCard} />
        });
    }

    render() {
        const gameCards = this._getGameCards();

        return (
                <div>
                    <UserInfo {...this.state.userData} />
                    <Reloader handleReload={this.onReloaderClick} />
                    {gameCards}
                </div>
            );
    }
}

export default DasboardView;
