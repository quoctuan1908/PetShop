import axios from 'axios'

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  instance.interceptors.request.use(
    (config) => {
      console.log("Interceptor request")
      const token = localStorage.getItem('token')

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        config.headers['token'] = token
      }

      return config
    },

    (error) => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    (response) => {
       console.log("Interceptor response")
      return response
    },

    (error) => {
      console.log(error)
      if(error.response.status == 403 ||error.response.status == 401) {
        localStorage.clear()
      }
      return Promise.reject(error)
    } 
  )
  return instance
}
