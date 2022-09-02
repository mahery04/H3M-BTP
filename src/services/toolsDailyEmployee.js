import http from '../http-common'

const getAllById = (id) => {
    return http.get(`/api/toolsdailyemployee/${id}`)
}

const getOne = (id) => {
    return http.get(`/api/toolsdailyemployee/getOne/${id}`)
}

const create = (data) => {
    return http.post('/api/toolsdailyemployee',data)
}

const getNumber = (id) => {
    return http.get(`/api/toolsdailyemployee/numbertool/${id}`)
}

const render = (id, data) => {
    return http.put(`/api/toolsdailyemployee/${id}`, data)
}

const exportedObject = {
    getAllById, create, getNumber, getOne, render
}

export default exportedObject