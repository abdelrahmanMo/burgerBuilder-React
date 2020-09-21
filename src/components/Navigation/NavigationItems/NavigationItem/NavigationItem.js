import React from 'react';
import classses from './NavigationItem.css'
import {NavLink} from 'react-router-dom' 
const navigationItem = (props) => (

    <li className={classses.NavigationItem}>
        <NavLink 
            to={props.link}
            exact
            activeClassName={classses.active}
        >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;