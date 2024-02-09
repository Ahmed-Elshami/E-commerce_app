import logo from './logo.svg';
import './App.css';
import  { Toaster } from 'react-hot-toast';

import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import Address from './components/Address/Address';






let router=createHashRouter([
  {path :'', element:<Layout/> , children:[
    {index:true , element:<Home/>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    // {path:'products' , element:<Products/>},
    {path:'categories' , element:<Categories/>},
    {path:'address' , element:<Address/>},

    {path:'productdetails/:id' , element:<ProductDetails/>},
    {path:'register' , element:<Register/>},
    {path:'login' , element:<Login/>},
    {path:'*' , element:<Notfound/>},
  ] }
])


function App() {


  return <CartContextProvider>
    <UserContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} ></RouterProvider>
      </Provider>
    </UserContextProvider>
    <Toaster/>
  </CartContextProvider>


}

export default App;
