import React, { Component } from 'react';
import {connect} from 'react-redux'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'


class BurgerBuilder extends Component{

    componentDidMount(){
        console.log(this.props)
        this.props.onInitIngredients();

    }
    state ={
  
        purchasable:false,
        purchasing: false
    }

   /* updateIngredientHandler = (type,operation) =>{
        const oldIngredientAmount = this.state.ingredientsp[type]
         const newIngredientAmount = operation === 1 ?  oldIngredientAmount+1 : oldIngredientAmount-1 ;
         const updatedIngredient = {...this.state.ingredients}
         updatedIngredient[type] = newIngredientAmount;
         this.setState({ingredients:updatedIngredient})

    }
*/
    
    updatePurchaseState = (ingredients)=>{
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,ele)=>{
           return ele+sum
        },0)
      return sum > 0 
    }

    purchaseHandler = ()=>{
        if(this.props.isAuthenticated)
        {
            this.setState({purchasing:true})
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }


    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }
    purcaseContinueHandler = () => {
        this.props.onInitPurchaes();
      this.props.history.push('/checkout')
     /*  
      
*/
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if(this.props.ings){

        burger=(    
        <Auxiliary>
       
        <Burger
            ingredients = {this.props.ings}
            />
           
            <BuildControls
            isAuth = {this.props.isAuthenticated}
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoved = {this.props.onIngredientRemove}
            disabled = {disabledInfo}
            purchasable = {this.updatePurchaseState(this.props.ings)}
            price = {this.props.price}
            ordered = {this.purchaseHandler}
            />

            </Auxiliary>
        );
        orderSummary = <OrderSummary
        ingredients = {this.props.ings}
        totalPrice = {this.props.price}
        purchaseContinue = {this.purcaseContinueHandler}
        purchaseCancel ={this.purchaseCancelHandler}
    />
    }

        ;
        
        return(
            <Auxiliary>
         
                <Modal show ={this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}
                >
                {orderSummary}
                </Modal>
            {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    };
};

const mapDispatchToProps= dispatch =>{
    return{
        onIngredientAdded:(ingredientName)=>{return dispatch(actions.addIngredient(ingredientName))} ,
        onIngredientRemove:(ingredientName)=>{return dispatch(actions.removeIngredient(ingredientName))},
        onInitIngredients:()=> {return dispatch(actions.initIngredients())},
        onInitPurchaes: () =>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));