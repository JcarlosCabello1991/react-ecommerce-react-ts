import React from 'react'
import styled from 'styled-components'

const Aside = styled.aside`
    width: 10rem;
    height: 100vh;
    background-color: black;
`

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left:1rem;
    padding-right: 1rem;
`
const Li = styled.li`
    color: white;
    cursor: pointer;
`
const Hr = styled.hr`
    width: 100%;
    color: #b8b8b8;
`
function AsideProfileUser({setPage}:{setPage:React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <Aside>
        <Ul>
            <Li onClick={() => {setPage("personal")}}>Personal</Li>
            <Hr/>
            <Li onClick={() => {setPage("tickets")}}>Tickets</Li>
        </Ul>
    </Aside>
  )
}

export default AsideProfileUser