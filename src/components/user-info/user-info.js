import React, { Component } from 'react';
import './user-info.css';
import 'bootstrap/dist/css/bootstrap.css';

class UserInfo extends Component {

    render() {
        const { username, level, revisionDate } = this.props;

        return (
            <div className="component-block">
                <div className="info-section">
                    <div className="span9">
                        <h2>User Information</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <span className="info-title">Summoner:</span>
                                <span className="info-value username">{username}</span>
                            </div>
                            <div className="col-md-4">
                                <span className="info-title">Level:</span>
                                <span className="info-value level">{level}</span>
                            </div>
                            <div className="col-md-4">
                                <span className="info-title">Last Game:</span>
                                <span className="info-value revisionDate">{revisionDate}</span>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;