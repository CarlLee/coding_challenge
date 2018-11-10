const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const OperationFailedError = require('./errors').OperationFailedError
const UnkownError = require('./errors').UnkownError

class MailGunProvider {
    constructor(options) {
        this.domain = options.domain
        this.apiKey = options.apiKey
    }

    async sendMail(mail, timeout) {
        timeout = timeout || 10000;
        let from = this.assembleAddresses(mail.fromNames, mail.fromEmails)
        let to = this.assembleAddresses(mail.toNames, mail.toEmails)
        let cc = mail.cc == undefined ? undefined : this.assembleAddresses(mail.ccNames, mail.ccEmails)
        let bcc = mail.bcc == undefined ? undefined : this.assembleAddresses(mail.bccNames, mail.bccEmails)
        let subject = mail.subject
        let text = mail.text
        let html = mail.html
        let attachments = mail.attachments

        let formData = new FormData()
        formData.append('from', from.join(','))
        formData.append('to', to.join(','))
        formData.append('subject', subject)
        if(text != undefined) {
            formData.append('text', text)
        }
        if(html != undefined) {
            formData.append('html', html)
        }

        if(cc != undefined) {
            formData.append('cc', cc.join(','))
        }

        if(bcc != undefined) {
            formData.append('bcc', bcc.join(','))
        }

        if(attachments != undefined && attachments.length > 0) {
            attachments.forEach(function(file){
                formData.append('attachment', fs.createReadStream(file.path), {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    knownLength: file.size
                })
            })
        }

        let result
        try {
            result = await fetch(`https://api.mailgun.net/v3/${this.domain}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + Buffer.from('api:' + this.apiKey).toString('base64')
                },
                timeout: timeout,
                body: formData
            })
        } catch(error) {
            if(error.type == "request-timeout") {
                throw new OperationFailedError("Request timed out")
            } else {
                throw new UnkownError()
            }
        }
        if(result != undefined) {
            if(result.status != 200) {
                let error = new OperationFailedError("Mailgun request failed")
                error.resposne = await result.json()
                throw error
            } else {
                return true
            }
        }
    }

    assembleAddress(name, email) {
        return `${name} <${email}>`
    }

    assembleAddresses(names, emails) {
        let output = []
        for(let i = 0; i < names.length; i++) {
            output.push(this.assembleAddress(names[i], emails[i]))
        }
        return output
    }
}

module.exports = MailGunProvider