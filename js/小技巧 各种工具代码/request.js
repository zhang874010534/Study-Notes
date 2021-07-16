import axios from 'axios'
const instance = axios.create({
    baseUrl:'https://www.github.com'
})

export const get = (url,params = {}) => {
    new Promise((resolve,reject) => {
        instance.get(url,params).then((response) => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}

export const post = (url,params = {}) => {
    new Promise((resolve,reject) => {
        instance.post(url,params,{
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}