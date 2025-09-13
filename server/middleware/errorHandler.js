// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Set status code
    const status = err.status || 500;
    res.status(status);

    // Render the error page
    res.render('error', { 
        title: 'Error',
        error: {
            status: status,
            message: err.message || 'Internal Server Error'
        }
    });
};

module.exports = errorHandler;
