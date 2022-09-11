import axios from 'axios'

const instance = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// instance.interceptors.request.use((config) => {
//   // console.log(1)
// })
instance.interceptors.response.use((response) => {
  return response.data.data
},error => {

})

export default instance
