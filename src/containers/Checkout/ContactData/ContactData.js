
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as orderActions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Postal Code'
                    },
                    value:'' ,
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}
                        ]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true
                 
                }
        } 
        ,
         formIsValid:false
    }
    orderHandler = (event)=>{
        event.preventDefault();
      
        const formData = {};
        for(let formElementId in this.state.orderForm){
             formData[formElementId] = this.state.orderForm[formElementId].value
  
        }
       const order ={
            ingredients: this.props.ings,
            price: this.props.price,
            orderDate:formData
           
        }
        this.props.onOrderburger(order,this.props.token)
    }
    checkValidity(value,rules){
        
        let isValid=true
        if(rules.required){
            isValid =value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid =value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        console.log(value.length +' : ' +rules.maxLength )
        return isValid;
    }

    inputChangedHandler=(event,inputid)=>{
      
        const updatedOrderForm ={
            ...this.state.orderForm 
        }
        const updateFormElement = {
            ...updatedOrderForm[inputid]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value,updateFormElement.validation)
        updateFormElement.touched = true
        updatedOrderForm[inputid] = updateFormElement;
       let formIsValid = true;
       for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
       }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
        
    }
    render(){
        const formElementsArray =[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form =(<form onSubmit={this.orderHandler}>

            {
                formElementsArray.map(formElement=>{
                 return   <Input 
                    key ={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value ={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate ={formElement.config.validation}
                    touched = {formElement.config.touched}
                
                    changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                })
            }
           <Button btnType="Success"  disabled={!this.state.formIsValid}>ORDER</Button>
           </form>);
        if(this.props.loading){
            form = <Spinner></Spinner>
        }
    return(
        <div className={classes.ContactData}>
            <h4> Enter your Contact Data</h4>
            {form}
        </div>
    );    
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrices,
        loading:state.order.loading,
        token:state.auth.token
    };
}
const mapDispatchToProps = dispatch =>{
    return{
        onOrderburger: (orderData,token) =>{dispatch(orderActions.purchaseBurger(orderData,token))}
    }
    
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));