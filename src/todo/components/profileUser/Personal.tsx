import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { TodoContext } from '../../context/TodoContext'
import { contextProps } from '../../interfaces/interfaces'
import { updateUserData } from '../../users/users';


const DivContainerPersonal = styled.div`
    padding-top: 1rem;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const SpanHello = styled.span`
    font-size: 1.5rem;
`
const Input = styled.input`
    height: 2rem;
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    width: 15rem;
`
const Button = styled.button`
    width: 100%;
    border-radius: 0.125px;
    border: #ae946d;
    background-color: #ae946d;
    height: 2rem;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    margin-top: 2.5rem;
    &:hover{
        background-color: #ab8853;
        color: black;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 1rem;
    gap: 1rem;
`
const DivColumn1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1rem;
`
const DivColumn2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5rem;
    gap: 1rem;
    margin-top: 1rem;
`
function Personal({setPage}:{setPage:React.Dispatch<React.SetStateAction<string>>}) {

  const context = useContext<contextProps>(TodoContext);
  const [dataUser, setDataUser] = useState({name:"", lastName:"", email:"", phone:"", address:"", password:"", confirm_password:"", favourites:[], tickets:[]})

  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserData(dataUser,context.userLogin);
  }

  const inputChange = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...dataUser,
        [name]:value
    }
    setDataUser(newValues);
    console.log(dataUser);
    
  }

  return (
    <DivContainerPersonal>
        <SpanHello><strong>Wellcome, {context.userLogin.name}</strong></SpanHello>
        <Form onSubmit={(e) => saveData(e)}>
            <DivColumn1>
                Name
                <Input type="text" name="name" value={dataUser.name} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.name}`}/>
                Last Name
                <Input type="text" name="lastName" value={dataUser.lastName} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.lastName}`}/>
                E-mail
                <Input type="text" name="email" value={dataUser.email} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.email}`}/>
                Phone
                <Input type="text" name="phone" value={dataUser.phone} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.phone}`}/>
            </DivColumn1>
            <DivColumn2>
                Address
                <Input type="text" name="address" value={dataUser.address} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.address}`}/>
                Password
                <Input type='password' name="password" value={dataUser.password} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.password}`}/>
                Confirm Password
                <Input type='password' name="confirm_password" value={dataUser.confirm_password} onChange={(e) => {inputChange(e)}} placeholder={`${context.userLogin.password}`}/>
                <Button>Save</Button>
            </DivColumn2>
        </Form>
    </DivContainerPersonal>
  )
}

export default Personal