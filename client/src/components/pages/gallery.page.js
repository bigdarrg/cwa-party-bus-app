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

//Importing sub components
import Gallery from '../gallery.component';

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

export default class GalleryPage extends Component {
  render() {
    return (
      <div className={websiteStyle.pageStyling}>
        <div className={[staticFeatures.pageContainer, staticFeatures.pageLayout4].join(' ')}>
            <div className={[staticFeatures.pageTitle, websiteStyle.pageTitle].join(' ')}>
              Gallery.
            </div>

            <div className={[staticFeatures.p, websiteStyle.p].join(' ')}>
              {configData.GALLERYTEXT}
            </div>

            <Gallery />
        </div> 
      </div>
    );
  }
}