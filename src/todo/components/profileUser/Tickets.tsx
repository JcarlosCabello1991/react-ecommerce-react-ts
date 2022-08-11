import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../../context/TodoContext'
import { contextProps } from '../../interfaces/interfaces'
import styled from 'styled-components';
import Ticket from './Ticket';
import { getTickets } from '../../users/users';

const DivContainerPersonal = styled.div`
    padding-top: 1rem;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const SpanHello = styled.span`
    display: flex;
    font-size: 1.5rem;
`
const DivDate = styled.div`
    width: 37rem;
    height: 2rem;
    line-height: 2rem;
    background-color: #ae946d;
    color: white;
    display: flex;
    align-items: flex-start;
    border-radius: 0.125rem;
    margin-top: 1.5rem;
    &:hover{
        background-color: #ab8853;
        color: black;
    }
`
const SpanDate = styled.span`
margin-left: 1.5rem;
    font-weight: bold;
    color: white;
`
const DivContainerTicket = styled.div`
    width: 37rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &.hide{
        display: none;
    }
`
const DivContainerTickets = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`
const SpanLoad = styled.span`
    display: flex;

    &.hide{
        display: none;
    }
`

function Tickets({setPage}:{setPage:React.Dispatch<React.SetStateAction<string>>}) {
  const context = useContext<contextProps>(TodoContext);
  const [charge, setCharge] = useState(false);
  useEffect(()=>{
    getTickets(context.userLogin).then(data => {
        console.log(data);
        
        // context.setTicket(data);
        context.userLogin.tickets = data;
        setCharge(!charge);
        console.log(context.userLogin.tickets);
        loadingData();
      })
  },[context.chart])

  const user = context.userLogin;

  const showTicket = (code: string) => {
    document.getElementById(code)?.classList.toggle("hide");
  }

  const loadingData = () => {
    document.getElementById("load")?.classList.toggle("hide");
    setTimeout(()=>{
        document.getElementById("load")?.classList.toggle("hide");
        setCharge(false);
    },1500)
  }

  return (
    <DivContainerPersonal>
            <SpanHello><strong>Tickets: {context.userLogin.tickets.length} </strong>{charge == true && <SpanLoad id='load' className='hide'> Loadind data...</SpanLoad>}</SpanHello>
        <DivContainerTickets>
        {
            context.userLogin.tickets.length == undefined ?            
                <SpanHello><strong>No tickets availables</strong></SpanHello>
            :
            context.userLogin.tickets.map(ticket =>{
                return(
                    <div>
                        <DivDate onClick={() => {showTicket(ticket.code)}}><SpanDate>{ticket.date}</SpanDate></DivDate>
                        <DivContainerTicket className="hide" id={`${ticket.code}`}>
                            <Ticket id={ticket.code} ticketInfo={ticket}/>
                        </DivContainerTicket>
                    </div>
                )
            })
        }
        </DivContainerTickets>
    </DivContainerPersonal>
  )
}

export default Tickets