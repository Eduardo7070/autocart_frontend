
import './Login.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const infosLocalStorage = (username, tipoAcesso) => {
  localStorage.setItem('username', username);
  localStorage.setItem('tipoAcesso', tipoAcesso);
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipoAcesso, setTipoAcesso] = useState("");
  const navigate = useNavigate();

  const enviarForm = async (event) => {
    event.preventDefault()
    console.log("Enviando form")

    try {
      const response = await axios.post("http://localhost:8880/login/", {
        usuario: username,
        senha: password,
        tipo_acesso: tipoAcesso
      })
      console.log(response.data)

      if (response.status === 200 && tipoAcesso === "admin") {

        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso!',
          text: 'Bem-vindo, Usuario: ' + username + '!',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/admin', infosLocalStorage(username, tipoAcesso));
        })


      } else if (response.status === 200 && tipoAcesso === "caixa") {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso!',
          text: 'Bem-vindo, Usuario: ' + username + '!',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/caixa'), infosLocalStorage(username, tipoAcesso);
        })

      } else if (response.status === 200 && tipoAcesso === "gerente") {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso!',
          text: 'Bem-vindo, Usuario: ' + username + '!',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/gerente', infosLocalStorage(username, tipoAcesso));
        })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro no login!',
          text: 'Tipo de acesso inválido.',
          timer: 3000,
          showConfirmButton: false
        })
      }

    } catch (err) {
      console.error("ops! ocorreu um erro: " + err)

      if (err.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Erro no login!',
          text: 'Verifique suas credenciais e tente novamente.',
          timer: 3000,
          showConfirmButton: false
        })
      }

    }

  }
  return (
    <div className="container">
      <form onSubmit={enviarForm} className="login-form">
        <h1>AutoCart</h1>
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
            <option value="gerente">Gerente</option>
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
