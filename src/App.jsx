import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
//import { BrowserRouter, Link, NavLink, Routes, Outlet} from 'react-router-dom';
import './App.css';
import SampleComponent from './JSX/SampleComponent';
import About from './JSX/routes/pages/About';
import TodoLayout from './JSX/routes/layout/TodoLayout';
import Todos from './JSX/todos/Todos';
import Todosapi from './JSX/todos/Todosapi';

import RootLayout from './JSX/routes/layout/RootLayout';
import ContactLayout from './JSX/routes/layout/ContactLayout';
import ContactInfo from './JSX/routes/pages/ContactInfo';
import ContactForm from './JSX/routes/pages/ContactForm';
import NotFound from './JSX/routes/pages/NotFound';
import ProductsLayout from './JSX/routes/layout/ProductsLayout';
import Products from './JSX/routes/pages/Products';
import { ProductsLoader } from './JSX/routes/pages/ProductsLoader';
import ProductDetails from './JSX/routes/pages/ProductDetails';
import { ProductDetailsLoader } from './JSX/routes/pages/ProductDetailsLoader';
import UserDetailsLayout from './JSX/routes/layout/UserDetailsLayout';
import UserDetails from './JSX/users/UserDetails';
import UserDetailsRTK from './JSX/users/UserDetailsRTK';
import RegistrationLayout from './JSX/routes/layout/RegistrationLayout';
import SignUp from './JSX/routes/pages/SignUp';
import SignIn from './JSX/routes/pages/SignIn';
import SignUpSuccess from './JSX/routes/pages/SignUpSuccess';
import SignUpFailure from './JSX/routes/pages/SignUpFailure';
import SigninFailure from './JSX/routes/pages/SigninFailure';
import Error from './JSX/routes/pages/Error';

import { AuthProvider } from './JSX/routes/pages/AuthProvider';
import ProtectedRoute from './JSX/routes/ProtectedRoute';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} hydrateFallbackElement={<div>Loading...</div>}>

        <Route element={<ProtectedRoute showNav={false} />} >
          <Route index element={<SampleComponent />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<ContactLayout />} >
            <Route path='info' element={<ContactInfo />} />
            <Route path='form' element={<ContactForm />} />
          </Route>
          <Route path='products' element={<ProductsLayout />} errorElement={<Error />}>
            <Route index element={<Products />} loader={ProductsLoader} />
            <Route path=':id' element={<ProductDetails />} loader={ProductDetailsLoader} />
          </Route>
          <Route path='todos' element={<TodoLayout />} >
            <Route index element={<Todos />} />
            <Route path='api' element={<Todosapi />} />
          </Route>
          <Route path='userdetails' element={<UserDetailsLayout />} >
            <Route index element={<UserDetails />} />
            <Route path='rtk' element={<UserDetailsRTK />} />
          </Route>
        </Route>

        <Route path='registration' element={< RegistrationLayout />} >
          <Route index element={<  SignIn />} />
          <Route path='signup' element={< SignUp />} />
          <Route path='success' element={< SignUpSuccess />} />
          <Route path='failure' element={< SigninFailure />} />
          <Route path='signupfailure' element={< SignUpFailure />} />
        </Route>

        {/* <Route path='userdetailsrtk' element={<UserDetailsRTK />} /> */}
        {/* <Route path='todosapi' element={<Todosapi />} /> */}
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <>
      {/* <BrowserRouter>
        <nav>
          <li><NavLink to="/"> Home </NavLink></li>
          <li><NavLink to='/about'> About </NavLink></li>
          <li><NavLink to="/products"> Products</NavLink></li> 
          <li><NavLink to="/contact"> Contact</NavLink></li> 
        </nav>
        <Routes>
          <Route path='/' element = {<SampleComponent/>} />
          <Route path='/about' element = {<About/>} />
          <Route path='/products' element = {<Products/>} />
          <Route path='/contact' element = {<Contact/>} />
        </Routes>
      </BrowserRouter> */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;
