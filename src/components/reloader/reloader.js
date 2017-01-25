import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';

class Reloader extends Component {
    constructor() {
        super();

        this.state = {
            isButtonEnabled: true
        };
    }

    getReloadButton = function() {

        return <Button  bsSize={"large"} 
                        bsStyle={"primary"} 
                        disabled={!this.state.isButtonEnabled} 
                        onClick={this.props.handleReload}>
                    Reload 
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