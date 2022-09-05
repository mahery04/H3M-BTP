import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/weekpresence/${id}`)
}

const create = (id, data) => {
    return http.post(`/api/weekpresence/${id}`, data)
}

const update = (id, data) => {
    return http.put(`/api/weekpresence/${id}`, data)
}

const action = (id, data) => {
    return http.put(`/api/dailypresence/${id}`, data)
}

const exportedObject = {
    getAll, create, update, action
}

export default exportedObject