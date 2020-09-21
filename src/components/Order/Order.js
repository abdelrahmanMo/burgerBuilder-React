import React from 'react';
import classes from './Order.css'

const order = (props)=>{

    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name:ingredientName,
                amount:props.ingredients[ingredientName]
            }
        )
    }
    const ingredientsParagraoh = ingredients.map(ingre =>{
        return <span 
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding:'5px'
        }}
        key={ingre.name}> {ingre.name}({ingre.amount}) </span>
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients:  {ingredientsParagraoh}</p>
            
            <p>Price: <strong> USD {props.price} </strong></p>
        </div>
    )
}

export default order;