import http from '../http-common'

const getAllById = (id) => {
    return http.get(`/api/toolsmonthlyemployee/${id}`)
}

const getOne = (id) => {
    return http.get(`/api/toolsmonthlyemployee/getOne/${id}`)
}

const create = (data) => {
    return http.post('/api/toolsmonthlyemployee',data)
}

const getNumber = (id) => {
    return http.get(`/api/toolsmonthlyemployee/numbertool/${id}`)
}

const render = (id, data) => {
    return http.put(`/api/toolsmonthlyemployee/${id}`, data)
}

const exportedObject = {
    getAllById, create, getNumber, getOne, render
}

export default exportedObject