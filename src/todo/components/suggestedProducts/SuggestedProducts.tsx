import React, { useContext } from 'react'
import { TodoContext } from '../../context/TodoContext'
import { contextProps, products } from '../../interfaces/interfaces'
import styled from 'styled-components'
import { Link, Outlet } from 'react-router-dom'

const SectionSuggestedProducts = styled.section`
    display: flex;
    flex-direction: column;
`
const DivContainersuggestedProducts = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`
const SuggestedImg = styled.img`
    height: 10rem;

    &:hover{
        border: 1px solid black;
    }
`
const CardSuggestedProduct = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`
function SuggestedProducts({title, price, gender, id}:{title: string, price: number, gender: string, id: number}) {

  const context = useContext<contextProps>(TodoContext)

  let suggestedProducts: Array<products> = [];

  suggestedProducts = context.dashboard.filter(product => ((product.price - price <= 20) || (price - product.price >= 20)) && (product.gender == gender) && (product.id != id))

  if(suggestedProducts.length > 0){
    return (
        <SectionSuggestedProducts>
            <h3>SuggestedProducts</h3>
            <DivContainersuggestedProducts>
                {
                    suggestedProducts.map(suggestedProduct =>{
                        return(     
                            <CardSuggestedProduct>                 
                                <Link to={`/Product/${suggestedProduct.id}`}>
                                    <SuggestedImg src={suggestedProduct.img} />
                                </Link>
                                <span><strong>{suggestedProduct.title}</strong></span>  
                                <span>{suggestedProduct.price}€</span>  
                            </CardSuggestedProduct> 
                        )
                    })
                }
            </DivContainersuggestedProducts>
        </SectionSuggestedProducts>
    )
  }else{
    return(
        <SectionSuggestedProducts>
            <h3>Sorry, we don´t have any suggested products</h3>
        </SectionSuggestedProducts>
    )
  }
}

export default SuggestedProducts