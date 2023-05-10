const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization;
       const decodedToken = jwt.verify(token, 'Moussanko');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
        console.log(error);
       res.send({
        error: true,
        message: "Token expiré"
       })
   }
};