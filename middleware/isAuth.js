import jwt from "jsonwebtoken";

const isAuth = async (req, res, next)=>{
    try {
        let {token} = req.cookies;
        if (!token) {
            const authHeader = req.headers['authorization']
            if (authHeader?.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1]
            }
        }
        if(!token) return res.status(401).json({message:"user does not have token"})

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)  
        
        if(!verifyToken) return res.status(401).json({message:"Invalid token"})
        
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"isAuth Internal server error"})
    }
}

export default isAuth;
