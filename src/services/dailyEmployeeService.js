import http from '../http-common'

const getAll = () => {
    return http.get('/api/dailyemployee')
}

const get = (id) => {
    return http.get(`/api/dailyemployee/${id}`)
}

const create = (data) => {
    return http.post('/api/dailyemployee', data)
}

const update = (id, data) => {
    return http.put(`/api/dailyemployee/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/dailyemployee/${id}`)
}

const exportedObject =  {
    getAll, get, create, update, remove
}

export default exportedObject