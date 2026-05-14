import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import BrandsPage from './features/brands/pages/BrandsPage'
import { LoginLayout } from './layouts/LoginLayout'
import LoginPage from './features/login/pages/LoginPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<DefaultLayout/>}>
          <Route path='brands' element={<BrandsPage/>}/>
        </Route>

        <Route path='/login' element={<LoginLayout/>}>
          <Route path='' element={<LoginPage/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
