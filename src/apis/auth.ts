import api from '@/lib/axios'
import axios from 'axios'

const rawUrl =
  import.meta.env.VITE_API_PRODUCTION_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000'

const cleanBaseUrl = `${rawUrl.replace(/\/+$/, '').replace(/\/api$/, '')}/api`
export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) => {
  try {
    const res = await api.post('/auth/register', { name, email, password })
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to register')
  }
}
export const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const res = await api.post('/auth/login', { email, password })
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to login')
  }
}
export const logoutUser = async () => {
  try {
    const res = await api.post('/auth/logout')
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to logout')
  }
}
export const refreshAccessToken = async () => {
  try {
    // We explicitly call /api/auth/refresh here:
    const res = await axios.post(
      `${cleanBaseUrl}/auth/refresh`,
      {},
      { withCredentials: true },
    )
    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to refresh access token',
    )
  }
}
