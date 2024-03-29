const facultyModel = require("../Model/facultyModel");
const {formatDataToSend}=require("../Middleware/auth.middleware");

try{

    const getFaculty = async (request, response) => {
    
        const { email, password } = request.body;
    
        if (!email || !password) {
            return response.status(400).json({ message: "Please enter all fields" });
        }
        const faculty = await facultyModel.findOne({ email });

        if (faculty) {
            if (faculty.password != password) {
                return response.status(400).json({ message: "Invalid password" });
            }
            else {
                return response.status(200).json(formatDataToSend(faculty));
            }
        }
        if (!faculty) {
            return response.status(400).json({ message: "User not found" });
        }
    };

    
const createFaculty=async(request,response)=>{
    //error handling
    try{
    const { email, name, password } = request.body;
        const temp=await facultyModel.exists({email});

    if(temp){
        return response.status(400).json({message:"User exists"});
        
    }
    if(!name || !password|| !email){
        
        return response.status(400).json({message:"all fields are required"});
       
    }else{
       
        facultyModel.create({
            email,name,password
        });
    }
}catch(error){

}

    response.send("create contacts");
};

const updateFaculty=async(request,response)=>{

    const contact=await facultyModel.updateOne(
        { name: request.body.name }, // Filter to find the document with the specified name
        { $set: { email: request.body.email} } // Update the age to 30
      );
    response.send("update  contacts with id :"+contact);
};

const getOneFaculty=async(request,response)=>{
    const contacts=await facultyModel.find({name:request.body.name});

    response.send(contacts);
};


const deleteFaculty=async(request,response)=>{
   
    const contact=await facultyModel.deleteOne({ name: request.body.email });

    response.send("delete  contacts with id :"+contact);
};


module.exports={getFaculty,createFaculty,getOneFaculty,updateFaculty,deleteFaculty};
}
catch(err){
    console.log(err);
}