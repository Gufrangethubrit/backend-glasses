import jwt from "jsonwebtoken"

export const gentoken = async (userid) =>{
    try{
        let token = jwt.sign({userId: userid}, process.env.JWT_SECRET_KEY, {expiresIn:"7d"})
        return token
    }catch(err){
        console.log("token error userId",err)
    }
}


export const gentoken1 = async (email)=>{
    try {
        let token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("token error email",error)
    }
}