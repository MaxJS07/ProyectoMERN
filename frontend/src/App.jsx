import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import BrandsPage from './features/brands/pages/BrandsPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<DefaultLayout/>}>
          <Route path='brands' element={<BrandsPage/>}/>
        </Route>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
