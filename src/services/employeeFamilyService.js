import http from '../http-common'

const getEmployee = () => {
    return http.get('/api/employeefamily/fullemployee')
}

const getAll = () => {
    return http.get('/api/employeefamily')
}

const getById = (id) => {
    return http.get(`/api/employeefamily/${id}`)
}

const create = (data) => {
    return http.post('/api/employeefamily', data)
}

const update = (id, data) => {
    return http.put(`/api/employeefamily/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/employeefamily/${id}`)
}

const exportedObject =  {
    getAll, getById, create, update, remove, getEmployee
}

export default exportedObject