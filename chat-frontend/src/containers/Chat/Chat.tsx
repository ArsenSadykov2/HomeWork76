import {useCallback, useEffect, useState} from "react";
import {Chat, Message} from "../../types";
import axios from "axios";
import BackMessage from "../../components/BackMessage/BackMessage.tsx";
import MessageForm from "../../components/MessageForm/MesageForm.tsx";

const Chat = () => {
    const baseUrl = 'http://localhost:8000/messages';
    const [messages, setMessages] = useState<Chat[]>([]);
    const [lastDatetime, setLastDatetime] = useState<string | null>(null);

    const send = async (message: Omit<Message, "id">) => {
        try {
            const messageWithDate = {
                ...message,
                datetime: new Date().toISOString()
            };
            await axios.post(baseUrl, messageWithDate, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetchMessages();
        } catch (e) {
            console.error("Ошибка отправки:", e);
        }
    };

    const fetchMessages = useCallback(async () => {
        try {
            const url = lastDatetime
                ? `${baseUrl}?datetime=${(lastDatetime)}`
                : baseUrl;

            const response = await axios.get<Chat[]>(url);

            if (response.data.length > 0) {
                setMessages(prev => {
                    const newMessages = response.data.filter(
                        newMsg => !prev.some(p => p.id === newMsg.id)
                    );
                    return [...newMessages, ...prev];
                });

                setLastDatetime(response.data[0].datetime);
            }
        } catch (error) {
            console.error("Ошибка получения сообщений:", error);
        }
    }, [lastDatetime]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    return (
        <div className="container py-4">
            <MessageForm send={send}/>
            <hr/>
            <div className="message-list">
                {messages.map((msg) => (
                    <BackMessage key={msg.id} message={msg}/>
                ))}
            </div>
        </div>
    );
};

export default Chat;