import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getReceived = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const donations = await prisma.donation.findMany({
    where: {
      recipientId: Number(userId),
    },
  });
  res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({error: "Error with donation"})
  }
};
