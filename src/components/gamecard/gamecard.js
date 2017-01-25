import React, { Component } from 'react';
import './gamecard.css';
import 'bootstrap/dist/css/bootstrap.css';

class GameCard extends Component {
    render(){

        const { result, timeSpent, gameDate, kda, cs, gold, champ } = this.props;

        return(
            <div className="gamecard-wrap">
                <div className="row bg-primary">
                    <div className="gamecard-champ col-md-2">
                        <img src={`http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/${champ}.png`} alt={`${champ}`}/>
                    </div>
                    <div className="gamecard-gameinfo col-md-1 gameinfo-first">
                        <div className="gamecard-gameinfo-result">
                            <p className="text-center">{result}</p>
                            <p className="text-center">Time:</p>
                            <p className="text-center">{timeSpent}</p>
                        </div>
                    </div>
                    <div className="gamecard-gameinfo col-md-1">
                        <div className="gamecard-gameinfo-date">
                            <p className="text-center">Played On:</p>
                            <p className="text-center">{gameDate}</p>
                        </div>
                    </div>
                    <div className="gamecard-gameinfo col-md-4">
                        <div className="gamecard-stats-kda">
                            <p className="text-left">{`${kda} KDA`}</p> 
                        </div>
                        <div className="gamecard-stats-cs">
                            <p className="text-left">{`${cs} CS`}</p> 
                        </div>
                        <div className="gamecard-stats-gold">
                            <p className="text-left">{`${gold} Gold`}</p> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameCard;
