import React from "react"


export interface products {
    //ponemos los datos y su tipo de lo que queramos implementar en en context
    id: number,
    title: string,
    gender: string, 
    size: Array<number>,
    price: number,
    img: string,
    sizeSelected: number,
    quantity: number,
    images: {
        pic1: string,
        pic2: string,
        pic3: string
    }
}

export interface contextProps{
    userLogin: user,
    setUserLogin: React.Dispatch<React.SetStateAction<user>>,
    counter: number,
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    dashboard: Array<products>,
    setDashboard: React.Dispatch<React.SetStateAction<products[]>>,
    value: values,
    favourites: Array<products>,
    setFavourites: React.Dispatch<React.SetStateAction<products[]>>,
    chart: Array<products>,
    setChart: React.Dispatch<React.SetStateAction<products[]>>,
    productsToShow: Array<products>,
    setProductsToShow: React.Dispatch<React.SetStateAction<products[]>>,
    favMessage: string,
    setFavMessage: React.Dispatch<React.SetStateAction<string>>,
    ticket: number,
    setTicket: React.Dispatch<React.SetStateAction<number>>
}

interface values{
    login: ()=>void,
    logOut: () =>void,
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
} 

export interface user{
    [x: string]: any
    id: number,
    name:string,
    lastName: string,
    email: string,
    phone:string,
    address: string,
    password: string,
    confirm_password: string,
    favourites: Array<products>,
    tickets: Array<ticket>
}

export interface userDataLogin{
    email: string,
    password: string
}

export interface ticket{
    date: string,
    code:string,
    ticket: Array<products>
}