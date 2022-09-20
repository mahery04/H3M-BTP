import http from '../http-common'

const btpCount = () => {
    return http.get('/api/fullemployees/btp_count')
}

const sipCount = () => {
    return http.get('/api/fullemployees/sip_count')
}

const parapharmaceutiqueCount = () => {
    return http.get('/api/fullemployees/parapharmaceutique_count')
}

const exportedObject =  {
    btpCount ,sipCount ,parapharmaceutiqueCount
}

export default exportedObject