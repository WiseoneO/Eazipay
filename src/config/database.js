const config = require("./defaults");
// const logger = require("pino")();
const mongoose = require("mongoose");

const connectDB =  async ()=>{

    try{
        console.log(`Connecting to MongDB database ...`);
        await mongoose.connect(config.localMongod,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected Successfully.");
    }catch(error){
        console.log('Error while connecting to the database. Try again...');
        
    }
}

module.exports = connectDB
