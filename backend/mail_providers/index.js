const MailGunProvider = require('./mailgun')
const SendGridProvider = require('./sendgrid')
const OperationFailedError = require('./errors').OperationFailedError
const UnkownError = require('./errors').UnkownError

class MailProviderService {
    constructor(options) {
        this.mainProvider = options.mainProvider;
        this.failoverProvider = options.failoverProvider;
        this.timeout = options.timeout || 10000;
    }

    async sendMail(mail) {
        let result
        try {
            result = await this.mainProvider.sendMail(mail, this.timeout)
        } catch (err) {
            console.error('Main provider failed with exception: ', err)
            console.error('Switching to failover provider')

            try {
                result = await this.failoverProvider.sendMail(mail, this.timeout)
            } catch (faileoverErr) {
                let throwable = new OperationFailedError('MailProviderServcie failed')
                throwable.exceptions = [err, faileoverErr]
                throw throwable
            }
        }

        return result
    }
}

module.exports = new MailProviderService({
    mainProvider: new MailGunProvider({
        domain: process.env.MAILGUN_DOMAIN,
        apiKey: process.env.MAILGUN_API_KEY
    }),
    failoverProvider: new SendGridProvider({
        apiUser: process.env.SENDGRID_API_USER,
        apiKey: process.env.SENDGRID_API_KEY
    })
})