const isEmpty = require('./utils').isEmpty
const isEmail = require('./utils').isEmail
const splitArray = require('./utils').splitArray
const validateEmailArray = require('./utils').validateEmailArray
const errors = require('./errors')
const mailProviderService = require('./mail_providers')

const controller = async function(req, res, next) {
    let body = req.body
    let fromName = body.fromname
    let toNames = splitArray(body.toname)
    let text = body.text
    let html = body.html
    let ccNames = splitArray(body.ccname)
    let bccNames = splitArray(body.bccname)
    let deliveryTime = body.deliverytime

    // parse delivery time
    if(deliveryTime != undefined) {
        deliveryTime = parseInt(deliveryTime)
    }

    // content validation
    if(isEmpty(text) && isEmpty(html)) {
        errors.missingContent(res)
        return
    }

    // `subject` validation
    let subject = body.subject
    if(isEmpty(subject)) {
        errors.requiredMissing(res, 'subject')
    }

    // `from` validation
    let from = body.from
    if(isEmpty(from)) {
        errors.requiredMissing(res, 'from')
        return
    }
    let fromEmail = from
    if(!isEmail(fromEmail)) {
        errors.invalidEmail(res, 'from')
        return
    }

    // `to` validataion
    let to = body.to
    if(isEmpty(to)) {
        errors.requiredMissing(res, 'to')
        return
    }
    let toEmails = splitArray(to)
    if(!validateEmailArray(toEmails)) {
        errors.invalidEmail(res, 'to')
        return
    }
    if(toNames != undefined && toNames.length != toEmails.length) {
        errors.arrayLengthUnmached(res, 'to', 'toname')
        return
    }

    // `cc` validation
    let ccEmails = splitArray(body.cc)
    if(!validateEmailArray(ccEmails)) {
        errors.invalidEmail(res, 'cc')
        return
    }
    if(ccNames != undefined && ccNames.length != ccEmails.length) {
        errors.arrayLengthUnmached(res, 'cc', 'ccname')
        return
    }

    // `bcc` validation
    let bccEmails = splitArray(body.bcc)
    if(!validateEmailArray(bccEmails)) {
        errors.invalidEmail(res, 'bcc')
        return
    }
    if(bccNames != undefined && bccNames.length != bccEmails.length) {
        errors.arrayLengthUnmached(res, 'bcc', 'bccname')
        return
    }

    let attachments = req.files

    let result
    try {
        result = await mailProviderService.sendMail({
            fromEmail, 
            fromName, 
            toEmails, 
            toNames, 
            subject,
            text, 
            html, 
            ccEmails, 
            ccNames, 
            bccNames, 
            bccEmails, 
            attachments,
            deliveryTime
        })
    } catch(error) {
        console.error("MailProviderService failed with error", error)
        errors.serverError(res)
        return
    }

    if(result) {
        res.json({
            code: 0,
            msg: 'success'
        })
    }

}

module.exports = controller