import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
task :{
    type:String,
    required:true
},
taskStatus:{
    type:String,
    required:true
},
employee:{
    type:String,
    required:true
},
projectId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
}
});

export const Task = mongoose.model('Task' , taskSchema);