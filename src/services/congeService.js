import http from '../http-common'

const updateLastDay = () => {
    return http.put(`/api/conge/lastday`)
}

const getEmployee = () => {
    return http.get('/api/conge/fullemployee')
}

const getAll = () => {
    return http.get('/api/conge')
}

const get = (id) => {
    return http.get(`/api/conge/${id}`)
}

const create = (data) => {
    return http.post('/api/conge', data)
}

const update = (id,data) => {
    return http.put(`/api/conge/${id}`, data)
}

const validation = (id,data) => {
    return http.put(`/api/conge/validation/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/conge/${id}`)
}

const exportedObject = {
    updateLastDay, getEmployee ,getAll, get, create, update, validation, remove
}

export default exportedObject