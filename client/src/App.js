//Importing tools
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import "../src/App.css"

//Loading all styling modules
import staticFeatures from "./css-modules/static.module.css";

import cleanStyle from "./css-modules/clean.module.css";
import modernStyle from "./css-modules/modern.module.css";
import rusticStyle from "./css-modules/rustic.module.css";

//Loading configuration
import configData from './config/config.json';

//Loading page components
import Home from "./components/pages/home.page";
import AboutUs from "./components/pages/about-us.page";
import Bookings from "./components/pages/bookings.page";
import GalleryPage from "./components/pages/gallery.page";
import ContactUs from "./components/pages/contact-us.page";
import Thanks from "./components/pages/thanks.page";

import Socials from "./components/social-media-panel.component";

//Loading mobile app
import MobileApp from "./components/pages/mobile-app.page";

//Importing styling resources
import { faBook, faContactCard, faHome, faImage, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//Determine website styling
const websiteStyle = (function() {
  if (configData.STYLE === "clean"){
    return cleanStyle
  }else if (configData.STYLE === "modern"){
    return modernStyle
  }else if (configData.STYLE === "rustic"){
    return rusticStyle
  }
})();

const menuLayout = (function() {
  if (configData.MENUPOSITION === "header"){
    return staticFeatures.headerMenu
  }else if (configData.MENUPOSITION === "left") {
    return staticFeatures.stackMenu
  }else if (configData.MENUPOSITION === "right"){
    return staticFeatures.stackMenuRight
  }
})();

const headerType = (function() {
  if (configData.HEADERTYPE === "parallax"){
    return staticFeatures.parallaxHeader
  }else if (configData.HEADERTYPE === "fullscreen") {
    //When scoll's y pos is greater than 10 switch header's styling
    window.onscroll = function() {
      var yPos = window.scrollY;

      if (yPos > 10) {
        document.getElementsByClassName(staticFeatures.fullscreenHeader)[0].classList.add(staticFeatures.minimisedFullscreenHeader);

        if(document.getElementById('PageMainTitle') !== undefined){
          document.getElementById('PageMainTitle').remove();
        }
      }
    };

    return staticFeatures.fullscreenHeader
  }
})();

function App() {
  return (
  <div>
    {/*Browser view*/}
    <BrowserView>
      <Router>
      <div className={staticFeatures.mainContainer}>  
        {/*Header:*/}
        <div className={[headerType, websiteStyle.header].join(' ')}>
          {(headerType === staticFeatures.fullscreenHeader) &&
            <div className={[staticFeatures.fullscreenHeaderTitle, staticFeatures.mainTitle, websiteStyle.mainTitle].join(' ')}>{configData.TITLE}</div>
          }
        </div>
        
        {/*.appContainer determines a suitable page layout based on the chosen styling of its menu.*/}
        <div className={[staticFeatures.appContainer, websiteStyle.appContainer].join(' ')}>
            {/*Menu:*/}
            <div className={[menuLayout, websiteStyle.menu].join(' ')}>
                <div className={staticFeatures.menuButton}>
                  <Link to="/home">
                    <button className={websiteStyle.menuButton} type="button"><FontAwesomeIcon icon={faHome}/> Home</button>
                  </Link>
                </div>

                <div className={staticFeatures.menuButton}>
                  <Link to="/about-us">
                    <button className={websiteStyle.menuButton} type="button"><FontAwesomeIcon icon={faInfoCircle}/> About us</button>
                  </Link>
                </div>

                <div className={staticFeatures.menuButton}>
                  <Link to="/bookings">
                    <button className={websiteStyle.menuButton} type="button"><FontAwesomeIcon icon={faBook}/> Bookings</button>
                  </Link>
                </div>

                <div className={staticFeatures.menuButton}>
                  <Link to="/gallery">
                    <button className={websiteStyle.menuButton} type="button"><FontAwesomeIcon icon={faImage}/> Gallery</button>
                  </Link>
                </div>

                <div className={staticFeatures.menuButton}>
                  <Link to="/contact">
                    <button className={websiteStyle.menuButton} type="button"><FontAwesomeIcon icon={faContactCard}/> Contact</button>
                  </Link>
                </div>
            </div>

            {/*Page: this will dynamically render pages of the websites depending on the url the user is currently on using react-router-dom.*/}
            <div>  
              <div id="PageMainTitle" className={[staticFeatures.mainTitle, websiteStyle.mainTitle, websiteStyle.pageStyling].join(' ')}>{configData.TITLE}</div>

              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/bookings" element={<Bookings/>}/>
                <Route path="/gallery" element={<GalleryPage/>}/>
                <Route path="/contact" element={<ContactUs/>}/>
                <Route path="/thanks" element={<Thanks/>}/>
              </Routes>
            </div>
        </div>

        {/*Footer: Setup as fixed bar at the bottom of the screen with 3 parts; left, centre & right.*/}
        <div className={[staticFeatures.footer, websiteStyle.footer].join(' ')}>
          {/*Left*/}
          <div></div>
          {/*Center*/}
          <div></div>
          {/*Right*/}
          <div><Socials/></div>
        </div>
      </div>
      </Router>
    </BrowserView>
    
    {/*Mobile view*/}
    <MobileView>

      <MobileApp/>

    </MobileView>
  </div>
  );
}

export default App;
 