import http from '../http-common'

const getAll = () => {
    return http.get('/api/personnaltools')
}

const getEmployee = () => {
    return http.get('/api/fullemployees')
}

const get = (id) => {
    return http.get(`/api/personnaltools/${id}`)
}

const create = (data) => {
    return http.post('/api/personnaltools', data)
}

const update = (id, data) => {
    return http.put(`/api/personnaltools/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/personnaltools/${id}`)
}

const exportedObject =  {
    getAll, getEmployee , get, create, update, remove
}

export default exportedObject