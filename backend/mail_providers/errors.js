class OperationFailedError extends Error {
    constructor(msg) {
        super(msg)
    }
}

class UnknownError extends Error {
    constructor(msg) {
        super(msg)
    }
}

module.exports = {
    OperationFailedError, UnknownError
}