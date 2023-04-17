//The maps component renders a google map widget displaying the location passed through the config properties.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Loading configuration
import configData from '../config/config.json';

//Importing google maps API
import { Map, GoogleApiWrapper } from 'google-maps-react';

//Importing sizing styler module
import staticFeatures from "../css-modules/static.module.css";

//Importing HTTP tools
import axios from 'axios';

//Geocoding address in config file
function plusAsSpaces(text){
  return text.replace(/ /g, '+')
}

const houseAndStreet = plusAsSpaces(configData.HOUSEANDSTREET);
const province = plusAsSpaces(configData.PROVINCE);
const country = plusAsSpaces(configData.COUNTRY);

export class LocationMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: undefined,
      latitude: undefined,
      apiKey: undefined,
      loading: true
    }
  }

  componentDidMount(){
    //Geocoding address in config file
    axios.get("/maps/geocode", {
      params: {
        houseAndStreet: houseAndStreet,
        province: province,
        country: country
      }
    }).then(res => {
      const coords = res.data;

        this.setState({
          latitude: coords.lat,
          longitude: coords.lng,
          loading: false   
        });
    });
    
  }

  render() {
    const mapSize = {
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "20px"
    };

    const containerStyle = {
      maxWidth: "100%",
      maxHeight: "100%",
      position: "relative",
      borderRadius: "20px"
     };
    
    
    return (
      <div className={staticFeatures.mapContainer}>
        {(this.state.loading === false)&& 
            <Map google={this.props.google} style={mapSize} containerStyle={containerStyle} zoom={14} initialCenter={{lat: this.state.latitude, lng: this.state.longitude}}/>
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_API,
  }
)(LocationMap)