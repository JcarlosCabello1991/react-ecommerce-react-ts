import { log } from "console";
import { products } from "../interfaces/interfaces";

export async function getProducts():Promise<Array<products>> {
    const response = await fetch("http://localhost:5000/products")
    const data = await response.json();
    return data;
}

export async function getProduct(id:any):Promise<Array<products>> {
    const response = await fetch(`http://localhost:5000/products/${id}`)
    const data = await response.json();
    let array = [];
    array.push(data);
    return array;
}

export async function uploadProduct(product: any):Promise<string>{
    
    const response = await fetch(`http://localhost:5000/products`);
    const data = await response.json();

    product.id = data.length+1;

    //Generamos array de tallas
    const array = product.sizes.split(",");
    let sizes: number[] = [];
    array.map((element: any) => {
        sizes.push(parseInt(element));
    })

    product.sizes = sizes;
    
    const update = await fetch(`http://localhost:5000/products`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:product.id, title:product.title, price:parseInt(product.price), gender:product.gender,size:product.sizes, img: product.img, images:product.images})
    })
    return "ok";
}

export async function deleteProduct(id:number):Promise<string>{

    const newResponse = await fetch(`http://localhost:5000/products/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    return "ok";
}

export async function editProductProps(product: any):Promise<string>{
    let str = "ok";
    
    const id = product.id;

    let array: number[] = [];
    product.sizes.split(",").map((size: any) => {
        array.push(parseInt(size));
    })
    
    product.sizes = array;

    const request = await fetch(`http://localhost:5000/products/${id}`)
    const data = await request.json();

    if(product.img == "") product.img = data.img;
    if(product.size == "") product.sizes = data.size;
    product.images = data.images;


    const response = await fetch(`http://localhost:5000/products/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id:id, title:product.title, price:parseInt(product.price), gender:product.gender,size:product.sizes, img: product.img, images:product.images})
    })
    

    return str;
}