import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./router/user.router";
import profileRouter from "./router/profile.router";
import donationRouter from "./router/donation.router";
import bankCardRouter from "./router/bank.router";

dotenv.config();
const app = express();
const port = process.env.PORT || 4202;

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/donation", donationRouter);
app.use("/bank-card", bankCardRouter);

app.get("/", (_req, res) => {
  res.json({ message: "API running" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
