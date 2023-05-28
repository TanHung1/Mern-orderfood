const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect()
{
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.mongodb_url)
        console.log('Connect succesfully');
    }
    catch(error)
    {
        console.log('failure');
    }
    
}

module.exports = { connect };
