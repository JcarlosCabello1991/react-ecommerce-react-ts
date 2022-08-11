import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TodoContext } from '../../context/TodoContext'
import { getFavouritesUser } from '../../favourites/favourites'
import { contextProps } from '../../interfaces/interfaces'
import { addNewUser, checkUserLogin, getId, getUserData } from '../../users/users'

const DivForm = styled.div`
    padding-top: 1.5rem;
    width: 20rem;
    height: max-content;
    padding-bottom: 1.5rem;
    z-index: 1600;
    background-color: white;
    margin-left: 85.5vw;//
    box-shadow: 0.625rem 0.625rem 0.625rem 0.9375rem rgb(0 0 0 / 5%);
    position: fixed;
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;

    &.hide{
        display: none;
    }
`
const Divlinks = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const InputForm = styled.input`
    border: 1px solid #ccc;
    height: 2rem;
    width: 80%;
    margin-bottom: 1rem;    
`
const ButtonLogin = styled.button`
    width: 83%;
    height: 2rem;
    background-color: #b7a07d;
    border-radius: 0.125rem;
    border: 1px solid #b7a07d;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;

    &:hover{
        background-color: #e4c89d;
        color: black;
    }
`
const DivForgotPass = styled.div`
    width: 83%;
    text-align: start;
    font-size: 0.85rem;
    padding-left: 1.7rem;
    color: #afaeae;
`

const DivActionForm = styled.div`
    display: flex;
    width: 83%;
    padding-left: 2rem;
    gap: 1rem;
`
const SpanOption = styled.span`
    width: 5rem;
    height: 1.5rem;
    &.selected{
        background-color: #ccc;
    }
    &:hover{
        cursor: pointer;
    }
`
const DivErrorPassword = styled.div`
    width: 83%;
    height: 2rem;
    margin-left: 1.7rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffc1c1;
    &.hide{
        display: none;
    }
`
const DivErrorLogin = styled.div`
    width: 83%;//83
    height: 2rem;
    margin-left: 1.7rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffc1c1;
    &.hide{
        display: none;
    }
`
const DialogForgotPassword = styled.dialog`
    
`
const FormForgotPassword = styled.form`
    
`
const InputForgotPassword = styled.input`
    
`
const ButtonForgotPassword = styled.button`
    
`
function FormLogin() {
  const context = useContext<contextProps>(TodoContext);
  const navigate = useNavigate();
  let userId = 0;
  const [form, setForm] = useState("in");
  const [valuesLogin, setValuesLogin] = useState({email: "", password: ""});
  const [valuesSignUp, setValuesSignUp] = useState({id: userId,name:"", lastName: "", email:"", phone:"", address: "",password:"", confirm_password: "", favourites:[], tickets:[]});
  const [hide, setHide] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const handleValueLogin = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues={
        ...valuesLogin,
        [name]:value
    }
    setValuesLogin(newValues);
  }

  const handleValueSignUp = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...valuesSignUp,
        [name]:value
    }
    setValuesSignUp(newValues);
  }

  const submitLogin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //funcion checkUser if login is correct div en login a verde, auth a true funcion login
    checkUserLogin(valuesLogin).then(data => {    
        
        if(data == true){
            setLoginError(false);

            getUserData(valuesLogin).then(data => {
                
                //Go to CEO Page
                if(data.email == "boss@puma.com"){
                    navigate("/ceoPage");
                }
                context.setUserLogin(data);
                context.value.login();

                getFavouritesUser(data).then(response => {
                    context.setFavourites(response);
                })                
            })
            document.getElementById("form-login")?.classList.toggle("hide");
        }else{
            document.getElementById("containerErrorLogin")?.classList.toggle("hide");
            setLoginError(true);
        }
    })
  }

  const submitSignUp = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(valuesSignUp.confirm_password != "" && (valuesSignUp.confirm_password == valuesSignUp.password)){
        //Mandamos los datos a la función addUser para que realice un post de ese usuario
        getId().then(data => {
            userId = data+1;
            console.log(userId);
            valuesSignUp.id = userId;
            addNewUser(valuesSignUp).then(response =>{
                //Aqui tenemos que setear el valor de auth y login para que aparezca un div circulo en verde en el icono del header(autenticacion automatica)
                context.setUserLogin(response);
                context.value.login();
                document.getElementById("form-login")?.classList.toggle("hide");
            });            
        });
    }

    if(valuesSignUp.confirm_password != "" && (valuesSignUp.confirm_password != valuesSignUp.password)){
        document.getElementById("containerError")?.classList.toggle("hide");
        setHide(false);
    }
  }

  const showFormForgotPassword = () => {
    navigate("/forgotPassword");
  }

  if(form == "in"){
  return (
    <DivForm id='form-login'>
        <DivActionForm>
            <SpanOption className='span-option selected' onClick={() => {setForm("in")}}>Sign in</SpanOption>
            <SpanOption className='span-option' onClick={() => {setForm("up")}}>Sign up</SpanOption>
        </DivActionForm>
        <Divlinks>
            <form onSubmit={(e) => {submitLogin(e)}}>
                <InputForm type="text" name="email" value={valuesLogin.email} onChange={handleValueLogin} placeholder="Email" required/>
                <InputForm type="password" name="password" value={valuesLogin.password} onChange={handleValueLogin} placeholder="Password" required/>
                <DivForgotPass><span onClick={showFormForgotPassword}>Forgot password?</span></DivForgotPass>
                <DivErrorLogin className='hide' id='containerErrorLogin'>
                    {loginError == true && <span>Email/password wrong</span>}
                </DivErrorLogin>
                <ButtonLogin type='submit'>Login</ButtonLogin>
            </form>
        </Divlinks>
    </DivForm>
  )
  }else{
    return(
    <DivForm id='form-login'>
        <DivActionForm>
            <SpanOption className='span-option' onClick={() => {setForm("in")}}>Sign in</SpanOption>
            <SpanOption className='span-option selected' onClick={() => {setForm("up")}}>Sign up</SpanOption>
        </DivActionForm>
        <Divlinks>
            {/* Meter un form para crear el usuario: Nombre, apellidos, dirección, email, phone y password y crear una seccion favoritos y pedidos */}
            <form onSubmit={(e) => {submitSignUp(e)}}>
                <InputForm type="text" name="name" value={valuesSignUp.name} onChange={handleValueSignUp} placeholder="Name" required/>
                <InputForm type="text" name="lastName" value={valuesSignUp.lastName} onChange={handleValueSignUp} placeholder="Last name" required/>
                <InputForm type="text" name="email" value={valuesSignUp.email} onChange={handleValueSignUp} placeholder="Email" required/>
                <InputForm type="text" name="phone" value={valuesSignUp.phone} onChange={handleValueSignUp} maxLength={9} placeholder="phone" required/>
                <InputForm type="text" name="address" value={valuesSignUp.address} onChange={handleValueSignUp} placeholder="Address" required/>
                <InputForm type="password" name="password" value={valuesSignUp.password} onChange={handleValueSignUp} placeholder="Password" required/>
                <InputForm type="password" name="confirm_password" value={valuesSignUp.confirm_password} onChange={handleValueSignUp} placeholder="Confirm Password" required/>
                <DivErrorPassword id='containerError' className='hide'>
                    {hide == false && <span>Passwords do not matches</span>}
                </DivErrorPassword>
                <ButtonLogin type='submit' id='button-SignUp'>Create account</ButtonLogin>
            </form>
        </Divlinks>
    </DivForm>
    )
  }
}

export default FormLogin