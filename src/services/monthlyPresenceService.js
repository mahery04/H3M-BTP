import http from '../http-common'

const getAll = (id) => {
    return http.get(`/api/monthlyweekpresence/${id}`)
}

const getMonth = () => {
    return http.get(`/api/monthlyweekpresence/month`)
}

const globalView = (data) => {
    return http.post('api/monthlyweekpresence/view', data)
}

const create = (id, data) => {
    return http.post(`/api/monthlyweekpresence/${id}`, data)
}

const validationUpdate = (id) => {
    return http.put(`/api/monthlyweekpresence/view/${id}`)
}

const action = (id, data) => {
    return http.put(`/api/monthlypresence/${id}`, data)
}

const setPresence = (id) => {
    return http.put(`/api/monthlyweekpresence/presence/${id}`)
}

const nbPresence = (id) => {
    return http.get(`/api/monthlyweekpresence/presence/${id}`)
}

const setAbsence = (id) => {
    return http.put(`/api/monthlyweekpresence/absence/${id}`)
}

const nbAbsence = (id) => {
    return http.get(`/api/monthlyweekpresence/absence/${id}`)
}

const advance = (id) => {
    return http.put(`/api/monthlyweekpresence/advance/${id}`)
}

const getAdvance = (id) => {
    return http.get(`/api/monthlyweekpresence/advance/${id}`)
}

const salary = (id) => {
    return http.put(`/api/monthlyweekpresence/salary/${id}`)
}

const getSalary = (id) => {
    return http.get(`/api/monthlyweekpresence/salary/${id}`)
}

const history = (id) => {
    return http.get(`/api/monthlyweekpresence/history/${id}`)
}

const exportedObject = {
    getAll, getMonth, globalView, create, action, setPresence, nbPresence, setAbsence, nbAbsence, advance, getAdvance, salary, getSalary, history, validationUpdate
}

export default exportedObject