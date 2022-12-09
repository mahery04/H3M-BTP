import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/salaryserviceprovider/${id}`)
}

const get = (id) => {
    return http.get(`/api/salaryserviceprovider/one/${id}`)
}


const create = (data) => {
    return http.post('/api/salaryserviceprovider', data)
}

const update = (id, data) => {
    return http.put(`/api/salaryserviceprovider/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/salaryserviceprovider/${id}`)
}

const exportedObject =  {
    getAll, get, create, update, remove
}

export default exportedObject