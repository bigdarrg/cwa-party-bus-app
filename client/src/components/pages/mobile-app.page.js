//Importing tools
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../../config/config.json';

//Loading all styling modules
import staticFeatures from "../../css-modules/static.module.css";

//Loading sub-components
import Booking from '../booking-component/booking.component';

//Importing images
import showcaseImage from '../../media/showcase-image.jpg';

//Loading icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { faBook, faHome, faMessage } from '@fortawesome/free-solid-svg-icons';
import ContactForm from '../contact-form.component';

export default class MobileApp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          home: true,
          bookings: false,
          contact: false
        }

        this.switchToThanks = this.switchToThanks.bind(this);
    }

    //Passed to child components to switch to thanks page
    switchToThanks() {
        this.setState({
            home: false,
            bookings: false,
            contact: false,
            thanks: true
        });
    }

    render() {
        return (
        <div className={staticFeatures.mobileAppWrapper}>
            {/*Header*/}
            <div className={staticFeatures.mobileFixedHeader}>
                    <div className={staticFeatures.mobileMainTitle}>{configData.TITLE}</div>               <p className={staticFeatures.mobileViewPrompt}>Mobile view</p>
            </div> 

            {/*Navigation through conditional rendering and state therefore all pages are in this one file*/}

            {/*Home page*/}
            {(this.state.home)&&
                <div className={staticFeatures.mobileAppHomePage}> 
                    <div className={staticFeatures.mobileSpacing} />

                    <div>{configData.DESCRIPTION}</div>

                    <div>{configData.HOMEPAGETEXT}</div>
                    
                    <img className={staticFeatures.image} src={showcaseImage} alt={"WELCOME"}/>

                </div>              
            }

            {/*Bookings page*/}
            {(this.state.bookings)&&
                <div className={staticFeatures.mobileAppBookingsPage}> 
                    <div className={staticFeatures.mobileSpacing} />
                    
                    <Booking switchToThanks={this.switchToThanks}/>
                </div>              
            }

            {/*Contact page*/}
            {(this.state.contact)&&
                <div className={staticFeatures.mobileAppContactPage}> 
                    <div className={staticFeatures.mobileSpacing} />

                    <ContactForm switchToThanks={this.switchToThanks}/>
                </div>              
            }

            {/*Thanks page*/}
            {(this.state.thanks)&&
                <div className={staticFeatures.mobileAppLayout}> 
                    <div className={staticFeatures.mobileSpacing} />

                    <br/>

                    <div>Thanks, we've recieved your request.</div>
                </div>              
            }

            <div className={staticFeatures.mobileSpacing} />
            <div className={staticFeatures.mobileSpacing} />

            {/*Footer*/}
            <div className={staticFeatures.mobileFixedFooter}>
                {/*Instagram*/}
                <a href={"https://" + configData.INSTAGRAM}>
                    <button className={staticFeatures.mobileButton}><FontAwesomeIcon className={staticFeatures.mobileIcon} icon={faInstagram} /></button>
                </a>
                {/*Facebook*/}
                <a href={"https://" + configData.FACEBOOK}>
                    <button className={staticFeatures.mobileButton}><FontAwesomeIcon className={staticFeatures.mobileIcon} icon={faFacebook} /></button>
                </a>
                {/*Twitter*/}
                <a href={"https://" + configData.TWITTER}>
                    <button className={staticFeatures.mobileButton}><FontAwesomeIcon className={staticFeatures.mobileIcon} icon={faTwitter} /></button>
                </a>
                {/*Home*/}
                <button onClick={() => this.setState({home: true, bookings: false, contact: false, thanks: false})}
                        className={staticFeatures.mobileButton} type="button"><FontAwesomeIcon className={staticFeatures.mobileIcon} icon={faHome}/></button>
                {/*Bookings*/}
                <button onClick={() => this.setState({home: false, bookings: true, contact: false, thanks: false})}
                        className={staticFeatures.mobileButton} type="button"><FontAwesomeIcon className={staticFeatures.mobileIcon} icon={faBook}/></button>
                {/*Contact us*/}
                <button onClick={() => this.setState({home: false, bookings: false, contact: true, thanks: false})}
                        className={staticFeatures.mobileButton} type="button"><FontAwesomeIcon className={staticFeatures.mobileIcon} icon={faMessage}/></button>
            </div>
        </div>
        );
    }
}