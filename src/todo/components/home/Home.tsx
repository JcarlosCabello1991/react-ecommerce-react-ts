import { useContext, useEffect, useState } from "react"
import { TodoContext } from "../../context/TodoContext"
import { contextProps, products } from "../../interfaces/interfaces";
import Header from "../header/Header";
import DivHero from "../header/DivHero";
import styled from 'styled-components'
import { Link, Outlet } from "react-router-dom";
import Hombre from "../Hombre/Hombre";
import Mujer from "../mujer/Mujer";
import ResultsSearch from "../resultsSearch/ResultsSearch";

const Image = styled.img`
    &.img-product-dashboard{
        height: 20rem;
        border-radius: 15px;
    }
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

    const H2 = styled.h2`
        text-align: left;
        margin-left: 12vw;
        font-size: 1.3vw;
    `

    const DivFooterCard = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
    `
    
function Home() {
  
  const context = useContext<contextProps>(TodoContext); 
  
  const titleToSearch: Array<products> = context.productsToShow;

  if(titleToSearch.length == context.dashboard.length){
      context.setProductsToShow(context.dashboard);
    return (
        <>
            <Header />
            <DivHero />
            <H2>HOMBRE</H2>
            <Div>
                <Hombre />
            </Div>
            <H2>MUJER</H2>
            <Div>
                <Mujer />
            </Div>
        </>
    )
  }else{
        return(
            <>
                <Header />
                <DivHero />
                <h2>Resultados de búsqueda</h2>
                <Div>
                    <ResultsSearch />
                </Div>
            </>
        )
  }
}

export default Home
