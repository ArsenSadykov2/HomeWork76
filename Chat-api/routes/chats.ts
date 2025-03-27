import { Router } from 'express';
import fileDb from "../fileDb";
import { Message, MessageWithoutID } from "../types";

const chatRouter = Router();

chatRouter.get('/', async (req, res) => {
    const products = await fileDb.getAllMessages();
    const queryId = req.query.id as string;
    console.log(queryId);
    res.send(products);
});

chatRouter.post('/', async (req, res) => {
    const newProduct: MessageWithoutID = {
        author: req.body.author,
        message: req.body.message,
        dateTime: req.body.dateTime,
    };

    const savedNewProduct = await fileDb.addNewMessage(newProduct);
    res.send(savedNewProduct);
});

export default chatRouter;


