import { FormEvent, ChangeEvent, useState } from "react";
import { Message } from "../../types";
import { TextField, Button, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Props {
    send: (message: Message) => void;
}

const MessageForm: React.FC<Props> = ({ send }) => {
    const [message, setMessage] = useState<Omit<Message, "id" | "dateTime">>({
        author: "",
        message: "",
    });
    const [error, setError] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!message.author.trim() || !message.message.trim()) {
            setError("Author and message are required!");
            return;
        }

        send(message as Message);
        setMessage({ author: "", message: "" });
        setError("");
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                New Message
            </Typography>

            <TextField
                fullWidth
                label="Author"
                name="author"
                value={message.author}
                onChange={onChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Message"
                name="message"
                value={message.message}
                onChange={onChange}
                margin="normal"
                multiline
                rows={4}
                required
            />

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 2 }}
            >
                Send
            </Button>
        </Box>
    );
};

export default MessageForm;