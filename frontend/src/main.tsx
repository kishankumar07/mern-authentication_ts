import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,createRoutesFromElements,Navigate,Route,RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import store from './store.ts';
import {Provider} from 'react-redux'
import ProfileScreen from './screens/ProfileScreen.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import AdminLayout from './components/admin/AdminLayout.tsx';
import AdminLogin from './screens/admin/AdminLogin.tsx';
import AdminDashboard from './screens/admin/AdminDashboard.tsx';
import AdminCreateUser from './screens/admin/AdminCreateUser.tsx';
import AdminUpdateUser from './screens/admin/AdminUpdateUser.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* User routes */}
      <Route path='/' element={<App/>}>
          <Route index={true} path='/' element = {<HomeScreen/>}/>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='/register' element={<RegisterScreen/>}/>
          <Route path='' element={<PrivateRoute/>}>
            <Route path='/profile' element={<ProfileScreen/>}/>
          </Route>
      </Route>
      {/* Admin routes */}
      <Route path='/admin' element={<AdminLayout/>}>
          <Route path='/admin' element={<Navigate replace to='/admin/login'/>}/>
          <Route index={true} path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/createUser' element={<AdminCreateUser/>}/>
          <Route path='/admin/updateUserInfo/:id' element={<AdminUpdateUser/>}/>
      </Route>
    </>
  )
)



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <StrictMode>
        <RouterProvider router={router}/>
     </StrictMode>,
  </Provider>
)
