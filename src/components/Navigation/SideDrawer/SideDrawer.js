import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'
const sideDrawer = (props)=>{

    return(
        <Auxiliary>
            <Backdrop show={props.open} clicked = {props.closed} />
        <div className={[classes.SideDrawer,props.open?classes.Open:classes.Close].join(' ')} >
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems/>
             </nav>
        </div>
        </Auxiliary>
    )
};

export default sideDrawer;