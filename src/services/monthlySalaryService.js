import http from '../http-common'

const getEmployees = () => {
    return http.get('/api/salarymonthly/employees')
}

const getMonth = () => {
    return http.get('/api/salarymonthly/month')
}

const globalView = (data) => {
    return http.post('api/salarymonthly/view', data)
}

const getAll = (id) => {
    return http.get(`/api/salarymonthly/getall/${id}`)
}

const get = (id) => {
    return http.get(`/api/salarymonthly/${id}`)
}

const create = (data) => {
    return http.post('/api/salarymonthly', data)
}

const update = (id, data) => {
    return http.put(`/api/salarymonthly/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/salarymonthly/${id}`)
}

const exportedObject =  {
    getEmployees, getMonth, globalView, getAll, get, create, update,  remove
}

export default exportedObject