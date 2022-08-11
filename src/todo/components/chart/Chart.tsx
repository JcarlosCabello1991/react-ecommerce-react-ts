import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TodoContext } from '../../context/TodoContext'
import { contextProps, products } from '../../interfaces/interfaces'
import FooterChart from './FooterChart'

const DivContainerChart = styled.div`
    width: 33.125rem;
    height: 100%;
    z-index: 1600;
    background-color: white;
    position: fixed;
    margin-left: 80vw;
    box-shadow: 0.625rem 0.625rem 0.625rem 0.9375rem rgb(0 0 0 / 5%);

`
const DivChart = styled.div`
    position: absolute;
    text-align: center;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
`
const DivHeader = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`
const FielSetProduct = styled.fieldset`
    display: flex;
    margin-top: 1rem;
    border: 0.1px solid #ccc;
    gap: 1rem;
    width: 22rem;
`
const ImageProduct = styled.img`
    height: 5rem;
`
const DivInfoProduct = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
`
const DivNamePrice = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: start;
    align-items: center;
    gap: 2rem;
`
const IconPlus = styled.i`
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SpanCounter = styled.span`
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const IconMinus = styled.i`
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DivCounterChartProduct = styled.div`
    display: flex;
    margin-top: 1rem;
    height: 1.5rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`
const DivFlexBeetweenCounterTrash = styled.div`
    display: flex;
    width: 100%;
    padding-right: 2rem;
`
const DivHeightInfo = styled.div`
    height: 52em;
`
const SpanPrice = styled.span`
    text-align: end;
`
const DivBtnBuy = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`
const ButtonBuy = styled.button`
    width: 100%;
    border-radius: 0.125px;
    border: #ae946d;
    background-color: #ae946d;
    height: 2rem;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
`
const DivFieldSetScroll = styled.div`
    height: 50rem;
    overflow-y: scroll;
`
const IconClose = styled.i`
    margin-right: 5rem;
`
function Chart({chart, setChart, count, setCount, contentCart, setContentCart, setShowChart}:{chart:boolean, setChart:React.Dispatch<React.SetStateAction<boolean>>,count:number, setCount: React.Dispatch<React.SetStateAction<number>>,
contentCart: Array<products>, setContentCart: React.Dispatch<React.SetStateAction<products[]>>, setShowChart: React.Dispatch<React.SetStateAction<boolean>>}) {
  
    const navigate = useNavigate();
  const context = useContext<contextProps>(TodoContext);
  const [cartLength, setCartLength] = useState(context.chart.length);
  const [cartContent, setCartContent] = useState(context.chart);
  const [counterProduct, setCounterProduct] = useState(0)
  const cart:Array<products> = context.chart;
  
  const substrackProduct = (id:any, size:any) => {
    let i = 0;
    cart.map(product => {
        if(product.id == id && product.sizeSelected == size){
            cart.splice(i,1);
            context.setChart(cart);            
            setCartLength(cart.length);
            setCartContent(context.chart);
            setCount(cart.length);
            // setContentCart(cart);
            context.setChart(cart);
            if(cart.length == 0){
                setShowChart(false);
            }
        }else{
            i++;
        }
    })
  }

  const plusQuantity = (p:any) => {
    p.quantity += 1;
    setCounterProduct(prevState => prevState +1);
  }

  const substrackQuantity = (p:any) => {
    if(p.quantity > 1){
        p.quantity -= 1;
        setCounterProduct(prevState => prevState - 1);
    }
  }

  let sum = 0;
  cartContent.map(product => {
    sum += (product.quantity*product.price);
  })

  return (
    <DivContainerChart>
        <DivChart>
            <DivHeightInfo>
            <DivHeader>
                <span><strong>My chart{` (${cartLength})`}</strong></span>
                <IconClose className="fa-solid fa-xmark" onClick={() => {setChart(!chart)}}></IconClose>
            </DivHeader>
            <DivFieldSetScroll>
            {
                cartContent.map(product => {                                        
                    return(
                        <FielSetProduct key={`${product.id}-fieldset`}>
                            <ImageProduct src={product.img} key={`${product.id}-imageProduct`}/>
                            <DivInfoProduct key={`${product.id}-divInfoProduct`}>
                                <DivNamePrice key={`${product.id}-divNameProduct`}>
                                    <span key={`${product.id}-spanTitle`}><strong key={`${product.id}-strongtitle`}>{product.title}</strong></span>
                                    <SpanPrice key={`${product.id}-spanPrice`}>{product.price}</SpanPrice>
                                </DivNamePrice>
                                <span key={`${product.id}-span-gender`}><strong key={`${product.id}-strongGender`}>Gender: </strong>{product.gender}</span>
                                <span key={`${product.id}-span-size`}><strong key={`${product.id}-strongSize`}>Size: </strong>{product.sizeSelected}</span>
                                <DivCounterChartProduct>
                                    <DivFlexBeetweenCounterTrash>
                                        <IconPlus className="fa-solid fa-plus" onClick={() => {plusQuantity(product)}}></IconPlus>
                                        <SpanCounter>{product.quantity}</SpanCounter>
                                        <IconMinus className="fa-solid fa-minus" onClick={() => {substrackQuantity(product)}}></IconMinus>
                                    </DivFlexBeetweenCounterTrash>
                                    <i key={`${product.id}-iconTrash`} className="fa-solid fa-trash" onClick={() => {substrackProduct(product.id, product.sizeSelected)}}></i>
                                </DivCounterChartProduct>
                            </DivInfoProduct>
                        </FielSetProduct>
                    )
                })
            }
            </DivFieldSetScroll>
            </DivHeightInfo>
            <FooterChart total={sum}/>
            <DivBtnBuy>
                <ButtonBuy onClick={() => {navigate("/checkout", {state:{cartContent}})}}>Comprar</ButtonBuy>
            </DivBtnBuy>
        </DivChart>
    </DivContainerChart>
  )
}


export default Chart