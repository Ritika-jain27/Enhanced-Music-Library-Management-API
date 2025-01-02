function formatResponse({ status, message, data = null, error = null }) {
    return {
        status: status || 500,
        message: message || 'No message provided',
        data: data,
        error: error,
    };
}

module.exports = {
    formatResponse,
}
