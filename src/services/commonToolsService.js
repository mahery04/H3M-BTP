import http from '../http-common'

const getAll = () => {
    return http.get('/api/commontools')
}

const getEmployee = () => {
    return http.get('/api/fullemployees')
}

const get = (id) => {
    return http.get(`/api/commontools/${id}`)
}

const create = (data) => {
    return http.post('/api/commontools', data)
}

const update = (id, data) => {
    return http.put(`/api/commontools/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/commontools/${id}`)
}

const exportedObject =  {
    getAll, getEmployee, get, create, update, remove
}

export default exportedObject