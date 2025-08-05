import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getTotalEarnings = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: Number(userId) },
    });

    const total = donations.reduce(
      (sum: number, d: { amount: number | null | undefined }) =>
        sum + (d.amount ?? 0),
      0
    );
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ error: "Error with total" });
  }
};
