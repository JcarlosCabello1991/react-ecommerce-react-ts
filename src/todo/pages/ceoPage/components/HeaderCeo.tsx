import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TodoContext } from '../../../context/TodoContext'
import { contextProps } from '../../../interfaces/interfaces'

const Div = styled.div`
    width: 100%;
    height: 5rem;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Span = styled.span`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 2rem;
`
const SpanG = styled.span`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right:2rem;
    cursor: pointer;
`
function HeaderCeo() {
  const navigate = useNavigate();
  const context = useContext<contextProps>(TodoContext);

  const goHome = () => {
    context.value.logOut();
    navigate("/");
  }
  return (
    <Div>
        <Span>Puma´s CEO Page</Span>
        <SpanG onClick={goHome}>Go Home</SpanG>       
    </Div>
  )
}

export default HeaderCeo