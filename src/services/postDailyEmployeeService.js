import http from '../http-common'

const getAllPosts = () => {
    return http.get('/api/posts')
}

const exportedObject = {
    getAllPosts
}

export default exportedObject