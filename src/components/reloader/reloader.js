import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//@Components
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';
//@Services
import ApiBuilder from '../../services/apiBuilder';
import RiotApi from '../../services/riotApi';
//@Libs
import Axios from 'axios';
import _find from 'lodash/find';

class Reloader extends Component {
    constructor() {
        super();
        this.state = {
            isButtonEnabled: true,
            inputValue: 'Zamancer',
        };
        
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleClick() {
        
        this.props.showModal(true);

        let summonerName = this.state.inputValue;
        
        this.getUserInfo(summonerName.toLowerCase())
            .then(this.getGameInfo)
            .then(this.getChampionInfo)
            .then(this.props.handleReload)
            .catch(this.hideModal);
    }

    hideModal(){
        this.props.showModal(false);
    }

    getUserInfo = function(username) {

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

    getGameInfo(userInfo) {      
        
        const apiUrl = ApiBuilder.getRecentGamesUrl(userInfo.userId);

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
                    champId: game.championId
                };
            });

            return { userData: userInfo, gameCards};
        });
    }

    getChampionInfo(gameInfo){

        const gameCards = gameInfo.gameCards;

        let axiosRequests = gameCards.map((gameCard) => {
            const apiUrl = ApiBuilder.getChampionDataUrl(gameCard.champId);
            return Axios.get(apiUrl);
        });

        return Axios.all(axiosRequests)
            .then(function (obj) {
                
                let gameCardsWithChamp = obj.map((response) => {
                    
                    let foundChamp = {champ: response.data.key};
                    let gameCard = _find(gameCards, { champId: response.data.id });
                    
                    return Object.assign({}, gameCard, foundChamp);
                });

                return Object.assign({}, gameInfo, {gameCards: gameCardsWithChamp});
            
            })
            .catch(function(error){ console.log(error) });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        return (
            <div className="component-block">
                <Form inline>
                    <FormGroup controlId="formInlineName">
                    <ControlLabel>Username</ControlLabel>
                    {'   '}
                    <FormControl type="text" value={this.state.inputValue} placeholder="Zamancer" onChange={this.updateInputValue} />
                    </FormGroup>
                    {'   '}
                    <Button bsStyle={"primary"} onClick={this.handleClick} >
                        Load
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Reloader;