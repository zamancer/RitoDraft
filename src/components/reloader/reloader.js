import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//@Components
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';
//@Actions
import DashboardActions from '../../actions/dashboardActions';

class Reloader extends Component {
    constructor() {
        super();
        this.state = {
            isButtonEnabled: true,
            inputValue: '',
        };
        
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleClick() {
        
        this.props.showModal(true);

        let summonerName = this.state.inputValue;
        
        DashboardActions.updateSummonerInfo( summonerName.toLowerCase(), 
                                            this.props.handleReload, 
                                            this.hideModal);
    }

    hideModal() {
        this.props.showModal(false);
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        return (
            <div className="component-block">
                <Form inline>
                    <FormGroup controlId="formInlineName">
                    <ControlLabel>Username</ControlLabel>
                    {'   '}
                    <FormControl type="text" value={this.state.inputValue} placeholder="Zamancer" onChange={this.updateInputValue} />
                    </FormGroup>
                    {'   '}
                    <Button bsStyle={"primary"} onClick={this.handleClick} >
                        Load
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Reloader;