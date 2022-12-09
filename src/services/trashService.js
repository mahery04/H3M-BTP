import http from '../http-common'

const getAll = () => {
    return http.get('/api/trash')
}


const create = (data) => {
    return http.post('/api/trash', data)
}


const remove = id => {
    return http.delete(`/api/trash/${id}`)
}

const exportedObject =  {
    getAll,  create,  remove
}

export default exportedObject