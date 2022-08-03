import http from '../http-common'

const login = () => {
    return http.post('/user/login')
}

const exportedObject = { login }
export default exportedObject