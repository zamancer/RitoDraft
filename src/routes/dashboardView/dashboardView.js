import React, { Component } from 'react';

import UserInfo from '../../components/user-info/user-info';
import Reloader from '../../components/reloader/reloader';

class DasboardView extends Component { 
    render(){
        return (
                <div>
                    <UserInfo />
                    <Reloader />
                </div>
            );
    }
}

export default DasboardView;
