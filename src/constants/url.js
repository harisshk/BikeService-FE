const prod = {
    url: {
        BASE_URL: ''
    }
}
const dev = {
    url: {
        BASE_URL: 'https://bike-backend-service.herokuapp.com'
        // BASE_URL: 'http://localhost:5050'
    }
}
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = {
    authServiceUrl: `${config?.url?.BASE_URL}/auth`,
    bikeServiceUrl: `${config?.url?.BASE_URL}/bike`,
    featureServiceUrl: `${config?.url?.BASE_URL}/feature`,
    servicesServiceUrl: `${config?.url?.BASE_URL}/services`,
    userServiceUrl: `${config?.url?.BASE_URL}/user`,
}