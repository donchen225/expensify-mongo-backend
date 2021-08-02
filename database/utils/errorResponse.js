class ErrorResponse extends Error {
    constructor(name, message, statusCode) {
        super(name, message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;