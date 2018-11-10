const OperationFailedError = require('./errors').OperationFailedError

class SendGridProvider {
    constructor() {

    }
    async sendMail(mail, timeout) {
        throw new OperationFailedError() 
        // return true
    }
}

module.exports = SendGridProvider