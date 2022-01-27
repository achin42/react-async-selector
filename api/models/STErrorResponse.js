

class STErrorResponse {
    constructor(errorResponseObject) {
        this.statusCode = errorResponseObject.status_code;
        this.errors = errorResponseObject.error_list.map(errorObject => new STError(errorObject))
    }
}

class STError {
    constructor(errorObject) {
        this.code = errorObject.code;
        this.message = errorObject.message;
    }
}

const LocalParsingError = STErrorResponse

export {
    STErrorResponse,
    STError
}