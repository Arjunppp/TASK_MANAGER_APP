import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName :{
        type:String,
        required:true
    },
    projectSpecification:{
        type:String
    },
    createdBy :{
        type:String,
        required:true
    },
    teamMembers:{
        type: [String],
        required:true
    },
    startDate:{
        type:Date,
        default: new Date()
        
    },
    dueDate:{
        type:Date,
        required:true
    }
});


export const Project = mongoose.model('Project' , projectSchema);