module.exports = {
    requiredMissing(res, name) {
        return res.status(400).json({
            code: 1,
            msg: "Missing parameter(s) " + name
        })
    },
    invalidEmail(res, name) {
        return res.status(400).json({
            code: 2,
            msg: "Invalid Email for field " + name
        })
    },
    missingContent(res) {
        return res.status(400).json({
            code: 3,
            msg: "Missing content, fill in text or html field"
        })
    },
    arrayLengthUnmached(res, name1, name2) {
        return res.status(400).json({
            code: 4, 
            msg: "Field " + name1 + " and field " + name2 + " array lengths don't match"
        })
    },
    serverError(res) {
        return res.status(503).json({
            code: 100,
            msg: "Server error occurred"
        })
    }

}