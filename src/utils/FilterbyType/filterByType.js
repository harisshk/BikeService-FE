export const filterByType = (filter, data) => {
    const filteredData = data.filter((dataElement) => filter.includes(dataElement.status))
    return filteredData
}
export const addFilter = (filterData, value) => {
    if (filterData.includes(value)) {
        const filteredArray = (filterData.filter((element) => element !== value))
        if (filteredArray.length === 0) {
            return ["REQUESTED"]
        } else {
            return filteredArray
        }
    }
    else {
        return ([...filterData, value])
    }
}