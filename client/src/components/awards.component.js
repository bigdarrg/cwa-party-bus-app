//This is a awards panel component which can display awards won by the business. It will size its self to whatever parent div it is placed for re-usability.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../config/config.json';

//Importing styling modules
import staticFeatures from "../css-modules/static.module.css";

import cleanStyle from "../css-modules/clean.module.css";
import modernStyle from "../css-modules/modern.module.css";
import rusticStyle from "../css-modules/rustic.module.css";

//Importing award icons
function importAllImages(importFunction) {
  return importFunction.keys().map(importFunction);
}

const awardIcons = importAllImages(require.context('../media/awards-icons/', false, /\.(png|jpe?g|svg)$/));

//Determine website styling module from the config file
const websiteStyle = (function() {
    if (configData.STYLE === "clean"){
      return cleanStyle
    }else if (configData.STYLE === "modern"){
      return modernStyle
    }else if (configData.STYLE === "rustic") {
      return rusticStyle
    }
  })();

  function generateAwardsIconsJSX() {
    const awardsIconsJSX = awardIcons.map((icon) => {
      return (<div className={staticFeatures.awardsIconContainer}><img className={staticFeatures.awardsIcon} src={icon} alt="AWARD"/></div>)
    });

    return awardsIconsJSX;
  }

export default class Awards extends Component {
  render() {
    return (
      <div className={[staticFeatures.awardsContainer, websiteStyle.awardsContainer].join(' ')}>
        {generateAwardsIconsJSX()}
      </div>
    );
  }
}
