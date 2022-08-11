import React, { useContext, useState } from 'react'
import HeaderCeo from './components/HeaderCeo'
import styled from 'styled-components'
import { deleteProduct, getProducts, uploadProduct, editProductProps } from '../../products/products'
import { contextProps } from '../../interfaces/interfaces'
import { TodoContext } from '../../context/TodoContext'
import Home from '../../components/home/Home'

const ContainerSections = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 2rem;
`
const SectionCreate = styled.section`
    width: 25rem;
    margin-left: 10rem;
    margin-top: 2rem;
`
const SectionDelete = styled.section`
    margin-top: 2rem;
`
const SectionUpdate = styled.section`
    margin-top: 2rem;
    margin-left: 10rem;
    width: 25rem;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 25rem;
    margin-top: 2rem;
`
const Input = styled.input`
    height: 2rem;
    border-radius: 0.125rem;
    border: 1px solid #ccc;
`
const InputImage = styled.input`
    border-radius: 0.125rem;
`
const Button = styled.button`
    background-color: #b7a07d;
    border-radius: 0.125rem;
    border: 1px solid #b7a07d;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;

    &:hover{
        background-color: #e4c89d;
        color: black;
    }
`
const Div = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3,1fr);
`
const Product = styled.div`
    display: flex;
    flex-direction: row;
    width: 20rem;
`

const Img = styled.img`
    width: 5rem;
    height: 5rem;
`
const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DialogEdit = styled.dialog`
    position: absolute;
    
    &.hide{
        display: none;
    }
`
const DivProductsEdition = styled.div`
    margin-top: 1rem;
`

const DivTitleSection = styled.div`
    background-color: black;
    color: white;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.125rem;
`
function CeoPage() {
  //Aqui vamos a tener 3 secciones
  //Seccion 1: subir productos(los datos de todo el producto)
  //Seccion 2: eliminar productos
  const context = useContext<contextProps>(TodoContext);
  const [product, setProduct] = useState({id:"", title:"", price:"", gender:"",sizes:[],img:"", images:{
    "pic1": "../../images/hombre/Zapatillas-Wild-Rider-Grip.webp",
    "pic2": "../../images/hombre/Zapatillas-Wild-Rider-Grip-front.webp",
    "pic3": "../../images/hombre/Zapatillas-Wild-Rider-Grip-back.webp"
  }})
  const [productEdit, setProductEdit] = useState({id:"", title:"", price:"", gender:"",sizes:[],img:"", images:{
    "pic1": "../../images/hombre/Zapatillas-Wild-Rider-Grip.webp",
    "pic2": "../../images/hombre/Zapatillas-Wild-Rider-Grip-front.webp",
    "pic3": "../../images/hombre/Zapatillas-Wild-Rider-Grip-back.webp"
  }})
  const [image,setImage] = useState("");

  const changeInput = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...product,
        [name]:value
    }
    setProduct(newValues);
  }

  const changeInputDialog = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const newValues = {
        ...productEdit,
        [name]:value
    }
    setProductEdit(newValues);
  }

  const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
        setImage(URL.createObjectURL(e.target.files[0]))
    }
    
  }

  const createProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    product.img = image;
    
    //Formamos el objeto a subir al json y llamamos a la funcion que hace el post del producto
    uploadProduct(product).then(response => {
        if(response == "ok"){
            getProducts().then(data => {
                context.setProductsToShow(data)
            });
        }
    })    
  }

  const substrackProduct = (id:number) => {
    deleteProduct(id).then(response => {
        if(response == "ok"){
            getProducts().then(data => {
                context.setProductsToShow(data)
            });
        }
    })
  }
 
  const handleDialog = (dialogId:number) => {
    document.getElementById(`dialogEdit-${dialogId}`)?.classList.toggle("hide");
  }

  const editProduct = (e: React.FormEvent<HTMLFormElement>, idProduct:number) => {
    e.preventDefault();

    productEdit.img = image;
    const id =  document.getElementById(`inputId-${idProduct}`)?.getAttribute("value");
    

    editProductProps({id:id?.toString(), title:productEdit.title,price:productEdit.price, gender:productEdit.gender,sizes:productEdit.sizes,img:image, images:{
        "pic1": "../../images/hombre/Zapatillas-Wild-Rider-Grip.webp",
        "pic2": "../../images/hombre/Zapatillas-Wild-Rider-Grip-front.webp",
        "pic3": "../../images/hombre/Zapatillas-Wild-Rider-Grip-back.webp"
      }}).then(data => {
        if(data == "ok"){
            getProducts().then(response => {
                context.setProductsToShow(response);
            })
        }
    })
    document.getElementById(`dialogEdit-${id}`)?.classList.toggle("hide");
  }
  if(context.value.auth == true){
  return (
    <>
        <HeaderCeo />
        <ContainerSections>
            <DivContainer>
                <SectionCreate>
                    <DivTitleSection><strong>Create Product</strong></DivTitleSection>
                    <Form onSubmit={(e) => {createProduct(e)}}>
                        <Input type="text" name="title" value={product.title} onChange={(e) => {changeInput(e)}} placeholder='Title product' required/>
                        <Input type="number" name="price" value={product.price} onChange={(e) => {changeInput(e)}} placeholder='price' required/>
                        <Input type="text" name="gender" value={product.gender} onChange={(e) => {changeInput(e)}} placeholder='gender' required/>
                        <Input type="text" name="sizes" value={product.sizes} onChange={(e) => {changeInput(e)}} placeholder='sizes ex: 37,38,39' required/>
                        <InputImage type="file" value={""} name="image" onChange={(e) => {handleImage(e);changeInput(e)}} accept="image/*"/>
                        <Button type='submit'>Create</Button>
                    </Form>
                </SectionCreate>
                <SectionUpdate>
                <DivTitleSection><strong>Edit Product</strong></DivTitleSection>
                <DivProductsEdition>
                {
                    context.productsToShow.map(element => {
                        return(
                            <Product>
                                <Img src={`${element.img}`}/>
                                <DivInfo>
                                    <span>{element.title}</span>
                                    <span>{element.price}€</span>
                                    <i className="fa-solid fa-pencil" onClick={() => {handleDialog(element.id)}}></i>
                                </DivInfo>
                                <DialogEdit id={`dialogEdit-${element.id}`} className="hide" open>
                                    <Form onSubmit={(e) => {editProduct(e, element.id)}}>
                                        <Input type="hidden" name="id" value={element.id} id={`inputId-${element.id}`}/>
                                        <Input type="text" name="title" value={productEdit.title} onChange={(e) => {changeInputDialog(e)}} placeholder='Title product' required/>
                                        <Input type="number" name="price" value={productEdit.price} onChange={(e) => {changeInputDialog(e)}} placeholder='price' required/>
                                        <Input type="text" name="gender" value={productEdit.gender} onChange={(e) => {changeInputDialog(e)}} placeholder='gender' required/>
                                        <Input type="text" name="sizes" value={productEdit.sizes} onChange={(e) => {changeInputDialog(e)}} placeholder='sizes ex: 37,38,39' required/>
                                        <InputImage type="file" value={""} name="image" onChange={(e) => {handleImage(e);changeInputDialog(e)}} accept="image/*"/>
                                        <Button type='submit'>Save</Button>
                                        <Button onClick={() => {handleDialog(element.id)}}>Cancel</Button>
                                    </Form>
                                </DialogEdit>
                            </Product>
                        )
                    })
                }
                </DivProductsEdition>
                </SectionUpdate>
            </DivContainer>
            <SectionDelete>
            <DivTitleSection><strong>Delete Product</strong></DivTitleSection>
                <Div>
                    {
                        context.productsToShow.map(product => {
                            return(
                                <Product>
                                    <Img src={`${product.img}`}/>
                                    <DivInfo>
                                        <span>{product.title}</span>
                                        <span>{product.price}€</span>
                                        <i className="fa-solid fa-trash" onClick={() => {substrackProduct(product.id)}}></i>
                                    </DivInfo>
                                </Product>
                            )
                        })
                    }
                </Div>
            </SectionDelete>
        </ContainerSections>
    </>
  )
  }else{
    return(
        <Home />
    )
  }
}

export default CeoPage