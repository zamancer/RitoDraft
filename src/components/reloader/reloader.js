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
import _add from 'lodash/add';
import _divide from 'lodash/divide';
import _floor from 'lodash/floor';
import _round from 'lodash/round';

class Reloader extends Component {
    constructor() {
        super();
        this.state = {
            isButtonEnabled: true,
            inputValue: '',
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

    getChampionInfo(gameInfo){

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