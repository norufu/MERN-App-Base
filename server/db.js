const mongodb = require("mongodb");
require("dotenv").config();
// https://stackoverflow.com/questions/11330917/how-to-play-a-mp3-using-javascript
class Db {
    constructor() {
        this.userdb;
        this.datadb
    }
    async connectDB() {
      const client = await mongodb.MongoClient.connect(
        process.env.DB_CONNECT_STRING,
        {
          useNewUrlParser: true
        }
      );
    console.log("db is loaded");
    this.userdb = client.db('Banki').collection("Users");
    return("yes")
    }

    //user functions
    async registerUser(email, username, password) { 
      console.log(this.userdb.find({username: username}).count());
      let emailTaken = await this.userdb.find({email: email}).count() > 0;
      let usernameTaken = await this.userdb.find({username: username}).count() > 0;

      if(usernameTaken) { //username taken
        console.log("username taken");
        return(0);
      }
      else if (emailTaken) { //email taken
        console.log("email taken");
        return(1);
      }
      else { //register user ie insert to db
        this.userdb.insertOne({username: username, email: email, password: password});
        console.log('added user');
        return(2);
      }
    }

    async getHashedPass(email, password) {
      console.log("logging in..");
      let user = await this.findUserByEmail(email);
      if(user.password) {
        return(user.password);
      }
      else {
        return(false);
      }
    }

    async findUserByEmail(email) {
      console.log("test")
      return(this.userdb.findOne({email: email}))
    }
} 

module.exports = Db;