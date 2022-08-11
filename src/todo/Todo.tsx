import TodoProvider from "./context/TodoProvider"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Product from "./components/product/Product"
import MujerPage from "./pages/mujer/MujerPage"
import HombrePage from "./pages/hombre/HombrePage"
import Checkout from "./pages/chekout/Checkout"
import PaymentFinish from "./pages/finish/PaymentFinish"
import ProfileUser from "./components/profileUser/ProfileUser"
import ForgotPassword from "./pages/forgotPassword/ForgotPassword"
import CeoPage from "./pages/ceoPage/CeoPage"
import Error from "./components/error/Error"

const Todo = () => {
  return (
    <>
      <TodoProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/Product/:id" element={<Product />}/>
                  <Route path="/mujer" element={<MujerPage />}/>
                  <Route path="/hombre" element={<HombrePage />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/checkout" element={<Checkout />}/>
                  <Route path="/paymentFinish" element={<PaymentFinish />}/>
                  <Route path="/Profile/:id" element={<ProfileUser />}/>
                  <Route path="/forgotPassword" element={<ForgotPassword />}/>
                  <Route path="/ceoPage" element={<CeoPage />} />
                  <Route path="/*" element={<Error />} />
              </Routes>
          </Router>
      </TodoProvider>
    </>
  )
}

export default Todo