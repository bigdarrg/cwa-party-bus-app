//The info form component will take a wesbite user's information and store it in it's state. When the submit button is pressed it will run the handler function passed in the
//'submitHandler' prop.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../../config/config.json';

//Loading all styling modules
import staticFeatures from "../../css-modules/static.module.css";

import cleanStyle from "../../css-modules/clean.module.css";
import modernStyle from "../../css-modules/modern.module.css";
import rusticStyle from "../../css-modules/rustic.module.css";

//Determine website styling module from the config file
const websiteStyle = (function() {
    if (configData.STYLE === "clean"){  
        return cleanStyle
    }else if (configData.STYLE === "modern"){
        return modernStyle
    }else if (configData.STYLE === "rustic"){
        return rusticStyle
    }
})();

export default class InfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: undefined,
            sname: undefined,
            email: undefined,
            telephone: undefined
        };
    
        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleSNameChange = this.handleSNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFNameChange(event) {
        this.setState({fname: event.target.value});
    }

    handleSNameChange(event) {
        this.setState({sname: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleTelephoneChange(event) {
        this.setState({telephone: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.props.handleSubmit(this.state.fname, this.state.sname, this.state.email, this.state.telephone);
    }

    render() {
        return (
            <div>
                <div className={staticFeatures.textCentered}>
                Your information
                </div>

                <form className={staticFeatures.infoFormContainer} onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={staticFeatures.infoFormLabel}>
                        First name
                    </div>

                    <input onChange={this.handleFNameChange} className={staticFeatures.infoFormInput} type="text" placeholder="First name" required/>

                    <div className={staticFeatures.infoFormLabel}>
                        Last name
                    </div>

                    <input onChange={this.handleSNameChange} className={staticFeatures.infoFormInput} type="text" placeholder="Last name" required/>

                    <div className={staticFeatures.infoFormLabel}>
                        Email
                    </div>

                    <input onChange={this.handleEmailChange} className={staticFeatures.infoFormInput} type="email" placeholder="Email" required/>

                    <div className={staticFeatures.infoFormLabel}>
                        Contact number
                    </div>

                    <input onChange={this.handleTelephoneChange} className={staticFeatures.infoFormInput} type="tel" pattern="^((\+44)|(0)) ?\d{4} ?\d{6}$"
                    placeholder="Telephone" required/>

                    <div className={staticFeatures.smallSpace}/>

                    <input type="submit" value="SUBMIT" className={[staticFeatures.menuButton, websiteStyle.menuButton].join(' ')}/>
                </form>

                

            </div>
        );
    }
}