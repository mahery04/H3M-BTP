import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/contratdailyemployee/${id}`)
}

const get = (id) => {
    return http.get(`/api/contratdailyemployee/one/${id}`)
}

const create = (data) => {
    return http.post('/api/contratdailyemployee', data)
}

const update = (id, data) => {
    return http.put(`/api/contratdailyemployee/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/contratdailyemployee/${id}`)
}

const exportedObject = {
    getAll, get, create, update, remove
}

export default exportedObject