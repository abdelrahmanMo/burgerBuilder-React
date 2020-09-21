import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then( response =>{
            const featchOrders = []
            for(let key in response.data){
                featchOrders.push({...response.data[key],id:key});
            }
            
            this.setState({orders:featchOrders,loading:false})
            console.log(featchOrders)
        })
        .catch(error=>{
            console.log(error)
            this.setState({loading:false})
        })
    }
 
    render(){
        const orders = this.state.orders.map((order) => {
           return <Order ingredients ={order.ingredients} 
            price ={order.price}
           key={order.id} />
        });
        return(

            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);