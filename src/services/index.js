import axios from 'axios'
const server = 'https://my-json-server.typicode.com/open-veezoo/editor'

export const fetchFileTree = () => {
  return axios
    .get(`${server}/fileTree`)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

export const fetchFileById = id => {
  return axios
    .get(`${server}/files/${id}`)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

export const updateFileById = body => {
  return axios
    .put(`${server}/files/${body.id}`, body)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

export const deleteFileById = id => {
  return axios
    .delete(`${server}/files/${id}`)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}
