import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,createRoutesFromElements,Route,RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import store from './store.ts';
import {Provider} from 'react-redux'
import ProfileScreen from './screens/ProfileScreen.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element = {<HomeScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/profile' element={<ProfileScreen/>}/>
        </Route>
    </Route>
  )
)



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <StrictMode>
        <RouterProvider router={router}/>
     </StrictMode>,
  </Provider>
)
