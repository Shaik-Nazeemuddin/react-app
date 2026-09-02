import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,Navigate  } from 'react-router-dom';
//import { BrowserRouter, Link, NavLink, Routes, Outlet} from 'react-router-dom';
import './App.css';

import { ProductsLoader } from './JSX/routes/pages/ProductsLoader';
import { ProductDetailsLoader } from './JSX/routes/pages/ProductDetailsLoader';

import { AuthProvider } from './JSX/routes/pages/AuthProvider';
import ProtectedRoute from './JSX/routes/ProtectedRoute';
import PublicRoutes from './JSX/routes/PublicRoutes';

import { lazy, useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const SampleComponent = lazy(() => {
  return new Promise(resolve => { setTimeout(() => resolve(import("./JSX/SampleComponent")), 5000) })
});
const About = lazy(() => import('./JSX/routes/pages/About'));
const Products = lazy(() => import('./JSX/routes/pages/Products'));
const ProductDetails = lazy(() => import('./JSX/routes/pages/ProductDetails'));
const Todos = lazy(() => import('./JSX/todos/Todos'));
const Todosapi = lazy(() => import('./JSX/todos/Todosapi'));
const UserDetails = lazy(() => import('./JSX/users/UserDetails'));
const UserDetailsRTK = lazy(() => import('./JSX/users/UserDetailsRTK'));
const TodoLayout = lazy(() => import('./JSX/routes/layout/TodoLayout'));
const RootLayout = lazy(() => import('./JSX/routes/layout/RootLayout'));
const ContactLayout = lazy(() => import('./JSX/routes/layout/ContactLayout'));
const ContactInfo = lazy(() => import('./JSX/routes/pages/ContactInfo'));
const ContactForm = lazy(() => import('./JSX/routes/pages/ContactForm'));
const NotFound = lazy(() => import('./JSX/routes/pages/NotFound'));
const ProductsLayout = lazy(() => import('./JSX/routes/layout/ProductsLayout'));
const UserDetailsLayout = lazy(() => import('./JSX/routes/layout/UserDetailsLayout'));
const RegistrationLayout = lazy(() => import('./JSX/routes/layout/RegistrationLayout'));
const SignUp = lazy(() => import('./JSX/routes/pages/SignUp'));
const SignIn = lazy(() => import('./JSX/routes/pages/SignIn'));
const SignUpSuccess = lazy(() => import('./JSX/routes/pages/SignUpSuccess'));
const SignUpFailure = lazy(() => import('./JSX/routes/pages/SignUpFailure'));
const SigninFailure = lazy(() => import('./JSX/routes/pages/SigninFailure'));
const ErrorPage = lazy(() => import('./JSX/routes/pages/ErrorPage'));

const ShowError = ({ error }) => {
  return (
    <>
      <h1>Error in Component</h1>
      <p>{error.message}</p>
    </>
  )
}


const ErrorComponent = () => {
  useEffect(() => {
    throw new Error("something went wrong while rendering");
  }, [])
  return null;
}


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} hydrateFallbackElement={<div>Loading...</div>}>
        <Route element={<ProtectedRoute showNav={false} />} replace>
          <Route index element={
            <Suspense fallback={<h2> Page is Loading...</h2>}>
              <SampleComponent />
            </Suspense>
          } />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<ContactLayout />} >
            <Route path='info' element={<ContactInfo />} />
            <Route index element={<ContactForm />} />
          </Route>
          {/* <Route path='products' element={<ProductsLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Products />} loader={ProductsLoader} />
            <Route path=':id' element={<ProductDetails />} loader={ProductDetailsLoader} />
          </Route> */}
          <Route path='products' element={<ProductsLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Products />} />
            <Route path=':id' element={<ProductDetails />} />
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

        <Route element={<PublicRoutes />} replace>
          <Route path='registration' element={< RegistrationLayout />} >
            <Route index element={<  SignIn />} />
            <Route path='signup' element={< SignUp />} />
            <Route path='success' element={< SignUpSuccess />} />
            <Route path='failure' element={< SigninFailure />} />
            <Route path='signupfailure' element={< SignUpFailure />} />
            <Route path='error' element={
              <ErrorBoundary FallbackComponent={ShowError}>
                < ErrorComponent />
              </ErrorBoundary>
            }
            />
          </Route>
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
