
const getQueryParamsFromArray = (array, key) => {
    let parameters = []
    array.forEach(element => parameters.push(`${key}[]=${element}`))
    return parameters.join('&')
}

export { getQueryParamsFromArray }