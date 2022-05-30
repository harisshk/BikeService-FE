import axios from 'axios'

//checks all response for token failed
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  
  if (error.response.status === 401) {
    localStorage.clear()
    window.location.href = "/login"
  }
  // if (error && window.location.pathname !== "/login") {
  //   localStorage.clear()
  //   window.location.href = "/login"
  // }
  return Promise.reject(error);
})

// all request use bearer token
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);