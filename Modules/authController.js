
class AuthController{

    async registration(req,res){
      try {
        res.status(200).json("Server works good")
      } catch (error) {
        console.log(error);
      }
    }
    async login(req,res){
        try {
            res.status(200).json("Server works good")
        } catch (error) {
          console.log(error);
        }
    }
    async getUsers(req,res){
        try {
        res.status(200).json("Server works good")
        } catch (error) {
          console.log(error);
        }
    }
};
module.exports = new AuthController();