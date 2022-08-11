import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import DivHero from '../../components/header/DivHero'
import Header from '../../components/header/Header'
import Mujer from '../../components/mujer/Mujer'
import { TodoContext } from '../../context/TodoContext'
import { contextProps, products } from '../../interfaces/interfaces'
import { Link, Outlet, useLocation } from 'react-router-dom'
import TodoProvider from '../../context/TodoProvider'

const DivContainerMujer = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  justify-content: center;
  align-items: center;
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 2rem;

  &.card-product{
      display: flex;
      flex-direction: column;
  }
`
const DivFooterCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const IconFav = styled.i`
        
`
const Div = styled.div`
display: grid;
grid-template-columns: repeat(4,1fr);
justify-content: center;
align-items: center;
width: 80%;
padding-left: 10%;
padding-right: 10%;
margin-bottom: 2rem;

&.card-product{
    display: flex;
    flex-direction: column;
}
`

const Span = styled.span`
    &.title-product{
        font-style: italic;
        font-weight: bold;
    }

    &.price-product{
        color: green;
    }
`
const Image = styled.img`
    &.img-product-dashboard{
        height: 20rem;
        border-radius: 15px;
    }
`
function MujerPage() {
  
  const context = useContext<contextProps>(TodoContext);
  const fav: Array<products> = context.favourites;

  return (
    <div>
      <Header />
      <DivHero />
      <h2>Deportivas para Mujeres con estilo</h2>
      <DivContainerMujer>
        <Mujer />            
      </DivContainerMujer>
    </div>
  )
}

export default MujerPage