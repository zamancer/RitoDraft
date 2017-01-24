import React, { Component } from 'react';
import './user-info.css';
import 'bootstrap/dist/css/bootstrap.css';

class UserInfo extends Component {
    render() {
        return (
            <div className="component-block">
                <div className="info-section row">
                    <div className="span9">
                        <h2>User Information</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <span className="info-title">Summoner:</span>
                                <span className="info-value username">Alan Zambrano López</span>
                            </div>
                            <div className="col-md-4">
                                <span className="info-title">League:</span>
                                <span className="info-value league">Silver V</span>
                            </div>
                            <div className="col-md-4">
                                <span className="info-title">Last Login:</span>
                                <span className="info-value lastlogin">Mon 23</span>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;