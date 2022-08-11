import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/header/Header';
import { TodoContext } from '../../context/TodoContext';
import { contextProps } from '../../interfaces/interfaces';
import { addTicket } from '../../users/users';


const ImgLogo = styled.img`
    height: 20rem;
`
const DivFinish = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
`
const ButtonBuy = styled.button`
    width: 10rem;
    border-radius: 0.125px;
    border: #ae946d;
    background-color: #ae946d;
    height: 2rem;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    &:hover{
        background-color: #e4c89d;
        color: black;
    }
`
function PaymentFinish() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext<contextProps>(TodoContext);

  const params: any = location.state;

  if(context.value.auth == true){
    //Guardamos su pedido en tickets de usuario
    addTicket(params.userLogged.id, params.cart)

  }
  
  return (
    <div>
        <Header/>
        <h2>Thank you, {params.userLogged.name}</h2>
        <DivFinish>
            <ImgLogo src="../../../../images/shipping.png"/>
            <span><strong>Your shipping will be send to: </strong></span>
            <span><strong>{params.userLogged.address}</strong></span>
        </DivFinish>
        <ButtonBuy onClick={() => {context.setChart([]);navigate("/")}}>Go to Home</ButtonBuy> 
    </div>
  )
}

export default PaymentFinish