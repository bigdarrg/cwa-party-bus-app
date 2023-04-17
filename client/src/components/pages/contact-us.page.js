//Importing tools
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../../config/config.json';

//Loading all styling modules
import staticFeatures from "../../css-modules/static.module.css";

import cleanStyle from "../../css-modules/clean.module.css";
import modernStyle from "../../css-modules/modern.module.css";
import rusticStyle from "../../css-modules/rustic.module.css";

//Loading styling resources
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faPhone } from '@fortawesome/free-solid-svg-icons';

//Importing sub-components
import ContactForm from '../contact-form.component';

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

const pageLayout = (function() {
  if (configData.CONTACTUSLAYOUT === "descriptionFirst"){
    return staticFeatures.pageLayout2
  }else if (configData.CONTACTUSLAYOUT === "descriptionLast"){
    return staticFeatures.pageLayout6
  }
})();

export default class ContactUs extends Component {
  render() {
    return (
      <div className={websiteStyle.pageStyling}>
        <div className={[staticFeatures.pageContainer, pageLayout].join(' ')}>
            <div className={[staticFeatures.pageTitle, websiteStyle.pageTitle].join(' ')}>
              Contact Us.
            </div>

            <div className={[staticFeatures.p, websiteStyle.p].join(' ')}>
              {configData.CONTACTUSTEXT}
            </div>
        
            <div className={[staticFeatures.infoBox, websiteStyle.infoBox].join(' ')}>
              <FontAwesomeIcon icon={faPhone} /><b>  Telephone:</b> 
              <br/>
              {configData.TELEPHONE}
              <br/>
              <br/>
              <FontAwesomeIcon icon={faAddressCard} /><b>  Email:</b>
              <br/>
              {configData.EMAIL}
            </div>

            <ContactForm />
          </div> 
      </div>
    );
  }
}