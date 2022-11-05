import http from '../http-common'

const create = (data) => {
    return http.post('/api/serviceprovider', data)
}

const exportedObject =  {
    create
}

export default exportedObject