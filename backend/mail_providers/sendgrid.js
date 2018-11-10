const sgMail = require('@sendgrid/mail')
const fs = require('fs')
const OperationFailedError = require('./errors').OperationFailedError
const UnkownError = require('./errors').UnkownError

class SendGridProvider {
    constructor(options) {
        this.apiKey = options.apiKey
        sgMail.setApiKey(this.apiKey);
    }
    async sendMail(mail, timeout) {
        let outMail = {
            subject: mail.subject
        }
        outMail.to = []
        this.appendEmailAndName(outMail.to, mail.toEmails, mail.toNames)
        outMail.from = {
            name: mail.fromName,
            email: mail.fromEmail
        }

        if(mail.html != undefined) {
            outMail.html = mail.html
        }
        if(mail.text != undefined) {
            outMail.text = mail.text
        }
        if(mail.deliveryTime != undefined) {
            outMail.send_at = Math.round(mail.deliveryTime / 1000)
        }
        if(mail.cc != undefined) {
            outMail.cc = []
            this.appendEmailAndName(outMail.cc, mail.ccEmails, mail.ccNames)
        }
        if(mail.bcc != undefined) {
            outMail.bcc = []
            this.appendEmailAndName(outMail.bcc, mail.bccEmails, mail.bccNames)
        }

        let attachments = mail.attachments
        if(attachments != undefined && attachments.length > 0) {
            outMail.attachments = []
            let that = this
            attachments.forEach(function(file){
                outMail.attachments.push({
                    content: that.readFileAsBase64String(file.path),
                    type: file.mimetype,
                    filename: file.originalname,
                })
            })
        }

        try {
            await sgMail.send(outMail)
        } catch (exception) {
            let error = new OperationFailedError("Request failed") 
            error.exception = exception
            throw error
        }

        return true
    }

    appendEmailAndName(arr, emails, names) {
        for(let i = 0; i < emails.length; i++) {
            arr.push({
                name: names[i],
                email: emails[i]
            })
        }
    }

    readFileAsBase64String(file) {
        let body = fs.readFileSync(file)
        return body.toString('base64')
    }
}

module.exports = SendGridProvider