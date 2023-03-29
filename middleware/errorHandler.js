const errorHandler = (err, req, res, next) => {
    const errorStatus = res.statusCode ? res.statusCode : 500;
    let errorType;
    switch(errorStatus) {
        case 400:
            errorType = "Bad Request";
            break;
        case 401:
            errorType = "Unauthorized";
            break;
        case 403:
            errorType = "Forbidden";
            break;
        case 404:
            errorType = "Not Found";
            break;
        default:
            errorType = "Internal Server Error";
            break;
    }

    res.json({ errorType, message: err.message });
};

module.exports = errorHandler;
