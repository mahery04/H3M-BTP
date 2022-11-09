import http from '../http-common'

const getEmployee = () => {
    return http.get('/api/monthlypresence/fullemployee')
}

const getAll = () => {
    return http.get('/api/monthlypresence')
}

const get = (id) => {
    return http.get(`/api/monthlypresence/${id}`)
}

const create = (data) => {
    return http.post('/api/monthlypresence', data)
}

const update = (id,data) => {
    return http.put(`/api/monthlypresence/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/monthlypresence/${id}`)
}

const exportedObject = {
    getEmployee ,getAll, get, create, update, remove
}

export default exportedObject