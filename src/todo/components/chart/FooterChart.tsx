import React from 'react'
import styled from 'styled-components';

const DivFooterContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 70%;
`
const DivGastosEnvio = styled.div`
    display: flex;
    justify-content: space-between;
`
const SpanIva = styled.span`
    color: #ababab;
    font-size: 0.75rem;
`
function FooterChart({total}:{total:number}) {
  console.log(total);
  if(total != 0){
  return (
    <DivFooterContent>
        {total > 50 ? 
            <DivGastosEnvio>
                <span>Gastos de envío: </span>
                <span>Gratis</span>
            </DivGastosEnvio>
                : 
            <DivGastosEnvio>
                <span>Gastos de envío: </span>
                <span>4.99€</span>
            </DivGastosEnvio>
        }
        <DivGastosEnvio>
            <div>
                <span><strong>Total estimado </strong></span>
                <SpanIva>Inluyendo IVA</SpanIva> 
            </div>
            {total > 50 ? <span><strong>{total.toFixed(2)}€</strong></span> : <span><strong>{total.toFixed(2)+4.99}€</strong></span>}
        </DivGastosEnvio>
    </DivFooterContent>
  ) 
  }else{
    return(
        <DivFooterContent>
            Añade algún producto al carrito
        </DivFooterContent>
    )
  }
}

export default FooterChart