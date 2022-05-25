const prod = {
    url: {
        BASE_URL: 'https://duroos.herokuapp.com'
    }
}
const dev = {
    url: {
       BASE_URL: 'https://duroos.herokuapp.com'
    //    BASE_URL: 'http://localhost:5050'
    }
}
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = {
    userServiceUrl: `${config?.url?.BASE_URL}/user`,
    applicationServiceUrl: `${config?.url?.BASE_URL}/application`,
}