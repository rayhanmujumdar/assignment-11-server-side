// verify token function
const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.status(401)
    jwt.verify(token,process.env.DB_SECRET,function(err,decoded){
        if(err) {
            return res.status(403).send({message: 'unAuth'})
        }
        req.decoded = decoded
        next()
    })
}

module.exports = verifyToken