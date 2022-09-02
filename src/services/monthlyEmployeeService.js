import http from '../http-common'

const getAll = () => {
    return http.get('/api/monthlyemployee')
}

const get = (id) => {
    return http.get(`/api/monthlyemployee/${id}`)
}

const getCount = () => {
    return http.get(`/api/monthlyemployee/count`)
}

const create = (data) => {
    return http.post('/api/monthlyemployee', data)
}

const update = (id, data) => {
    return http.put(`/api/monthlyemployee/${id}`, data)
}

const remove = id => {
    return http.delete(`/api/monthlyemployee/${id}`)
}

const exportedObject =  {
    getAll, getCount, get, create, update, remove
}

export default exportedObject