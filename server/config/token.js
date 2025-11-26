import jwt from "jsonwebtoken";
const secretKey = "VInay@#123";
 export const genrateToken =(user)=>{
    const payload = {
        id:user._id,
        email:user.email,
        role:user.role
    }
    const token = jwt.sign(payload,secretKey);
    return token;
}
export const verifyToken = (token)=>{
    const decoded = jwt.verify(token,secretKey);
    return decoded;
}