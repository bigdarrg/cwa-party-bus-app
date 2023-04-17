//This is a component which displays any images placed in the ../media/gallery-images folder in an auto height, fixed width carousel.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Importing bootstrap components
import Carousel from 'react-bootstrap/Carousel'

//Loading all styling module
import staticFeatures from "../css-modules/static.module.css";

//Importing gallery images
function importAllImages(importFunction) {
  return importFunction.keys().map(importFunction);
}

const galleryImages = importAllImages(require.context('../media/gallery-images/', false, /\.(png|jpe?g|svg)$/));

//Generate JSX for carousel items
function generateCarouselJSX() {
  const carouselJSX = galleryImages.map((image) => {

    return (
        <Carousel.Item>
          <img className={staticFeatures.galleryImage} src={image} alt="GALLERY"/>
        </Carousel.Item>
    )
  });

  return carouselJSX;
}

export default class Gallery extends Component {
  render() {
    return (
    <div className={staticFeatures.galleryContainer}>
        <Carousel className={staticFeatures.carousel}>
            {generateCarouselJSX()}
        </Carousel>
    </div>
    );
  }
}