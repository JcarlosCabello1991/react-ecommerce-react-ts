import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header';
import { TodoContext } from '../../context/TodoContext';
import { contextProps, products } from '../../interfaces/interfaces';
import styled from 'styled-components';
import { getUserData } from '../../users/users';
import Chart from '../../components/chart/Chart';

const DivProccessPayment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap:25rem;
`
const DivFormShipping = styled.div`    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`
const H2 = styled.h2`
    text-align: start;
`
const DivCart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const Input = styled.input`
    width: 20rem;
    height: 2rem;
    border-radius: 0.125rem;
    border: 1px solid #ccc;
`
const DivFieldSetScroll = styled.div`
    height: fit-content;
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
const SpanPrice = styled.span`
    text-align: end;
`
const DivTrashSize = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`
const SpanTotal = styled.span`
    margin-top: 1rem;
    font-size: 1.5rem;
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
    &:hover{
        background-color: #e4c89d;
        color: black;
    }
`
function Checkout() {
  const navigate =  useNavigate();
  const location = useLocation();
  const data: any = location.state;
  let total = 0;

  const[userLogged, setUserLogged] = useState({name:"", lastName:"", email:"", address:"", phone:""})
  const context = useContext<contextProps>(TodoContext);  
  const cart = data.cartContent;

  useEffect(() => {
    if(context.value.auth == true){
        setUserLogged(context.userLogin);
    }
  },[context.value.auth])
  
  const substrackProduct = (id:any, size:any) => {
    let i = 0;
    data.cartContent.map((product:any) => {
        if(product.id == id && product.sizeSelected == size){
            data.cartContent.splice(i,1);
            console.log(data.cartContent);
            context.setChart(data.cartContent);
        }else{
            i++;
        }
    })
  }

  const handleChange = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...userLogged,
        [name]:value
    }
    setUserLogged(newValues);
  }

  return (
    <>
        <Header />
        <DivProccessPayment>
            <DivFormShipping>
                <H2>PAGAR</H2>
                {
                    context.value.auth == true ?
                    <> 
                        <Input value={context.userLogin.name}/> 
                        <Input value={context.userLogin.lastName}/> 
                        <Input value={context.userLogin.email}/> 
                        <Input value={context.userLogin.address}/> 
                        <Input value={context.userLogin.phone}/>
                        <ButtonBuy onClick={() => {navigate("/paymentFinish", {state:{userLogged, cart}})}}>Pagar</ButtonBuy> 
                    </>
                    : 
                    <>
                        <span><strong>Please, Log in to take the 10% discount</strong></span>
                        <span><strong>or continue as guest:</strong></span>
                        <Input name="name" value={userLogged.name} onChange={(e) => {handleChange(e)}}/> 
                        <Input name="lastName" value={userLogged.lastName} onChange={(e) => {handleChange(e)}}/> 
                        <Input name="email" value={userLogged.email} onChange={(e) => {handleChange(e)}}/> 
                        <Input name="address" value={userLogged.address} onChange={(e) => {handleChange(e)}}/> 
                        <Input name="phone" value={userLogged.phone} onChange={(e) => {handleChange(e)}}/>
                        <ButtonBuy onClick={() => {navigate("/paymentFinish", {state:{userLogged}})}}>Pagar</ButtonBuy> 
                        <span></span>
                    </>
                }
            </DivFormShipping>
            <DivCart>
                {/* ticket */}
                <H2>Your chart</H2>
                <DivFieldSetScroll>
                {
                    data.cartContent.map((product: any) => {
                        total += product.price;
                        return(
                            <FielSetProduct key={`${product.id}-fieldset-${product.size}`}>
                                <ImageProduct src={product.img} key={`${product.id}-imageProduct`}/>
                                <DivInfoProduct key={`${product.id}-divInfoProduct`}>
                                    <DivNamePrice key={`${product.id}-divNameProduct`}>
                                        <span key={`${product.id}-spanTitle`}><strong key={`${product.id}-strongtitle`}>{product.title}</strong></span>
                                        <SpanPrice key={`${product.id}-spanPrice`}>{product.price}</SpanPrice>
                                    </DivNamePrice>
                                    <span key={`${product.id}-span-gender`}><strong key={`${product.id}-strongGender`}>Gender: </strong>{product.gender}</span>
                                    <span key={`${product.id}-span-quantity`}><strong key={`${product.id}-strongquantity`}>Quantity: </strong>{product.quantity}</span>
                                    <DivTrashSize>
                                        <span key={`${product.id}-span-size`}><strong key={`${product.id}-strongSize`}>Size: </strong>{product.sizeSelected}</span>                                    
                                        <i key={`${product.id}-iconTrash`} className="fa-solid fa-trash" onClick={() => {substrackProduct(product.id, product.sizeSelected)}}></i>
                                    </DivTrashSize>
                                </DivInfoProduct>
                            </FielSetProduct>
                        )                        
                    })
                }
                </DivFieldSetScroll>
                <SpanTotal><strong>Total: {context.value.auth == true ? (total*0.90).toFixed(2) : total.toFixed(2)}€</strong></SpanTotal>
            </DivCart>
        </DivProccessPayment>
    </>
  )
}

export default Checkout