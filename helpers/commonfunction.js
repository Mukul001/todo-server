
exports.printCustomMsgApi = (type, msg, statusCode, jwt = '', value = {}) => {
    if (jwt != '' && jwt != 'jwt') {
        var json = { 'status': type, 'message': msg, 'status_code': statusCode, 'jwt': jwt, 'response': value, }
    } else if (jwt != '' && jwt == 'jwt') {
        var json = { 'status': type, 'message': msg, 'status_code': statusCode, 'jwt': "", 'response': value, }
    } else {
        var json = { 'status': type, 'message': msg, 'status_code': statusCode, 'response': value }
    }
    return json;
}