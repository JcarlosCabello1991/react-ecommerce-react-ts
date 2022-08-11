import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TodoContext } from '../../context/TodoContext'
import { contextProps } from '../../interfaces/interfaces'

const DivForm = styled.div`
    padding-top: 1.5rem;
    width: 15rem;
    height: max-content;
    padding-bottom: 1.5rem;
    z-index: 1600;
    background-color: #fff;
    margin-left: 89vw;//
    box-shadow: 0.625rem 0.625rem 0.625rem 0.9375rem rgb(0 0 0 / 5%);
    position: fixed;
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    text-align: start;
    &.hide{
        display: none;
    }
`
const Hr = styled.hr`
    width: 80%;
    background-color: #efeeee;
`
const Span = styled.span`
    padding-left: 1.5rem;
`
const ButtonLogOut = styled.button`
    width: 83%;
    height: 2rem;
    background-color: #b7a07d;
    border-radius: 0.125rem;
    border: 1px solid #b7a07d;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    margin-left: 1.5rem;
    &:hover{
        background-color: #e4c89d;
        color: black;
    }
`
function UserActions() {
  const context = useContext<contextProps>(TodoContext);
  const navigate = useNavigate();

  const handleForm = () => {
    document.getElementById("div-LogOut")?.classList.toggle("hide");
  }

  return (
    <DivForm id="div-LogOut">
         <Link to={`/Profile/${context.userLogin.id}`} style={{ textDecoration: 'none',color: 'black' }}><Span>Profile</Span></Link>
        <Hr/>
        <ButtonLogOut type='submit' id='button-SignUp' onClick={() => {handleForm();context.value.logOut(); navigate("/")}}>Log out</ButtonLogOut>
    </DivForm>
  )
}

export default UserActions
