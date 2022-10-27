const notFoundHandler = (_req,_res,next) => {
    const err = new Error('Response not found')
    err.status = 404
    next(err)
}

const errorHandler = (err,_req,res,_next) => {
    if(err.status){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Internal server error"})
}

module.exports = {
    notFoundHandler,
    errorHandler
}