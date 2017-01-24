import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Axios from 'axios';


class Reloader extends Component {
    constructor() {
        super();

        this.state = {
            isButtonEnabled: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = function() {

        const api_key = "21682440-4d87-4971-bc31-478519c61a20";

        Axios.get(`https://na.api.pvp.net/api/lol/LAN/v1.4/summoner/by-name/zamancer?api_key=${api_key}`)
            .then(function (response) {
                // Update state
                console.log(response.data);
            })
            .catch(function (err) {
                console.log(err);
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