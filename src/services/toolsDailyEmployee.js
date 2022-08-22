import http from '../http-common'

const create = (data) => {
    return http.post('/api/toolsdailyemployee',data)
}

const getNumber = (id) => {
    return http.get(`/api/toolsdailyemployee/numbertool/${id}`)
}

const exportedObject = {
    create, getNumber
}

export default exportedObject