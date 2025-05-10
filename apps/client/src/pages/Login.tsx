import { useNavigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { loginSchema, type LoginData } from '../schemas/login.schema'
import { authService } from '../services/authService'
import { useAuth } from '../context/AuthContext'


const loginFields = [
  { name: 'email', type: 'email', placeholder: 'Digite seu e-mail', label: 'Nome/E-mail' },
  { name: 'password', type: 'password', placeholder: 'Digite sua senha', label: 'Senha' }
]

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

   async function handleLogin(data: LoginData) {
    try {
      const response = await authService.login(data)
      localStorage.setItem('token', response.token)
      
      const profile = await authService.getProfile()
      setUser(profile)
      
      navigate('/movies')
    } catch (err) {
      console.error('Erro ao fazer login', err)
    }
  }

  
  
  return (
    <AuthForm<LoginData>
      schema={loginSchema}
      fields={loginFields}
      onSubmit={handleLogin}
      submitLabel="Entrar"
      forgotPasswordLink="/forgot-password"
    />
  )
}

export default Login
