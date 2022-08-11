import { products, ticket, user, userDataLogin } from "../interfaces/interfaces";


export async function addNewUser(userData: user){
    const user = userData;
    
    const request = await fetch("http://localhost:5000/users",{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: user.id, name: user.name, lastName: user.lastName, email: user.email,phone: user.phone, address: user.address, password: user.password, confirm_password: user.confirm_password, favourites:[], tickets:[]})
    })
    const data = await request.json();
    return data;
}

export async function getId():Promise<number>{

    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    
    return (data.length);
}

export async function checkUserLogin(userData: userDataLogin):Promise<boolean>{
    let str = false;

    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();

    const exist = data.find((user: { email: string | any; password: string; }) => user.email == userData.email && user.password == userData.password);
    
    if(exist != undefined){
        str = true;
    }    
    
    return str;
}

export async function getUserData(userData : userDataLogin): Promise<user>{
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    
    const exist = data.find((user: { email: string | any; password: string; }) => user.email == userData.email && user.password == userData.password);
    
    return exist;
}

export async function addTicket(id:number, cart:Array<products[]>){

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const code = (Math.random()*1000000).toString();

    const response = await fetch(`http://localhost:5000/users/${id}`)
    const user = await response.json();

    let arrayProductsTicket:Array<products[]> = [];
    
    cart.map(product => {
        arrayProductsTicket.push(product);
    })

    const ticket = {code: code, date: `${day}/${month}/${year}`, ticket: arrayProductsTicket}
    user.tickets.push(ticket);
    
    const newResponse = await fetch(`http://localhost:5000/users/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
}

export async function updateUserData(data: { name: string; lastName: string; email: string; phone: string; address: string; password: string; confirm_password: string; }, user:user){

    //We update the userData with the fields that not matches between data and user
    if(data.name != user.name && data.name != "") user.name = data.name
    if(data.lastName != user.lastName && data.lastName != "") user.lastName = data.lastName
    if(data.email != user.email && data.email != "") user.email = data.email
    if(data.phone != user.phone && data.phone != "") user.phone = data.phone
    if(data.address != user.address && data.address != "") user.address = data.address
    if(data.password != user.password && data.password != "") user.password = data.password
    if(data.confirm_password != user.confirm_password && data.confirm_password != "") user.confirm_password = data.confirm_password

    const response = await fetch(`http://localhost:5000/users/${user.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })   
    
}

export async function getTickets(user:user):Promise<Array<ticket>>{
    console.log(user);
    
    let num = 0;
    const response = await fetch(`http://localhost:5000/users/${user.id}`)
    const data = await response.json();
    // num = data.tickets.length;
    // console.log(num);
    
    return data.tickets;
}

export async function updateForgotPassword(data:{email:string, password:string, confirm_password:string}):Promise<user | undefined>{
    let rtn = undefined;
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    const exist = users.find((user: { email: string; }) => user.email == data.email);
    console.log(exist);
    
    if(exist != undefined){
        exist.password = data.password;
        exist.confirm_password = data.confirm_password;
        const newResponse = await fetch(`http://localhost:5000/users/${exist.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(exist)
        })
        const isOk = await newResponse.json();
        if(isOk != undefined){
            return exist;
        }
    }

    return rtn;
}