import mongoose from "mongoose";

const connectToMongoDB= async() =>{
    try {
        await mongoose.connect(mongodb+srv://sasireethreddy:uIgY2q4Ga81YAd4Y@cluster0.enpbjj5.mongodb.net/chat-app-db?);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message);
    }
}

export default connectToMongoDB;
