// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId; 
       
        if(req.body.userId && req.body.userId != userId ){
            throw 'User ID non valable'; 
        }
        else {
            if(req.method == "GET") {
                req.body.userId = userId
            }
            next(); 
        }
    }
    catch (error) {
        console.log(error);
        console.log('Requete non authentifiée');
    }
};


