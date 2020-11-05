import * as actionTypes from '../actions/actionTypes'

const initialState ={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
};
const INGREDIENT_PRICE = {
    salad:.5,
    bacon:2.5,
    cheese:2,
    meat:3.5
}
const reducer =(state = initialState,action) =>{

    switch (action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1,
                    
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName],
                building:true

            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICE[action.ingredientName],
                building:true
            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients : {
                    
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                totalPrice:4,
                error:false,
                building:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default:
            return state;
    }
    
};

export default reducer;