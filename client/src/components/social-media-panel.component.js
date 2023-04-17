//This is a social media panel component which loads the links from the config file. It will size it's self to whatever parent div it is placed for re-usability.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../config/config.json';

//Loading icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'

//Importing styling modules
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

export default class Socials extends Component {
  render() {
    return (
      <div className={[staticFeatures.socialsPanel, websiteStyle.socialsPanel].join(' ')}>
        {/*Instagram*/}
        <a href={"https://" + configData.INSTAGRAM} className={[staticFeatures.socialSlot, websiteStyle.socialSlot].join('  ')}>
            <button className={[staticFeatures.socialButton, websiteStyle.socialButton].join(' ')}><FontAwesomeIcon className={staticFeatures.socialIcon} icon={faInstagram} /></button>
        </a>
        {/*Facebook*/}
        <a href={"https://" + configData.FACEBOOK} className={[staticFeatures.socialSlot, websiteStyle.socialSlot].join('  ')}>
            <button className={[staticFeatures.socialButton, websiteStyle.socialButton].join(' ')}><FontAwesomeIcon className={staticFeatures.socialIcon} icon={faFacebook} /></button>
        </a>
        {/*Twitter*/}
        <a href={"https://" + configData.TWITTER} className={[staticFeatures.socialSlot, websiteStyle.socialSlot].join('  ')}>
            <button className={[staticFeatures.socialButton, websiteStyle.socialButton].join(' ')}><FontAwesomeIcon className={staticFeatures.socialIcon} icon={faTwitter} /></button>
        </a>
      </div>
    );
  }
}
