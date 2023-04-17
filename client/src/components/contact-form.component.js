//The contact form component will take a wesbite user's inputs and store it in it's state. When the submit button is pressed it will make a HTTP request to url/emails/send_query with the 
//data it has collected.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

//Loading configuration
import configData from '../config/config.json';

//Loading all styling modules
import staticFeatures from "../css-modules/static.module.css";

import cleanStyle from "../css-modules/clean.module.css";
import modernStyle from "../css-modules/modern.module.css";
import rusticStyle from "../css-modules/rustic.module.css";

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

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: undefined,
            sname: undefined,
            email: undefined,
            telephone: undefined,
            query: undefined
        }; 
    
        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleSNameChange = this.handleSNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);

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

    handleQueryChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        
        axios.post("/emails/send_query", {
            name: this.state.fname + " " + this.state.sname,
            email: this.state.email,
            telephone: this.state.telephone,
            query: this.state.query
          })

        //Hides component on mobile view through manipulating it's conditional rendering state variable
        if (this.props.switchToThanks !== undefined) {
            this.props.switchToThanks();
        }
      
        window.location.href = "/#/thanks";
    }

    render() {
        return (
            <div className={[staticFeatures.contactFormContainer, websiteStyle.contactFormContainer].join(' ')}>
                <div className={staticFeatures.textCentered}>
                Your information
                </div>

                <form className={staticFeatures.infoFormContainer} onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={staticFeatures.contactFormLabel}>
                        First name
                    </div>

                    <input onChange={this.handleFNameChange} className={staticFeatures.contactFormInput} type="text" placeholder="First name" required/>

                    <div className={staticFeatures.contactFormLabel}>
                        Last name
                    </div>

                    <input onChange={this.handleSNameChange} className={staticFeatures.contactFormInput} type="text" placeholder="Last name" required/>

                    <div className={staticFeatures.contactFormLabel}>
                        Email
                    </div>

                    <input onChange={this.handleEmailChange} className={staticFeatures.contactFormInput} type="email" placeholder="Email" required/>

                    <div className={staticFeatures.contactFormLabel}>
                        Contact number
                    </div>

                    <input onChange={this.handleTelephoneChange} className={staticFeatures.contactFormInput} type="tel" pattern="^((\+44)|(0)) ?\d{4} ?\d{6}$"
                    placeholder="Telephone" required/>

                    <div className={staticFeatures.smallSpace}/>

                    <div className={staticFeatures.textCentered}>
                        Query
                    </div>

                    <textarea onChange={this.handleQueryChange} className={staticFeatures.contactFormQuery} type="text"
                    placeholder="Ask away, we're happy to help!" required/>

                    <div className={staticFeatures.smallSpace}/>

                    <input type="submit" value="SUBMIT" className={[staticFeatures.menuButton, websiteStyle.menuButton].join(' ')}/>
                </form>

            </div>
        );
    }
}