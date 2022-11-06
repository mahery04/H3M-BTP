import http from '../http-common'

const getAll = () => {
    return http.get('/api/serviceprovider')
}

const get = (id) => {
    return http.get(`/api/serviceprovider/${id}`)
}

const create = (data) => {
    return http.post('/api/serviceprovider', data)
}

const update = (id, data) => {
    return http.put(`/api/serviceprovider/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/serviceprovider/${id}`)
}

const exportedObject =  {
    getAll, get, create, update, remove
}

export default exportedObject