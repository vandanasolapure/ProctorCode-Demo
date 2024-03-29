 const uri = "mongodb+srv://admin:admin@saurabhasnare.ai9wgxh.mongodb.net/ProctorCode?retryWrites=true&w=majority&appName=saurabhAsnare";
//const uri =  "mongodb+srv://pranavkulkarni:4601xVPgZRM51Yj3@cluster0.tc2memp.mongodb.net/proctorcode";
//const uri =  "mongodb+srv://admin:<password>@saurabhasnare.ai9wgxh.mongodb.net/";

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
