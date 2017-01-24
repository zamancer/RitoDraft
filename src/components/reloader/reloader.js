import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';

import ApiBuilder from '../../services/apiBuilder';
import RiotApi from '../../services/riotApi';

class Reloader extends Component {
    constructor() {
        super();

        this.state = {
            isButtonEnabled: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = function() {

        const apiUrl = ApiBuilder.getSummonerDataUrl('zamancer');

        RiotApi.get(apiUrl, {}, function (response) {
                // Update state
                console.log(response.data.zamancer);
            });

        this.setState({isButtonEnabled: false});

        const me = this;
        setTimeout(function() {
            me.setState({isButtonEnabled: true});
        }, 1000);
    }

    getReloadButton = function() {
        return <Button  bsSize={"large"} 
                        bsStyle={"primary"} 
                        disabled={!this.state.isButtonEnabled} 
                        onClick={this.handleClick}>
                    Click Me! 
                </Button>;
    }

    render() {
        const reloadButton = this.getReloadButton();

        return (
            <div className="component-block">
                {reloadButton}
            </div>
        );
    }
}

export default Reloader;