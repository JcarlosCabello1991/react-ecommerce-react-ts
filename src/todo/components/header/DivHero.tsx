import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ImgTop = styled.img`
    width: 100%;
`
const DivMainHero = styled.div`
    text-align: left;
`
const SpanTopModel = styled.span`
position: absolute;
margin-top: 1rem;
margin-left: -98%;
font-size: 2vw;
font-weight: bold;
`
const ButtonTopModel = styled.button`
    position: absolute;
    margin-top: 5.5vw;
    margin-left: -98%;
    background-color: black;
    color: white;
    width: 8vw;
    height: 2.5vw;
    font-size: 0.9vw;
    font-weight: bold;
`
function DivHero() {
  const navigate = useNavigate();
  return (
    <DivMainHero>
        <ImgTop src='../../../../images/bannerPuma.webp'/>
        <SpanTopModel>Modelo destacado</SpanTopModel>
        <ButtonTopModel onClick={() => {navigate("/Product/104")}}>Comprar ahora</ButtonTopModel>
    </DivMainHero>
  )
}

export default DivHero