import axios from 'axios'
import { getStoredAccessToken, setStoredAccessToken } from './authToken'
import { refreshAccessToken } from '../apis/auth'

const rawUrl =
  import.meta.env.VITE_API_PRODUCTION_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000'

// This line guarantees that the URL ALWAYS ends with /api, no matter what
const cleanBaseUrl = `${rawUrl.replace(/\/+$/, '').replace(/\/api$/, '')}/api`

const api = axios.create({
  baseURL: cleanBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach access token to outgoing requests
api.interceptors.request.use((config) => {
  const token = getStoredAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh when token expires (401)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        const data = await refreshAccessToken()
        const newToken = data.accessToken

        setStoredAccessToken(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return api(originalRequest)
      } catch (err) {
        // If refresh fails, log out clean
        setStoredAccessToken(null)

        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default api
