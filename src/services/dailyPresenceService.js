import http from '../http-common'

const getAllPresence = () => {
    return http.get(`/api/weekpresence/allpresence`)
}

const getAll = (id) => {
    return http.get(`/api/weekpresence/${id}`)
}

const getMonth = () => {
    return http.get(`/api/weekpresence/month`)
}

const getLastDate = (id) => {
    return http.get(`/api/weekpresence/lastdate/${id}`)
}

const globalView = (data) => {
    return http.post('api/weekpresence/view', data)
}

const create = (id, data) => {
    return http.post(`/api/weekpresence/${id}`, data)
}

const update = (id, data) => {
    return http.put(`/api/weekpresence/${id}`, data)
}

const validationUpdate = (id) => {
    return http.put(`/api/weekpresence/view/${id}`)
}


const action = (id, data) => {
    return http.post(`/api/dailypresence/${id}`, data)
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

const setAbsence = (id) => {
    return http.put(`/api/weekpresence/absence/${id}`)
}

const nbAbsence = (id) => {
    return http.get(`/api/weekpresence/absence/${id}`)
}

const setHalfday = (id) => {
    return http.put(`/api/weekpresence/halfday/${id}`)
}

const nbHalfday = (id) => {
    return http.get(`/api/weekpresence/halfday/${id}`)
}

const history = (id) => {
    return http.get(`/api/weekpresence/history/${id}`)
}

const exportedObject = {
    getAllPresence, getAll, getMonth, getLastDate, globalView, create, update, action, salary, getSalary, setPresence, setAbsence, nbAbsence, setHalfday, nbHalfday, nbPresence, history, validationUpdate
}

export default exportedObject