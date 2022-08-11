import { Children, useState, useCallback, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getFavouritesUser } from "../favourites/favourites"
import { contextProps, products, ticket, user } from "../interfaces/interfaces"
import { getProducts } from "../products/products"
import { TodoContext } from "./TodoContext"

interface props {
    children: JSX.Element | JSX.Element[]
}

const TodoProvider = ({ children } : props) => {

  const [auth, setAuth] = useState(false);
  const [counter, setCounter] = useState(0);
  const [dashboard, setDashboard] = useState<products[]>([]);
  const [favourites, setFavourites] = useState<products[]>([]);
  const [chart, setChart] = useState<products[]>([]);
  const [productsToShow, setProductsToShow] = useState<products[]>([]);
  const [favMessage, setFavMessage] = useState("");
  const [userLogin, setUserLogin] = useState<user | any>();
  const [ticket, setTicket] = useState(0);

  const getData = ()=> getProducts();

  useEffect(()=>{
    getData().then(data => {
        setDashboard(data);
        setProductsToShow(data);
    })
  },[])

  const login = useCallback(() => {
      setAuth(true);
      
  },[])

  const logOut = useCallback(() => {
      setAuth(false);
      setFavourites([]);
  },[])
  
  const value = useMemo(() => ({
    login,
    logOut,
    auth, 
    setAuth
  }), [login, logOut, auth])
  
  return (
    <TodoContext.Provider value = {{counter, setCounter, dashboard, setDashboard, value, favourites, setFavourites,chart, setChart, productsToShow, setProductsToShow, favMessage, setFavMessage, userLogin, setUserLogin, ticket, setTicket}}>
        { children }
    </TodoContext.Provider>
  )
}

export default TodoProvider