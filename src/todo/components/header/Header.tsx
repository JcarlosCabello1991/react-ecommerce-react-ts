import { globalAgent } from 'http'
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { isContext } from 'vm'
import { TodoContext } from '../../context/TodoContext'
import { contextProps, products } from '../../interfaces/interfaces'
import Chart from '../chart/Chart'
import FormLogin from '../forms/FormLogin'
import Favourites from '../listFavourites/Favourites'
import UserActions from '../userActions/UserActions'

const HeaderMessage = styled.header`
background-color: #fee0a9;
`
const Nav = styled.nav`
    background-color: black;
    display: flex;
    justify-content: space-between;
    padding-right: 1vw;
    position: sticky;
    width: 99%;
    top: 0%;
`
const Section = styled.section`
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    height: 5rem;
`
const Ul = styled.ul`
    list-style: none;
    display: flex;
    gap: 2rem;
    font-weight: bold;
`
const Li = styled.li`
    color: white;
`

const MainOffers = styled.div`
    background-color: #6fe0e0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const UlOffers = styled.ul`
    display: flex;
    list-style: none;
    gap: 0.5rem;
    margin-top: 0.3rem;
`

const LiOffers = styled.li`
    
`
const SpanIconSearch = styled.span`
    position: absolute;
    padding-left: 0.4vw;
    padding-top: 0.3vh;
    font-size: 2vh;
`
const Icon = styled.i`
    color: white;
`

const Input = styled.input`
    background-color: transparent;
    border: 0.1px solid #ccc;
    height: 3vh;
    color: white;
    text-align: end;
`
const DivSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`
const DivCounterChart = styled.div`
    
`
const SpanCounter = styled.span`
    position: absolute;
    margin-top: -1.6rem;
    margin-left: 0.6rem;
    font-size: 0.6rem;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SpanCounterChart = styled.span`
    position: absolute;
    margin-top: -1.6rem;
    margin-left: 0.6rem;
    font-size: 0.6rem;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SpanGreenLogin = styled.span`
    position: absolute;
    margin-top: -1.3rem;
    margin-left: 0.8rem;
    font-size: 0.6rem;
    border-radius: 50%;
    height: 0.5rem;
    width: 0.5rem;
    background-color: #00cd00;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Header() {

  const globalContext = useContext<contextProps>(TodoContext);
  const [count, setCount] = useState(0)
  const [contentCart, setContentCart] = useState<products[]>([]);
  const [contentFavs, setContentFavs] = useState<products[]>([]);
  const [favs, setFavs] = useState<products[]>([]);
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showActionsUser, setShowActionsUser] = useState(false);

  useEffect(()=>{
    setContentCart(globalContext.chart);
    setFavs(globalContext.favourites);
  }, [])

  useEffect(() => {    
    setFavs(globalContext.favourites)

  }, [globalContext.favourites])
  
  const [search, setSearch] = useState({titleSearch:""});
  const [showChart, setShowChart] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  const toSearch = (productToSearch:any) => {
    if(search.titleSearch != ""){
        let array: Array<products> = [];
        if(productToSearch.titleSearch != ""){            
            globalContext.dashboard.map(product => {
                if(product.title.toLowerCase().includes(productToSearch.titleSearch.toLocaleLowerCase())){
                    array.push(product);
                }
            })
            globalContext.setProductsToShow(array);
        }else{
            globalContext.setProductsToShow(globalContext.dashboard);
        }
    }
  }

  const handleChange = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...search,
        [name]:value
    }
    
    setSearch(newValues);
    toSearch(newValues);
  }
  
  return (
      <>
        <HeaderMessage id="header-content">Envíos GRATIS para pedidos superiores a 50€</HeaderMessage>
          <Nav>
              <Section>
                  {/* logo y paginas */}
                  <Link to="/"><Logo src="../../../../images/pumaLogo.png" /></Link>
                  <Ul>
                      <Link to="/mujer" style={{ textDecoration: 'none' }}><Li>Mujer</Li></Link>
                      <Link to="/hombre" style={{ textDecoration: 'none' }}><Li>Hombre</Li></Link>
                      <Li>Niño</Li>
                      <Li>Colecciones</Li>
                      <Li>Deportes</Li>
                      <Li>Ofertas</Li>
                  </Ul>
              </Section>
              <Section>
                  {/* Buscador, favs, carrito y login */}
                  <DivSearch>
                    <form>
                        <SpanIconSearch>
                            <Icon className="fa-solid fa-magnifying-glass lupin"></Icon>
                        </SpanIconSearch>
                        <Input name='titleSearch' type="text" value={search.titleSearch} onChange={handleChange} placeholder="        Search"/>
                    </form>
                    <DivCounterChart>
                        <Icon className="fa-solid fa-heart" onClick={() => {setShowFavs(!showFavs)}}></Icon>
                        {favs.length != 0 ? <SpanCounter>{favs.length}</SpanCounter> : <span></span>}
                    </DivCounterChart>
                    <DivCounterChart>
                        <Icon className="fa-solid fa-cart-shopping" onClick={() => {setShowChart(!showChart)}}></Icon>
                        {globalContext.chart.length != 0 ? <SpanCounterChart>{globalContext.chart.length}</SpanCounterChart> : <span></span>}
                    </DivCounterChart>
                    <DivCounterChart>
                        <Icon className="fa-solid fa-user" onClick={() => {
                            if(globalContext.value.auth == false){
                                (setShowFormLogin(!showFormLogin))
                                }else{
                                setShowFormLogin(false);
                                setShowActionsUser(!showActionsUser)
                            }}}>
                        </Icon>
                        {globalContext.value.auth == true && <SpanGreenLogin></SpanGreenLogin>}
                     </DivCounterChart>
                  </DivSearch>
              </Section>
          </Nav>
          {showActionsUser == true && <UserActions/>}
          {showFormLogin && <FormLogin />}
        <MainOffers>
            <span><strong>20% DE DESCUENTO EN TODO*</strong></span>
            <span>CÓDIGO: <strong>PUMA20</strong></span>
            <UlOffers>
                <LiOffers>COMPRAR PARA MUJER</LiOffers>
                <LiOffers>|</LiOffers>
                <LiOffers>COMPRAR PARA HOMBRE</LiOffers>
                <LiOffers>|</LiOffers>
                <LiOffers>COMPRAR PARA NIÑO</LiOffers>
            </UlOffers>
        </MainOffers>
        {showChart && <Chart chart={showChart} setChart={setShowChart} count={count} setCount={setCount} contentCart={contentCart} setContentCart={setContentCart} setShowChart={setShowChart}/>}
        {showFavs && <Favourites favs={showFavs} setFavs={setShowFavs} count={count} setCount={setCount} contentFavs={contentFavs} setContentFavs={setContentFavs} setShowFavs={setShowFavs}/>}
      </>
  )
}

export default Header