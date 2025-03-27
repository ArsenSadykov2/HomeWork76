export interface  Chat {
    message: string;
    author: string;
    datetime: string;
    id: string;
}

export interface Message {
    author: string;
    message: string;
}

export interface Message {
    id: string;
    author: string;
    message: string;
    dateTime: string;
}

export type MessageWithoutID = Omit<Message, "id">;