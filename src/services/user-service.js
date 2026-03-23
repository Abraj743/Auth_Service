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
              return bcrypt.compareSync(planePassword,encryptedPassword)
        } catch (error) {
            console.log("Something went wrong in verification of password at service layer",error);
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {

            const user = await this.userRepository.getByEmail(email);
            const comparePassword = this.checkPassword(plainPassword,user.password);
            console.log(comparePassword);
            if(!comparePassword){
                console.log("Password does not match");
                throw {error:"Incorrect Password"}
            }

            const newJWT = this.createToken({email:user.email,id:user.id});

            return newJWT;

            
        } catch (error) {
            console.log("Something went wrong in signing of user at service layer",error);
            throw error;

            
        }

       
    }

    async isAuthenticated (token) {
        try {
               const response = this.verifyToken(token);
               console.log("response",response);
               const user = await this.userRepository.getById(response.id);
               if(!user){
                throw {error:'No user with the corresponding token exists'};
               }

               return user.id;

        } catch (error) {
            console.log("Something went wrong while checking authentication of user at service layer",error);
            throw error;
        }
            
    }

    isAdmin(userId) {
       try {
            return this.userRepository.isAdmin(userId);
       } catch (error) {
          console.log("Something went wrong in service layer",error);
          throw error;
        
       }
    }

}

module.exports=UserService;