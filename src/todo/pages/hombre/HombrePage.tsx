import React from 'react'
import styled from 'styled-components'
import DivHero from '../../components/header/DivHero'
import Header from '../../components/header/Header'
import Hombre from '../../components/Hombre/Hombre'

const DivContainerMujer = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  justify-content: center;
  align-items: center;
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 2rem;

  &.card-product{
      display: flex;
      flex-direction: column;
  }
`
function HombrePage() {
  return (
    <div>
        <Header />
        <DivHero />
        <h2>Deportivas para Hombres con estilo</h2>
        <DivContainerMujer>
          <Hombre/>
        </DivContainerMujer>
    </div>
  )
}

export default HombrePage