const prod = {
    url: {
        BASE_URL: ''
    }
}
const dev = {
    url: {
        BASE_URL: 'http://localhost:5050'
    }
}
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = {
    userServiceUrl: `${config?.url?.BASE_URL}/auth`,
    bikeServiceUrl: `${config?.url?.BASE_URL}/bike`,
    featureServiceUrl: `${config?.url?.BASE_URL}/feature`,
    servicesServiceUrl: `${config?.url?.BASE_URL}/services`,
}