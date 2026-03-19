const UserService = require('../services/user-service')

const userService = new UserService();


const create = async (req,res) => {
   try {
         const response = await userService.create({
            email:req.body.email,
            password:req.body.password
         })

         return res.status(201).json({data:response,err:{},success:true,message:"Created the user successfully"})
   } catch (error) {
      console.log(error);
      return res.status(500).json({data:{},err:error,success:false,message:"Not able to create a user"})
   }
}

const signIn = async (req,res) =>{
   try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({data:response,err:{},success:true,message:"Successfully sign in the user"})
   } catch (error) {
      console.log(error);
      return res.status(500).json({data:{},err:error,success:false,message:"Not able to sign in"})
      
   }

}


module.exports = {
    create,signIn
}