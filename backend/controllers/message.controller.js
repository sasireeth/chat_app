import Conversation from "../models/conseravtion.model.js";
import Message from "../models/message.model.js";

export const sendMessage= async(req,res)=>{
    try{
        const {message} = req.body;
        const {id: receiverId}= req.params;
        const senderId =req.user._id;


        let conversation=await Conversation.findOne({
            participants: {$all: [senderId,receiverId]},
        });

        if(!conversation){
            conversation= await Conversation.create({
                participants: [senderId,receiverId],
                messages: []
            });
        }

        const newMesaage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMesaage){
            conversation.messages.push(newMesaage._id);
        }

        await Promise.all([conversation.save(), newMesaage.save()]) 

        res.status(201).json(newMesaage);

    }catch(error){
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error: "Internal server error"})

    }
}

export const getMessages =async(req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation=await Conversation.findOne({
            participants: {$all: [senderId,userToChatId]},
        }).populate("messages");

        if(!conversation) return req.status(200).json([]);

        const messages= conversation.messages;

        res.status(200).json(messages);
 

    }catch(error){
        console.log("Error in getMessages controller: ",error.message);
        res.status(500).json({error: "Internal server error"})

    }
}