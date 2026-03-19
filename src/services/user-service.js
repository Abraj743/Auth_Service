const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig')
const bcrypt = require("bcrypt");

class UserService {

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }catch(error){
            console.log("Something went wrong at the service layer");
            throw error;
        }
    }

    createToken(user){
        try {

            const result = jwt.sign(user,JWT_KEY,{expiresIn:'24h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation at service layer");
            throw error;
            
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification at service layer",error);
            throw error;
            
        }
    }

    checkPassword(planePassword,encryptedPassword){
        try {
              return bcrypt.compare(planePassword,encryptedPassword)
        } catch (error) {
            console.log("Something went wrong in verification of password at service layer",error);
            throw error;
        }
    }

}

module.exports=UserService;