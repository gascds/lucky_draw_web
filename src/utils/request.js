import axios from 'axios'
import systemConfig from "../../config/backend"

const service = axios.create({
  baseURL: systemConfig.hostUrl,
  timeout: 6000 
})

service.interceptors.request.use(config => {
    return config;
  }, error => {
    Promise.reject(error);
  })
  
  service.interceptors.response.use(
    response => {
      // console.log('interceptors response', response)
      return response.data
    },
    error => {
      console.log('Error Response', error)
      // if (error.response && error.response.status == 404) {
      // console.log('404 Page')
      // }
      // return Promise.reject(error.response)
    }
  )
  

  export function get(url, params = {}) {
    params.t = new Date().getTime(); 
    return service({
      url: url,
      method: 'get',
      headers: {
      },
      params
    })
  }
  
  export function post(url, data = {}) {
    let sendObject = {
      url: url,
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: data
    };
    sendObject.data = JSON.stringify(data); 
    return service(sendObject)
  }
  

  function put(url, data = {}) {
    return service({
      url: url,
      method: 'PUT',
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      data
    })
  }

  function deletes(url) {
    return service({
      url: url,
      method: 'delete',
      headers: {}
    })
  }
  
  function patch(url) {
    return service({
      url: url,
      method: 'patch',
      headers: {}
    })
  }
  
  function render(url, data) {
    var re = /{([^]+)?}/
    var match = ''
    while ((match = re.exec(url))) {
      url = url.replace(match[0], data[match[1]])
    }
    return url
  }
  
  const fetch = (options) => {
    let url = systemConfig.hostUrl + options.url;
    url = render(url, options.data)
    switch (options.method.toUpperCase()) {
      case 'GET':
        return get(url, options.data)
      case 'POST':
        return post(url, options.data)
      case 'PUT':
        return put(url, options.data)
      case 'DELETE':
        return deletes(url, options.data)
      case 'PATCH':
        return patch(url, options.data)
      default:
        return service(options, options.data)
    }
  }
  
   export default function http(url = '', method = "GET", data = {}) {
    const options = { url: url, data: data, method: method}
    return fetch(options).catch(error => {
        throw error
    })
  }