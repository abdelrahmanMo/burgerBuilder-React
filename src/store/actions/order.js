import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }

}

export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
};


export const purchaseBurger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then(response=>{
        dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        }).catch(error=>{
            dispatch(purchaseBurgerFail(error))
             
        })
    }
}

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
    
};

export const fetchOrdersStart = () =>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersSuccess = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail =(error)=>{
    return{
        type:actionTypes.FEATCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrders = (token)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth='+token)
        .then( response =>{
            const featchOrders = []
            for(let key in response.data){
                featchOrders.push({...response.data[key],id:key});
            }
            dispatch(fetchOrdersSuccess(featchOrders))
        })
        .catch(error=>{
            dispatch(fetchOrderFail(error))
            
        })
    }
}