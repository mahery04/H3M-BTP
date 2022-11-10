import http from '../http-common'

const getEmployee = () => {
    return http.get('/api/permission/fullemployee')
}

const getAll = () => {
    return http.get('/api/permission')
}

const get = (id) => {
    return http.get(`/api/permission/${id}`)
}

const create = (data) => {
    return http.post('/api/permission', data)
}

const update = (id,data) => {
    return http.put(`/api/permission/${id}`, data)
}

const validation = (id,data) => {
    return http.put(`/api/permission/validation/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/permission/${id}`)
}

const exportedObject = {
    getEmployee ,getAll, get, create, update, validation, remove
}

export default exportedObject