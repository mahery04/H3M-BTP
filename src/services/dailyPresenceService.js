import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/weekpresence/${id}`)
}

const update = (id, data) => {
    return http.put(`/api/weekpresence/${id}`, data)
}

const getEmptyOne = (id, data) => {
    return http.get(`/api/dailypresence/emptyone/${id}`)
}

const exportedObject = {
    getAll, update, getEmptyOne
}

export default exportedObject