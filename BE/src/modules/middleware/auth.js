const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient(); 
const auth = () => {
    return async (req,res,next) => {
        let headerToken = req.headers.authorization;
        if(!headerToken || !headerToken.startsWith(process.env.AUTH_KEY)){
            return res.status(401).json({message: 'Unauthorized access'});
        }else{
            let token = headerToken.split(' ')[1];
            let {id} = jwt.verify(token, process.env.JWTKEY);
            let user = await prismaClient.user.findUnique({
                where:{
                    id:id
                }
            });
            if(user){
                req.user = user;
                next();
            }else{
                return res.status(401).json({message: 'Unauthorized access'});
            }
           
        }
    }
};


module.exports = auth;