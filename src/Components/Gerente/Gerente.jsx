import './Gerente.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Gerente = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const userFromState = location.state?.username
        const userFromStorage = localStorage.getItem('username')
        const user = userFromState || userFromStorage

        if (!user) {
            navigate('/', { replace: true })
            return
        }

        setUsername(user)
    }, [location, navigate])

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('tipoAcesso')
        navigate('/', { replace: true })
    }

    return (
        <div className="admin-container">
            <h1>Painel do Gerente</h1>
            <p>Bem-vindo ao painel Gerente! {username}</p>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Gerente