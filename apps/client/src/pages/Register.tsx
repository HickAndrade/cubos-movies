import { useNavigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { registerSchema, type RegisterData } from '../schemas/register.schema'
import { authService } from '../services/authService'
import { useAuth } from '../context/AuthContext'


const registerFields = [
    { name: 'name', type: 'text', placeholder: 'Digite seu nome', label: 'Nome' },
    { name: 'email', type: 'email', placeholder: 'Digite seu e-mail', label: 'E-mail' },
    { name: 'password', type: 'password', placeholder: 'Digite sua senha', label: 'Senha' },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Digite sua senha novamente',
      label: 'Confirmação de senha'
    }
  ]

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

    async function handleRegister(data: RegisterData){
      try {
       
      const response = await authService.register(data);
      localStorage.setItem('token', response.token)
      
      const profile = await authService.getProfile()
      setUser(profile)

        navigate('/movies')
       
        

      } catch (error) {
        console.log('Erro ao registrar:', error)
      }
    }

  return (
    <AuthForm<RegisterData>
      schema={registerSchema}
      fields={registerFields}
      submitLabel="Cadastrar"
      onSubmit={handleRegister}
      alternateAuthLink={{
        text: "Já tem uma conta? Faça login",
        to: "/login"
      }}
    />
  )
}

export default Register
