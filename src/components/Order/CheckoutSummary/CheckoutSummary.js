import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary'

const checkoutSummary = (props)=>{
    console.log(props.ingredients)
   return(

    <div className={classes.CheckoutSummary}>
        <h1 style={{textAlign:'center'}}>we hope it test well!</h1>
        <div style={{width:'100%',margin:'auto'}}>
        <Burger ingredients={props.ingredients} />
        
        </div>
        <div style={{textAlign:'center'}}>
        <Button 
        btnType="Danger"
        clicked ={props.goBack}
        >CANCEL</Button>
        <Button 
        btnType="Success"
        clicked = {props.checkoutContinue}
        >CONTINUE</Button>
        </div>
    </div>
   );
}
export default checkoutSummary;