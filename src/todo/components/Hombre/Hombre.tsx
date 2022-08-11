import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { TodoContext } from '../../context/TodoContext'
import { contextProps } from '../../interfaces/interfaces'
import styled from 'styled-components'

const DivFooterCard = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
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
function Hombre() {
  const context = useContext<contextProps>(TodoContext);
  
  return (
    <>
    {
        context.productsToShow.map((product:any) => {
            if(product.gender == "man"){
                return(
                    <>  
                        <Div key={`${product.id}-cardContainer`}className="card-product">
                            <Link to={`/Product/${product.id}`} key={`${product.id}-link`}>
                                <Image key={product.id} className="img-product-dashboard" src={product.img}/>
                            </Link>
                            <DivFooterCard>
                                <Span key={`${product.id}-title`} className="title-product">{product.title}</Span>
                                <Span key={`${product.id}-price`} className="price-product">{product.price}€</Span>
                            </DivFooterCard>
                        </Div>
                        <Outlet/>
                    </>
                )   
            }
        })
    }
    </>
  )
}

export default Hombre