import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Admin from './Components/Admin/Admin'
import Caixa from './Components/Caixa/Caixa'
import Gerente from './Components/Gerente/Gerente'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/gerente" element={<Gerente />} />
          <Route path="/caixa" element={<Caixa />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
