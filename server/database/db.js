import mongoose from "mongoose"


export const Connection =async(username,password) =>{
    const URL= `mongodb+srv://${username}:${password}@blog.4vqi5f7.mongodb.net/?retryWrites=true&w=majority&appName=Blog`;
    try {
        
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log('Databse connected Successfully');
    } catch (error) {
        console.log('Not connected to database',error);
    }
}

export default Connection;