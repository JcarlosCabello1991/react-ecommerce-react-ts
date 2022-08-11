import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { contextProps, products } from '../../interfaces/interfaces';
import { getProduct } from '../../products/products';
import Header from '../header/Header'
import styled from 'styled-components';
import SuggestedProducts from '../suggestedProducts/SuggestedProducts';
import { TodoContext } from '../../context/TodoContext';
import { addFavourite, substrackFavourite } from '../../favourites/favourites';

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const SectionMainProduct = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 5rem;
    padding-right: 5rem;
    margin-top: 1rem;
    gap: 3rem;
`
const DivThumbnailsProduct = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const ImgThumb = styled.img`
    height: 15rem;
`
const DivMainImage = styled.div`
    height: 47rem;
`
const MainImage = styled.img`
    height: 47rem;
`

const DivProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const SpanTitleProduct = styled.span`
    font-size: 2rem;
    width: 25rem;
    text-align: start;
`
const SpanPriceProduct = styled.span`
    margin-top: 2rem;
    font-size: 1.5rem;
`
const SpanGenderProduct = styled.span`
    font-size: 1.5rem;
    margin-top: 2rem;
`
const SpanGender = styled.span`
    margin-left: 1.6rem;
`
const DivSizesProduct = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    width: 77%;
`
const DivAddToCart = styled.div`
    display:  flex;
    justify-content: space-between;
    height: 2rem;
    width: 100%;
    margin-top: 1rem;
`
const ButtonAdd = styled.button`
    background-color: #ae946d;
    border-radius: 0.125rem;
    color: white;
    border: 0;
    height: 2rem;
    line-height: 2rem;
    width: 55%;
`
const DivCounter = styled.div`
    /* display: flex; */
    display: grid;
    grid-template-columns: repeat(3,1fr);
`
const IconPlus = styled.i`
    border-radius: 0.125rem;
    border: 1px solid #ccc;
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
    border-radius: 0.125rem;
    border: 1px solid #ccc;
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const IconHeart = styled.i`
    font-size: 1.5rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DivErrorMessage = styled.div`
    background-color: transparent;
    border: 0;
    border-radius: 0.125rem;
    margin-top: 1rem;
    height: 2rem;
    line-height: 2rem;
    width: 100%;

    &.success{
        background-color: #c0ffc0;
    }

    &.error{
        background-color: #ffabab;
    }
`
const DivSizes = styled.div`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap:0.2rem;
    margin-top: 2rem;
`
const SpanSize = styled.span`
    font-size: 1.5rem;
    border: 1px solid lightgrey;
    border-radius: 0.125rem;

    &:hover{
        border: 1px solid black;
    }

    &.selected{
        background-color: #bffcbf;
    }
`
const SpanPrice = styled.span`
    margin-left: 3.5rem;
`
const DialogNoFavourites = styled.dialog`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.125rem;
    border: 1px solid #fedba0;
    background-color: #fce9c7;

    &.hide{
        display: none;
    }
`
const DivHeaderDialog = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 0rem;
    margin-top: -1.5rem;
`
const DivSocial = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.5rem;
    margin-top: 2rem;
    gap: 1rem;
`
const IconS = styled.i`
    &.whatsapp{
        color:green;
    }
    &.facebook{
        color: blue;
    }
    &.linkedin{
        color: #1799e4;
    }
`
function Product() {
  const params = useParams();
  const { id } = params;
  
  const context = useContext<contextProps>(TodoContext);
  const cart: Array<products> = context.chart;
  const fav: Array<products> = context.favourites;

  const [product, setProduct] = useState<products[]>([]);
  const [counterProduct, setCounterProduct] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [idReceived, setIdReceived] = useState(id);
  const [size, setSize] = useState(0);
  const [dialog, setDialog] = useState(false);

  useEffect(()=>{
    getProduct(id).then(data=>{
        setProduct(data);
        setMessage("");        
    })
  },[id, size])
  
  let thumbNails: Object = {};
  let idProduct: number = 0;
  let title: string = "";
  let price: number = 0;
  let img: string = "";
  let gender: string = "";
  let sizes: Array<number> = [];

  product.map(thumbnail => {

    idProduct = product[0].id;
    img = product[0].img;
    title = product[0].title;
    price = product[0].price;
    gender = product[0].gender;
    sizes = product[0].size;
    Object.values(thumbnail).map(thumb=>{
        if(typeof thumb == "object"){
            thumbNails = thumb;     
        }   
    }) 
  })

  const changeImage = (newImg:string) => {
    const image = document.getElementById("mainImageProduct");
    image?.setAttribute("src", newImg);
  }

  const plusQuantity = () => {
    setCounterProduct(prevState => prevState + 1)
  }

  const substrackQuantity = () => {
    if(counterProduct > 1){
        setCounterProduct(prevState => prevState - 1)
    }
  }

  const addProductToCart = () => {
    //First we check if the product exist before add to the cart
    if(size != 0){
        if(cart.length != 0){
            const exist = cart.find(p => p.id == idProduct && p.sizeSelected == size);
            if(exist){
                product[0].quantity = product[0].quantity+1;
                product[0].sizeSelected = size;
                context.setChart(cart);          
                setMessage("Added");
                document.getElementById("container-message")?.classList.toggle("success")
                setTimeout(()=>{
                    document.getElementById("container-message")?.classList.toggle("success")
                    setMessage("");
                },1500)
                setSize(0);
            }else{
            
                product[0].quantity = counterProduct;
                product[0].sizeSelected = size;
                cart.push({
                    id: product[0].id,
                    title:product[0].title, 
                    price: product[0].price,
                    gender: product[0].gender,
                    img: product[0].img,
                    size: product[0].size, 
                    sizeSelected: size,
                    images: {
                        "pic1": "../../images/hombre/Speedcat-Shield-Lth-Driving-Shoes.webp",
                        "pic2": "../../images/hombre/Speedcat-Shield-Lth-Driving-Shoes-front.webp",
                        "pic3": "../../images/hombre/Speedcat-Shield-Lth-Driving-Shoes-back.webp"
                    },
                    quantity: counterProduct
                });
                console.log(cart);            
                context.setChart(cart);          
                setMessage("Added");
                document.getElementById("container-message")?.classList.toggle("success")
                setTimeout(()=>{
                    document.getElementById("container-message")?.classList.toggle("success")
                    setMessage("");
                },1500)
            }
        }else{
            product[0].quantity = counterProduct;
            product[0].sizeSelected = size;
            cart.push(product[0]);
            context.setChart(cart)
            setMessage("Added");
            document.getElementById("container-message")?.classList.toggle("success")
            setTimeout(()=>{
                document.getElementById("container-message")?.classList.toggle("success")
                setMessage("");
            },1500)
        }
    }else{
        document.getElementById("container-message")?.classList.toggle("error")
        setMessage("Select one size, please")
        setTimeout(()=>{
            document.getElementById("container-message")?.classList.toggle("error")
            setMessage("");
        },3000)
    }
  }

  const updateFavs = () => {
    if(context.value.auth == true){//Solo puede añadir productos si esta logueado//Añadir llamada a funcion que añade a los favoritos el producto y otra que lo elimina del json
        const exist = fav.find(product => product.id == idProduct);
        if(exist == undefined){
            addFavourite(product[0], context.userLogin);
                
            fav.push(product[0]);
            context.setFavourites(fav);
            document.getElementById("container-message")?.classList.toggle("success")
            setMessage("Added to favourites List");
            context.setFavMessage("");
            setTimeout(()=>{
                document.getElementById("container-message")?.classList.toggle("success")
                setMessage("");
            },1000)
        }else{
            //Eliminar el producto aunque tambien lo haremos desde el div de favoritos 
            substrackFavourite(product[0],context.userLogin)       
            substrackFav(idProduct);                   
        }   
    }else{
        //Mostramos dialog con un mensaje indicando que para crear una lista de favoritos necesita estar logado
        setDialog(true);
    }
  }

  const substrackFav = (idToSubstrack:number) => {
    let i = 0;
    fav.map(product => {
        if(product.id == idToSubstrack){
            fav.splice(i, 1);
            context.setFavourites(fav);
            document.getElementById("container-message")?.classList.toggle("error")
            setMessage("Deleted Successfully");
            setTimeout(()=>{
                document.getElementById("container-message")?.classList.toggle("error")
                setMessage("");
            },1000)
        }else{
            i++;
        }
    })
  }

  const setSizeProduct = (size:any, idSelected: string) => {
    setSize(size);
    const spans = document.querySelectorAll(".spanSize");
    Array.from(spans).map(span => {
        if(span.matches(".selected")){
            span.classList.toggle("selected");
        }
    })
    document.getElementById(idSelected)?.classList.toggle("selected");
  }
 
  return (
    <>
        <Header />
        {
            dialog == true ?
            <DialogNoFavourites open>
                <DivHeaderDialog><h3>Advertise</h3><i className="fa-solid fa-xmark" onClick={() => {setDialog(false)}}></i></DivHeaderDialog>
                <span>You need to be logged to create or see your favourites list</span>
            </DialogNoFavourites>
            :
            <DialogNoFavourites className='hide'>
                <DivHeaderDialog><h3>Advertise</h3><i className="fa-solid fa-xmark" onClick={() => {setDialog(false)}}></i></DivHeaderDialog>
                You need to be logged to create or see your favourites list
            </DialogNoFavourites>
        }
        <DivContainer>
            <SectionMainProduct>
                {/* miniaturas, producto y descripcion, etc */}
                <DivThumbnailsProduct>
                    {
                        Object.values(thumbNails).map(thumb=>{
                            return(
                                <ImgThumb src={thumb} onMouseEnter={()=>{changeImage(thumb)}}/>
                            )
                        })
                    }
                </DivThumbnailsProduct>
                <DivMainImage>
                    <MainImage src={img} id="mainImageProduct"/>
                </DivMainImage>
                <DivProductInfo>
                    <SpanTitleProduct><strong>{title}</strong></SpanTitleProduct>
                    <SpanPriceProduct><strong>Price: </strong><SpanPrice>{price}€</SpanPrice></SpanPriceProduct>
                    <SpanGenderProduct><strong>Gender: </strong><SpanGender>{gender}</SpanGender></SpanGenderProduct>
                    <DivSizesProduct>
                        {/* Map to loop over the sizes product */}
                        <SpanPriceProduct><strong>Sizes: </strong></SpanPriceProduct>
                        <DivSizes>
                        {   
                            sizes.map((index,prop) => {
                                return(
                                    <SpanSize className="spanSize" id={`${prop}-product`}onClick={() => (setSizeProduct(index, `${prop}-product`))}>{index}</SpanSize>
                                )
                            })                          
                        }
                        </DivSizes>
                    </DivSizesProduct>
                    <DivAddToCart>
                        <DivCounter>
                            <IconPlus className="fa-solid fa-plus" onClick={plusQuantity}></IconPlus>
                            <SpanCounter>{counterProduct}</SpanCounter>
                            <IconMinus className="fa-solid fa-minus" onClick={substrackQuantity}></IconMinus>
                        </DivCounter>
                        <ButtonAdd onClick={addProductToCart} id="btn-add">Add to cart</ButtonAdd>
                        {fav.find(p=> p.id == idProduct && context.favMessage != `${idProduct}`) ? <IconHeart className="fa-solid fa-heart" style={{color:"red"}} onClick={updateFavs}></IconHeart>: <IconHeart className="fa-solid fa-heart" style={{color:"black"}}onClick={updateFavs}></IconHeart>}
                    </DivAddToCart>
                    <DivSocial>
                        <a id="whatsapp-share" href={`https://api.whatsapp.com/send?text=http://localhost:3000/productDetail/${idProduct}.es`}><IconS className="fa-brands fa-whatsapp whatsapp"></IconS></a>
                        <a id="facebook-share" href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/productDetail/${idProduct}.es`}><IconS className="fa-brands fa-facebook facebook"></IconS></a>
                        <a id="linkedIn-share" href={`https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:3000/productDetail/${idProduct}.es`}><IconS className="fa-brands fa-linkedin linkedin"></IconS></a>
                    </DivSocial>
                    <DivErrorMessage id='container-message'>
                        <span>{message}</span>
                    </DivErrorMessage>
                </DivProductInfo>
            </SectionMainProduct>
                {/* sugeridos */}
                <SuggestedProducts title={title} price={price} gender={gender} id={idProduct}/>
        </DivContainer>
    </>
  )
}

export default Product