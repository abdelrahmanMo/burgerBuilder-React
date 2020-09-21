import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
const INGREDIENT_PRICE = {
            salad:.5,
            bacon:2.5,
            cheese:2,
            meat:3.5
}
class BurgerBuilder extends Component{

    componentDidMount(){
     axios.get('ingredients.json')
        .then(response =>{
           
            this.setState({ingredients:response.data})
        }).catch(error=>{
            console.log(error)
        })
    }
    state ={
        ingredients :{},
        totalPrice: 10,
        purchasable:false,
        purchasing: false,
        loading :false
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
        this.setState({purchasable:sum > 0 })
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }



    addIngredientHandler= (type) =>{
         const oldIngredientAmount = this.state.ingredients[type]
         const newIngredientAmount = oldIngredientAmount+1;
         const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type]
         const updatedIngredient = {...this.state.ingredients}
         updatedIngredient[type] = newIngredientAmount;
         
         this.setState({ingredients:updatedIngredient,totalPrice:newTotalPrice})
         this.updatePurchaseState(updatedIngredient)
    }

    removeIngredientHandler = (type)=>{
        const oldIngredientAmount = this.state.ingredients[type]
        if(oldIngredientAmount<=0){
            return;
        }
         const newIngredientAmount = oldIngredientAmount-1;
         const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type]
         const updatedIngredient = {...this.state.ingredients}
         updatedIngredient[type] = newIngredientAmount;
         this.setState({ingredients:updatedIngredient,totalPrice:newTotalPrice})
         this.updatePurchaseState(updatedIngredient)
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }
    purcaseContinueHandler = () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&');
      this.props.history.push({
        pathname:'checkout',
        search:'?'+queryString
        })
     /*  
      
*/
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = <OrderSummary
        ingredients = {this.state.ingredients}
        totalPrice = {this.state.totalPrice}
        purchaseContinue = {this.purcaseContinueHandler}
        purchaseCancel ={this.purchaseCancelHandler}
    />;
        if(this.state.loading){
            orderSummary =  <Spinner />
        }
        return(
            <Auxiliary>
         
                <Modal show ={this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}
                >
                {orderSummary}
                </Modal>
            <Burger
            ingredients = {this.state.ingredients}
            />
            <BuildControls
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabled = {disabledInfo}
            purchasable = {this.state.purchasable}
            price = {this.state.totalPrice}
            ordered = {this.purchaseHandler}
            />
            </Auxiliary>
        );
    }
}


export default withErrorHandler(BurgerBuilder,axios);