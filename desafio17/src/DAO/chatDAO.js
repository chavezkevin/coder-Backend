import { Chat } from "../models/chatModel.js"
import { BaseRepository } from "./BaseRepository.js";

let instance;

class ChatDAO extends BaseRepository {
    constructor(Chat) {
        super(Chat)
    }

    async getAll() {
        const allMessages = await Chat.find({}, { _id: 1, __v: 0 })
        return allMessages
    }

    //metodo sujeto a revision
    async postMessage(message) {
        const doc = await Chat.insertMany(message)
    }

    static getInstance() {
        if (!instance) {
            instance = new ChatDAO()
        }
        return instance
    }
}

export { ChatDAO }

// const chatDAO = {

//     getAll: async () => {
//         const allMessages = await Chat.find( {}, { _id:1, __v:0 } )
//         return allMessages
//     },

//     //metodo sujeto a revision
//     postMessage: async (message) => {
//         const doc = await Chat.insertMany(message)
//     }

// }

// export { chatDAO }