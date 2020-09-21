import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  
    render(){
        console.log('hello')
        console.log(this.props.match)
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
         return <li key={igKey}> <span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
        } ) 
        return(
            <Auxiliary>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
            <Button 
            btnType="Danger"
            clicked ={this.props.purchaseCancel}
            >CANCEL</Button>
            <Button
            btnType="Success"
            clicked ={this.props.purchaseContinue}
            >CONTINUE </Button>

        </Auxiliary>
        );

    }
 

};
export default OrderSummary;