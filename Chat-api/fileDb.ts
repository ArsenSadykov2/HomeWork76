import { promises as fs } from "fs";
import { existsSync } from "node:fs";
import { Message, MessageWithoutID } from "./types";
import * as crypto from "node:crypto";

const filename = "./messages.json";
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                await fs.writeFile(filename, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString());
            }
        } catch (e) {
            console.error("Initialization error:", e);
            data = [];
        }
    },

    async getAllMessages(): Promise<Message[]> {
        return data;
    },

    async addNewMessage(message: MessageWithoutID): Promise<Message> {
        const newMessage: Message = {
            ...message,
            id: crypto.randomUUID(),
            dateTime: message.dateTime || new Date().toISOString()
        };
        data.push(newMessage);
        await this.save();
        return newMessage;
    },

    async save(): Promise<void> {
        await fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;