import { useNavigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { loginSchema, type LoginData } from '../schemas/login.schema'
import { authService } from '../services/authService'

const loginFields = [
  { name: 'email', type: 'email', placeholder: 'Digite seu e-mail', label: 'Nome/E-mail' },
  { name: 'password', type: 'password', placeholder: 'Digite sua senha', label: 'Senha' }
]

function Login() {
  const navigate = useNavigate()

   async function handleLogin(data: LoginData) {
    try {
      const response = await authService.login(data)
      localStorage.setItem('token', response.token)

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
