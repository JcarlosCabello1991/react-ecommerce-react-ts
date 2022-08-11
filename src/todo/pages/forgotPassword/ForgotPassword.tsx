import React, { useContext, useState } from 'react'
import Header from '../../components/header/Header'
import styled from 'styled-components'
import { updateForgotPassword } from '../../users/users'
import { useNavigate } from 'react-router-dom'
import { contextProps } from '../../interfaces/interfaces'
import { TodoContext } from '../../context/TodoContext'
import { getFavouritesUser } from '../../favourites/favourites'

const DivContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Fieldset = styled.fieldset`
    margin-top: 1rem;
    border: 1px solid #ccc;
    width: 25rem;
    padding-top: 1rem;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`
const Input = styled.input`
    width: 80%;
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    height: 2rem;
`
const Button = styled.button`
    width: 82%;
    background-color: #b7a07d;
    border: 1px solid #b7a07d;
    color: white;
    height: 2rem;
    font-weight: bold;
    font-size: 1.5rem;

    &:hover{
        background-color:  #e4c89d;
        color: black;
    }
`
const SpanError = styled.span`
    color: red;
    &.hide{
        display: none;
    }
`
function ForgotPassword() {
  const navigate = useNavigate();
  const context = useContext<contextProps>(TodoContext);
  const [data, setData] = useState({email:"", password:"", confirm_password:""})

  const changeInput = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...data,
        [name]:value
    }
    setData(newValues);
  }

  const saveDataPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(data.confirm_password != data.password){
        document.getElementById("error-Forgot")?.classList.toggle("hide");
    }else{
        updateForgotPassword(data).then(answer => {
            if(answer){
                getFavouritesUser(answer).then(response => {
                    context.setFavourites(response);
                })                
                context.setUserLogin(answer);
                context.value.login();
                navigate("/");
            }
        })
    }
  }
  return (
    <>
       <Header />
       <DivContainer>
        <strong>Forgot Password?</strong>
            <Fieldset>
                <Form>
                    <Input type="text" name="email" value={data.email} onChange={(e) => {changeInput(e)}} placeholder='email' required/>    
                    <Input type="password" name="password" value={data.password} onChange={(e) => {changeInput(e)}} placeholder='password' required/>    
                    <Input type="password" name="confirm_password" value={data.confirm_password} onChange={(e) => {changeInput(e)}} placeholder='confirm password' required/>
                    <SpanError id="error-Forgot" className="hide">Email/password invalid</SpanError>
                    <Button onClick={(e) => {saveDataPassword(e)}}>Save</Button>    
                </Form> 
            </Fieldset>
       </DivContainer> 
    </>
  )
}

export default ForgotPassword