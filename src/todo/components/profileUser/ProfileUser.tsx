import React, { useContext, useState } from 'react'
import { TodoContext } from '../../context/TodoContext';
import TodoProvider from '../../context/TodoProvider'
import { contextProps } from '../../interfaces/interfaces'
import AsideProfileUser from '../asideProfileUser/AsideProfileUser';
import Header from '../header/Header';
import styled from 'styled-components';
import Personal from './Personal';
import Tickets from './Tickets';
import Home from '../home/Home';

const DivContainerSectionProfile = styled.div`
    display: flex;
    flex-direction: row;
`
function ProfileUser() {
  const context = useContext<contextProps>(TodoContext);
  const [page, setPage] = useState("personal");  

  if(context.value.auth == true){
  return (
    <>
    <Header />
    <DivContainerSectionProfile>
        <AsideProfileUser setPage={setPage}/>
        {page == "personal" && <Personal setPage={setPage}/>}
        {page == "tickets" && <Tickets setPage={setPage}/>}
    </DivContainerSectionProfile>
    </>
  )
  }else{
    return(
    <Home/>
    )
  }
}

export default ProfileUser