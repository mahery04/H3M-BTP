import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/historytool/${id}`)
}

const get = (id) => {
    return http.get(`/api/historytool/one/${id}`)
}

const create = (data) => {
    return http.post('/api/historytool', data)
}

const update = (id, data) => {
    return http.put(`/api/historytool/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/historytool/${id}`)
}

const exportedObject = {
    getAll, get, create, update, remove
}

export default exportedObject