import express from "express";
import { createUserBankCard } from "../controller/bankCard.controller/create-user-bankCard";
import { UpdateBankCard } from "../controller/bankCard.controller/update-bankCard";
import { getUserBankCard } from "../controller/bankCard.controller/get-user-bankCard";

const bankCardRouter = express.Router();

bankCardRouter.post("/create/:userId", createUserBankCard);

bankCardRouter.put("/update/:bankCardId", UpdateBankCard);

bankCardRouter.get("/get/:userId", getUserBankCard);

export default bankCardRouter;
