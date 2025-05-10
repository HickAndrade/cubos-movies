import { api } from './api'

interface RegisterInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface LoginInput {
  email: string
  password: string
}

export const authService = {
  async register(data: RegisterInput) {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async login(data: LoginInput) {
    const response = await api.post('/auth/login', data)
    return response.data
  },
  async getProfile() {
    const response = await api.get('/auth/me')
    return response.data
  }
}
