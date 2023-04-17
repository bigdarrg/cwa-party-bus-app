//The section completed component is a placeholder for a completed form. It has the following properties: icon (the font awesome icon for the section), title, and info.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Importing icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

//Loading styling module
import staticFeatures from "../../css-modules/static.module.css";

export default class SectionCompleted extends Component {
    render() {
        const icon = this.props.icon;
        const title = this.props.title;
        const info = this.props.info;

        return (
            <div className={staticFeatures.sectionCompleted}>
                <div><FontAwesomeIcon className={staticFeatures.sectionCompletedIcon} icon={icon}/>
                                                                                    <FontAwesomeIcon className={staticFeatures.sectionCompletedCheck} icon={faCheck}/></div>

                <div>{title}</div>

                <div className={staticFeatures.sectionCompletedInfo}>{info}</div>
            </div>
        );
    }
}