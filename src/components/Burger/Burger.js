import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurherIngredient/BurgerIngredient'
import {withRouter} from 'react-router-dom'
const burger = (props)=>{
    

    let transformedIngredients = Object.keys(props.ingredients).map(igKey =>{
       return [...Array(props.ingredients[igKey])].map( ( _, i) =>{
          return <BurgerIngredient key={igKey +i} type={igKey} />
       });
    }).reduce((arr,ele)=>{
        
        return arr.concat(ele)
    },[]) ;
    console.log('burger loop')
    console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients.length === 0 ? <p>please start Making your Burger!</p> : transformedIngredients} 
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default withRouter(burger);