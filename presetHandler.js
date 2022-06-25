// Use this presets array inside your presetHandler
const presets = require('./presets');

// Removing reliance on magic numbers by binding the status codes to an enumerator.
const statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
}

// Array set to default to an empty array so two-argument requests for GETs can be passed
const presetHandler = (request, index, array = []) => {
    // Index validation, return 404 if OoB
    if (index < 0 || index >= presets.length) {
        return [statusCode.NOT_FOUND];
    }

    // Blind handling of the request since there is no specification for checking the payload.
    switch (request) {
        case 'GET':
            return [statusCode.OK, presets[index]];
        case 'PUT':
            presets[index] = array;
            return [statusCode.OK, presets[index]];
        default:
            return [statusCode.BAD_REQUEST];
    }
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
