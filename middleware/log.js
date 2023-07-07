function logger(req, res, next) {
    const log = {
        method: req.method,
        path: req.path
    }
    
    next()
    
    console.log({ ...log, status: res.statusCode })
}

module.exports = {
    logger,
}