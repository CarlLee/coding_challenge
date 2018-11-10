function isEmpty(val) {
    if(val === null || val === undefined || val.length == 0) {
        return true
    } else {
        return false
    }
}

function isEmail(val) {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)
}

function splitArray(val) {
    if(val == undefined) return undefined
    return val.split(',')
}

function validateEmailArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        if(!isEmail(arr[i])) {
            return false
        }
    }
    return true
}

module.exports = {
    isEmpty,
    isEmail,
    splitArray,
    validateEmailArray
}