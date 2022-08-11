import { products } from "../interfaces/interfaces";

export async function addFavourite(product: products, user:any){
user.favourites.push(product);

const response = await fetch(`http://localhost:5000/users/${user.id}`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
})

}

export async function substrackFavourite(product: products,  user:any){
    const newFavs = user.favourites.filter((fav: { id: number; }) => fav.id != product.id);
    
    user.favourites = newFavs;
    
    const response = await fetch(`http://localhost:5000/users/${user.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
}

export async function getFavouritesUser(user: any):Promise<Array<products>>{
    console.log(user);
    
    const id = user.id;
    const response = await fetch(`http://localhost:5000/users/${id}`);
    const data = await response.json();
    return data.favourites;
}