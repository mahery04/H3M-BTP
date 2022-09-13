import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/monthlyweekpresence/${id}`)
}

const create = (id, data) => {
    return http.post(`/api/monthlyweekpresence/${id}`, data)
}

const action = (id, data) => {
    return http.put(`/api/monthlypresence/${id}`, data)
}

const exportedObject = {
    getAll, create, action
}

export default exportedObject