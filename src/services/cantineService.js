import http from '../http-common'

const getAll = () => {
    return http.get('/api/cantine')
}

const create = (data) => {
    return http.post('/api/cantine', data)
}

const remove = id => {
    return http.delete(`/api/cantine/${id}`)
}

const exportedObject = {
    getAll, create, remove
}

export default exportedObject