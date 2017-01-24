import React, { Component } from 'react';

import UserInfo from '../../components/user-info/user-info';
import Reloader from '../../components/reloader/reloader';

class DasboardView extends Component { 
    constructor(){
        super();
        this.state = {
            userData: { username: "Alan Zam", level: "23", revisionDate: "Mon 23" }
        }
    }

    render(){
        return (
                <div>
                    <UserInfo {...this.state.userData} />
                    <Reloader />
                </div>
            );
    }
}

export default DasboardView;
