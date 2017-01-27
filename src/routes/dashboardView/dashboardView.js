import React, { Component } from 'react';
import './dashboardView.css';
//@Components
import UserInfo from '../../components/user-info/user-info';
import Reloader from '../../components/reloader/reloader';
import GameCard from '../../components/gamecard/gamecard';
import Modal from 'react-bootstrap/lib/Modal';
//@Libs
import 'bootstrap/dist/css/bootstrap.css';

class DasboardView extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            userData: {},
            gameCards: []
        }

        this.isModalOpen = this.isModalOpen.bind(this);
        this.updateStateFromReload = this.updateStateFromReload.bind(this);
    }

    isModalOpen(value) {
        this.setState({
            showModal: value
        });
    }

    updateStateFromReload(fetchedData) {
    
        this.setState({
                    userData: fetchedData.userData,
                    gameCards: fetchedData.gameCards,
                    showModal: false
                });
    }

    _getGameCards() {
        return this.state.gameCards.map((gameCard, i) => {
            return <GameCard {...gameCard} key={i} />
        });
    }

    render() {
        const gameCards = this._getGameCards();

        const gameCardList = gameCards.length > 0 ? gameCards : <h3>Here you will find you Lol stats</h3>;

        return (
                <div>
                    <Reloader userId={this.state.userData.userId} showModal={this.isModalOpen} handleReload={this.updateStateFromReload} />
                    <UserInfo {...this.state.userData} />
                    <div className="gamecard-list component-block">
                        {gameCardList}               
                    </div>
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
