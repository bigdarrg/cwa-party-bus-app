//The price list component will read the data about prices in the config file and format it into a menu (i.e. like a dinner menu).
//It will hold the selected service in state and will run the handleSelect prop function when a service is selected.

import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../../config/config.json';

//Loading styling modules
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

const servicesAndPrices = Object.keys(configData.PRICES).map((service) => [service, configData.PRICES[service]]);

//Function to generate price list JSX
function generatePriceListJSX(selectFunction){
    const priceListJSX = servicesAndPrices.map((serviceAndPrice) => {
        return (
            <div className={[staticFeatures.priceListItem, websiteStyle.priceListItem].join(' ')}>
                <div>
                    <button className={staticFeatures.priceListButton} onClick={() => selectFunction(serviceAndPrice[0])}>{serviceAndPrice[0]}</button>
                </div>
                <div className={staticFeatures.priceTextBox}>
                    <p>{configData.CURRENCY}{serviceAndPrice[1]}</p>
                </div>
            </div>
        )
      });

    return priceListJSX;
}

export default class PriceList extends Component {
    constructor(props){
        super(props);

        this.state = {
            serviceSelected: undefined
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(service){
        this.setState({
            serviceSelected: service
        });

        this.props.handleSelect(service);
    }

    render() {
        return (
            <div>
                Available services
        
                <div className={staticFeatures.pricesContainer}>
                    {generatePriceListJSX(this.handleSelect)}
                </div> 

            </div>
        );
    }
}