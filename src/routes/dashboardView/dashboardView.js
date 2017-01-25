import React, { Component } from 'react';

import UserInfo from '../../components/user-info/user-info';
import Reloader from '../../components/reloader/reloader';

import ApiBuilder from '../../services/apiBuilder';
import RiotApi from '../../services/riotApi';

class DasboardView extends Component { 
    constructor() {
        super();
        this.state = {
            userData: { username: "Alan Zam", level: "23", revisionDate: "Mon 23" }
        }

        this.onReloaderClick = this.onReloaderClick.bind(this);
    }

    onReloaderClick = function() {
        const apiUrl = ApiBuilder.getSummonerDataUrl('zamancer');

        const dashboard = this;

        RiotApi.get(apiUrl, {}, function (response) {
                
                const userData = {username: response.data.zamancer.name, 
                                  level: response.data.zamancer.summonerLevel, 
                                  revisionDate: new Date(response.data.zamancer.revisionDate).toDateString()};

                dashboard.setState({
                    userData
                });
            });

        
    }

    render() {
        return (
                <div>
                    <UserInfo {...this.state.userData} />
                    <Reloader handleReload={this.onReloaderClick} />
                </div>
            );
    }
}

export default DasboardView;
