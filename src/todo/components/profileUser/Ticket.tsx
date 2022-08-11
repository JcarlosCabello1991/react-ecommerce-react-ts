import React from 'react'
import { ticket } from '../../interfaces/interfaces'
import styled from 'styled-components';

const DivProductsTicket = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    align-items: flex-start;
`
const Image = styled.img`
    height: 5rem;
`
const Fieldset = styled.fieldset`
    margin-top: 1rem;
    border: 0.1px solid #ccc;
`
function Ticket({id,ticketInfo}:{id:string, ticketInfo:ticket}) {
  const ticket = ticketInfo.ticket;
  console.log(ticket);
  
  return (
    <>
        {
            ticket.map(t => {
                return(
                    <Fieldset>
                        <DivProductsTicket>
                            <strong>ID</strong>
                            <strong>Image</strong>
                            <strong>Name</strong>
                            <strong>Gender</strong>
                            <strong>Size</strong>
                            <strong>Price</strong>
                            <strong>Quantity</strong>
                            <span>{t.id}</span>
                            <Image src={t.img}/>
                            <span>{t.title}</span>
                            <span>{t.gender}</span>
                            <span>{t.sizeSelected}</span>
                            <span>{t.price}</span>
                            <span>{t.quantity}</span>
                        </DivProductsTicket>
                    </Fieldset>
                )
            })
        }      
    </>
  )
}

export default Ticket