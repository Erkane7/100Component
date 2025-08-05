import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getSearchDonations = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { message } = req.query;
  try {
    const donations = await prisma.donation.findMany({
      where: {
        recipientId: Number(userId),
        specialMessage: {
          contains: message?.toString() || "",
        },
      },
    });
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ error: "Error with search" });
  }
};
