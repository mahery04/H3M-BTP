import http from '../http-common'

const getAllPosts = () => {
    return http.get('/api/posts')
}

const create = (data) => {
    return http.post('/api/posts', data)
}

const exportedObject = {
    getAllPosts, create
}

export default exportedObject