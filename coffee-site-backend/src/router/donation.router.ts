import express from "express";
import { createDonation } from "../controller/donation.controller/create-donation";
import { getDonationsForRecipient } from "../controller/donation.controller/get-donation-recieved";
import { getTotalEarnings } from "../controller/donation.controller/get-donation-total-earning";
import { getSearchDonations } from "../controller/donation.controller/get-search-dontaion";

const donationRouter = express.Router();

donationRouter.post("/create-donation", createDonation);

donationRouter.get("/received/:userId", getDonationsForRecipient);

donationRouter.get("/total/:userId", getTotalEarnings);

donationRouter.get("/search-donations/:userId", getSearchDonations);

export default donationRouter;
