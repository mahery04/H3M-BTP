import http from '../http-common'

const getAllPosts = () => {
    return http.get('/api/posts')
}

const create = (data) => {
    return http.post('/api/posts', data)
}

const remove = (id) => {
    return http.delete(`/api/posts/${id}`)
}

const exportedObject = {
    getAllPosts, create, remove
}

export default exportedObject