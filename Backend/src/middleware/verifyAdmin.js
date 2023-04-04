const verifyAdmin = (req,res,next) =>{
    if(process.env.ADMIN_CODE!=req.headers.admincode)
    {
        return res.status(401).json({ message: 'ADMIN ACCESS DENIED' });
    }
    return next();
}
module.exports =  verifyAdmin;