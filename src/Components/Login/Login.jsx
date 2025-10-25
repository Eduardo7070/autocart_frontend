import { FaUser, FaLock } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import bcrypt from "bcryptjs-react";
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipoAcesso, setTipoAcesso] = useState("");

  const enviarForm = async (event) => {
    event.preventDefault()
    console.log("Teste", username, password)
    
    try { 
      const response = await axios.post("http://localhost:8880/login/", {
        usuario: username,
        senha: password,  
        tipo_acesso: tipoAcesso
      })
      console.log(response.data)
    } catch (err) {
      console.error("ops! ocorreu um erro: " + err)
    }

  }
  return (
    <div className="container">
      <form onSubmit={enviarForm} className="login-form">
        <h1>Acessar Sistema</h1>
        <div>
          <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
          <FaUser className='icon' />
        </div>
        <div>
          <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon' />
        </div>

        <div>
          <select value={tipoAcesso} onChange={(e) => setTipoAcesso(e.target.value)}>
            <option value="">Selecione o tipo de acesso</option>
            <option value="admin">Administrador</option>
            <option value="caixa">Caixa</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>

        <div className="recall-forget">
          <label >
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueci minha senha</a>
        </div>
        <button>Entrar</button>

        <div className="signup-link">
          <p>Nao tem uma conta?
            <a href="#">Registre-se</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;
