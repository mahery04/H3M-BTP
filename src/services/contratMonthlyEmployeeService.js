import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/contratmonthlyemployee/${id}`)
}

const get = (id) => {
    return http.get(`/api/contratmonthlyemployee/one/${id}`)
}

const create = (data) => {
    return http.post('/api/contratmonthlyemployee', data)
}

const update = (id, data) => {
    return http.put(`/api/contratmonthlyemployee/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/contratmonthlyemployee/${id}`)
}

const exportedObject = {
    getAll, get, create, update, remove
}

export default exportedObject