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

const salary = (id) => {
    return http.put(`/api/weekpresence/salary/${id}`)
}

const getSalary = (id) => {
    return http.get(`/api/weekpresence/salary/${id}`)
}

const setPresence = (id) => {
    return http.put(`/api/weekpresence/presence/${id}`)
}

const nbPresence = (id) => {
    return http.get(`/api/weekpresence/presence/${id}`)
}

const history = (id) => {
    return http.get(`/api/weekpresence/history/${id}`)
}

const exportedObject = {
    getAll, create, update, action, salary, getSalary, setPresence, nbPresence, history
}

export default exportedObject