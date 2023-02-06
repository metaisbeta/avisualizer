import axios from 'axios'

export const apiGithub = axios.create({
  baseURL: 'https://api.github.com/users/'
})
// Change the baseURL to your own Github API
// export const apiAsniffer = axios.create({
//   baseURL: 'https://avisualizer.herokuapp.com/'
// })
export const apiAsniffer = axios.create({
  baseURL: 'http://localhost:8080/'
})
