import React, { useContext, useState } from 'react'
import { contextProps, products } from '../../interfaces/interfaces'
import styled from 'styled-components'
import { TodoContext } from '../../context/TodoContext'
import { Link } from 'react-router-dom'
import { substrackFavourite } from '../../favourites/favourites'

const DivContainerChart = styled.div`
    width: 33.125rem;
    height: 100%;
    z-index: 1600;
    background-color: white;
    position: fixed;
    margin-left: 77vw;
    box-shadow: 0.625rem 0.625rem 0.625rem 0.9375rem rgb(0 0 0 / 5%);

`
const DivChart = styled.div`
    position: absolute;
    text-align: center;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
`
const DivHeader = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`
const FielSetProduct = styled.fieldset`
    display: flex;
    margin-top: 1rem;
    border: 0.1px solid #ccc;
    gap: 1rem;
    width: 22rem;
`
const ImageProduct = styled.img`
    height: 5rem;
`
const DivInfoProduct = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
`
const DivNamePrice = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: start;
    align-items: center;
    gap: 2rem;
`
const IconPlus = styled.i`
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SpanCounter = styled.span`
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const IconMinus = styled.i`
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DivCounterChartProduct = styled.div`
    display: flex;
    margin-top: 1rem;
    height: 1.5rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`
const DivFlexBeetweenCounterTrash = styled.div`
    display: flex;
    width: 100%;
    padding-right: 2rem;
`
const DivHeightInfo = styled.div`
    height: 52em;
`
const SpanPrice = styled.span`
    text-align: end;
`
const DivBtnBuy = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`
const ButtonBuy = styled.button`
    width: 100%;
    border-radius: 0.125px;
    border: #ae946d;
    background-color: #ae946d;
    height: 2rem;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
`
const DivFieldSetScroll = styled.div`
    height: 50rem;
    overflow-y: scroll;
`
function Favourites({favs, setFavs, count, setCount, contentFavs, setContentFavs, setShowFavs}:{favs:boolean, setFavs:React.Dispatch<React.SetStateAction<boolean>>,count:number, setCount: React.Dispatch<React.SetStateAction<number>>,
    contentFavs: Array<products>, setContentFavs: React.Dispatch<React.SetStateAction<products[]>>, setShowFavs: React.Dispatch<React.SetStateAction<boolean>>}) {
    const context = useContext<contextProps>(TodoContext);
    const [favsLength, setFavsLength] = useState(context.favourites.length);
    const [favsContent, setFavsContent] = useState(context.favourites);
    const [counterProduct, setCounterProduct] = useState(0)
    const fav:Array<products> = context.favourites;
    console.log(context.userLogin);
    
    const substrackProduct = (product:products,id:any) => {    
        let i = 0;
        fav.map(product => {
            if(product.id == id){
                context.setFavMessage(`${product.id}`)
                fav.splice(i,1);
                context.setFavourites(fav);            
                setFavsLength(fav.length);
                setFavsContent(context.favourites);
                setCount(fav.length);
                setContentFavs(fav);
                if(fav.length == 0){
                    setShowFavs(false);
                }
            }else{
                i++;
            }
        })
        substrackFavourite(product,context.userLogin)
    }
    
    return (
        <DivContainerChart>
            <DivChart>
                <DivHeader>
                    <span><strong>My Favs{` (${favsLength})`}</strong></span>
                    <i className="fa-solid fa-xmark" onClick={() => {setFavs(!favs)}}></i>
                </DivHeader>
                <DivFieldSetScroll>
                {
                    favsContent.map(product => {                                        
                        return(
                            <FielSetProduct key={`${product.id}-fieldset`}>
                                <Link to={`/Product/${product.id}`}><ImageProduct src={product.img} key={`${product.id}-imageProduct`}/></Link>
                                <DivInfoProduct key={`${product.id}-divInfoProduct`}>
                                    <DivNamePrice key={`${product.id}-divNameProduct`}>
                                        <span key={`${product.id}-spanTitle`}><strong key={`${product.id}-strongtitle`}>{product.title}</strong></span>
                                        <SpanPrice key={`${product.id}-spanPrice`}>{product.price}</SpanPrice>
                                    </DivNamePrice>
                                    <span key={`${product.id}-span-gender`}><strong key={`${product.id}-strongGender`}>Gender: </strong>{product.gender}</span>
                                    <DivCounterChartProduct>
                                        <i key={`${product.id}-iconTrashFav`} className="fa-solid fa-trash" onClick={() => {substrackProduct(product,product.id)}}></i>
                                    </DivCounterChartProduct>
                                </DivInfoProduct>
                            </FielSetProduct>
                        )
                    })
                }
                </DivFieldSetScroll>
            </DivChart>
        </DivContainerChart>
    )
}

export default Favourites