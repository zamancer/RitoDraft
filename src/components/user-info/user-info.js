import React, { Component } from 'react';
import './user-info.css';
import 'bootstrap/dist/css/bootstrap.css';

class UserInfo extends Component {
    render() {
        return (
            <div className="component-block">
                <section className="info-section">
                    <div className="row">
                        <div className="col-md-6">
                            <span className="info-title">User:</span>
                            <span className="info-value username">Alan Zambrano López</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">    
                            <span className="info-title">Last Login:</span>
                            <span className="info-value lastlogin">Mon 23</span>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default UserInfo;