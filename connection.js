import mongoose from "mongoose";


export async function databaseConnection(url)
{
    try
    {
        let response = await mongoose.connect(url);
        if(response)
        {
            console.log('Databse is connected');
        }
    }
    catch(err)
    {
        console.log('Error in connceting databse',err );
    }
};


